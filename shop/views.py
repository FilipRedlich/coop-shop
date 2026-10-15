import uuid
from decimal import Decimal
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.models import User
from django.db.models import Q
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    Category,
    Subcategory,
    Product,
    Cart,
    CartItem,
    NewsletterSubscriber,
    Order,
    OrderItem,
)
from .serializers import (
    CategorySerializer,
    SubcategorySerializer,
    ProductSerializer,
    CartSerializer,
    UserSerializer,
    OrderSerializer,
)


def get_or_create_cart(request) -> Cart:
    """Helper returning the current cart for authenticated user or anonymous session."""
    if request.user.is_authenticated:
        cart, _ = Cart.objects.get_or_create(user=request.user)
        # Check if there is an anonymous session cart to merge
        if request.session.session_key:
            session_cart = Cart.objects.filter(session_key=request.session.session_key).first()
            if session_cart and session_cart != cart:
                for s_item in session_cart.items.all():
                    c_item, created = CartItem.objects.get_or_create(
                        cart=cart,
                        product=s_item.product,
                        defaults={'quantity': s_item.quantity}
                    )
                    if not created:
                        c_item.quantity += s_item.quantity
                        c_item.save()
                session_cart.delete()
        return cart

    if not request.session.session_key:
        request.session.create()
    cart, _ = Cart.objects.get_or_create(session_key=request.session.session_key)
    return cart


# --- Category & Subcategory APIs ---

class CategoryListAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        categories = Category.objects.prefetch_related('subcategories', 'subcategories__products').all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)


class SubcategoryListAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        queryset = Subcategory.objects.select_related('category').prefetch_related('products').all()
        cat_id = request.query_params.get('category')
        if cat_id:
            queryset = queryset.filter(category_id=cat_id)
        serializer = SubcategorySerializer(queryset, many=True)
        return Response(serializer.data)


# --- Product APIs ---

class ProductListAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        queryset = Product.objects.select_related('subcategory', 'subcategory__category').all()

        category_id = request.query_params.get('category')
        if category_id:
            queryset = queryset.filter(subcategory__category_id=category_id)

        subcategory_id = request.query_params.get('subcategory')
        if subcategory_id:
            queryset = queryset.filter(subcategory_id=subcategory_id)

        search = request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(description__icontains=search) |
                Q(subcategory__name__icontains=search)
            )

        on_sale = request.query_params.get('on_sale')
        if on_sale and on_sale.lower() in ('true', '1'):
            queryset = queryset.filter(discount_multiplier__lt=1.0)

        hotshot = request.query_params.get('hotshot')
        if hotshot and hotshot.lower() in ('true', '1'):
            queryset = queryset.filter(is_hotshot=True)

        ordering = request.query_params.get('ordering')
        if ordering in ['price', '-price', 'rating', '-rating', 'name', '-name']:
            queryset = queryset.order_by(ordering)

        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data)


class ProductDetailAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        try:
            product = Product.objects.select_related('subcategory', 'subcategory__category').get(pk=pk)
        except Product.DoesNotExist:
            return Response({'error': 'Produkt nie został znaleziony.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(ProductSerializer(product).data)


class HotshotAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        hotshot = Product.objects.filter(is_hotshot=True).first()
        if not hotshot:
            # fallback to top discounted item or first product
            hotshot = Product.objects.filter(discount_multiplier__lt=1.0).first() or Product.objects.first()
        if not hotshot:
            return Response({'error': 'Brak gorącego strzału.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(ProductSerializer(hotshot).data)

    def post(self, request):
        if not request.user.is_authenticated or not request.user.is_staff:
            return Response(
                {'error': 'Wymagane uprawnienia administratora.'},
                status=status.HTTP_403_FORBIDDEN
            )

        product_id = request.data.get('product_id')
        discount = request.data.get('discount_multiplier', 0.70)
        try:
            product = Product.objects.get(pk=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Produkt nie istnieje.'}, status=status.HTTP_404_NOT_FOUND)

        Product.objects.filter(is_hotshot=True).update(is_hotshot=False)
        product.is_hotshot = True
        product.discount_multiplier = Decimal(str(discount))
        product.save()

        return Response({
            'message': f'Produkt {product.name} został nowym Gorącym Strzałem!',
            'product': ProductSerializer(product).data
        })


# --- Cart APIs ---

class CartAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        cart = get_or_create_cart(request)
        return Response(CartSerializer(cart).data)


class CartAddAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        if quantity <= 0:
            quantity = 1

        try:
            product = Product.objects.get(pk=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Produkt nie istnieje.'}, status=status.HTTP_404_NOT_FOUND)

        cart = get_or_create_cart(request)
        item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': quantity}
        )
        if not created:
            item.quantity += quantity
            item.save()

        return Response({
            'message': f'Dodano {product.name} do koszyka.',
            'cart': CartSerializer(cart).data
        })


class CartUpdateAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        cart = get_or_create_cart(request)
        try:
            item = CartItem.objects.get(cart=cart, product_id=product_id)
            if quantity <= 0:
                item.delete()
            else:
                item.quantity = quantity
                item.save()
        except CartItem.DoesNotExist:
            return Response({'error': 'Produkt nie znajduje się w koszyku.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({
            'message': 'Zaktualizowano ilość.',
            'cart': CartSerializer(cart).data
        })


class CartRemoveAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        product_id = request.data.get('product_id')
        cart = get_or_create_cart(request)
        CartItem.objects.filter(cart=cart, product_id=product_id).delete()
        return Response({
            'message': 'Usunięto produkt z koszyka.',
            'cart': CartSerializer(cart).data
        })


class CartClearAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        cart = get_or_create_cart(request)
        cart.items.all().delete()
        return Response({
            'message': 'Koszyk został wyczyszczony.',
            'cart': CartSerializer(cart).data
        })


# --- Auth APIs ---

class AuthMeAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        if request.user.is_authenticated:
            return Response({
                'authenticated': True,
                'user': UserSerializer(request.user).data
            })
        return Response({'authenticated': False, 'user': None})


class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username') or request.data.get('email')
        password = request.data.get('password')

        if not username or not password:
            return Response(
                {'error': 'Wymagany login/email oraz hasło.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Allow login by email or username
        user = authenticate(request, username=username, password=password)
        if not user:
            # Try to look up by email
            user_by_email = User.objects.filter(email__iexact=username).first()
            if user_by_email:
                user = authenticate(request, username=user_by_email.username, password=password)

        if not user:
            return Response(
                {'error': 'Niepoprawny login lub hasło.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        auth_login(request, user)
        # Merge session cart
        get_or_create_cart(request)

        return Response({
            'message': f'Zalogowano pomyślnie jako {user.username}.',
            'user': UserSerializer(user).data
        })


class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email', '')
        password = request.data.get('password')

        if not username or not password:
            return Response(
                {'error': 'Login i hasło są wymagane.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if len(password) < 6:
            return Response(
                {'error': 'Hasło musi mieć co najmniej 6 znaków.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {'error': 'Użytkownik o takim loginie już istnieje.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if email and User.objects.filter(email=email).exists():
            return Response(
                {'error': 'Użytkownik o takim adresie email już istnieje.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.create_user(username=username, email=email, password=password)
        auth_login(request, user)
        get_or_create_cart(request)

        return Response({
            'message': 'Konto zostało pomyślnie utworzone.',
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)


class LogoutAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        auth_logout(request)
        return Response({'message': 'Wylogowano pomyślnie.'})


# --- Newsletter & Checkout ---

class NewsletterSubscribeAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email', '').strip()
        if not email or '@' not in email:
            return Response(
                {'error': 'Proszę podać poprawny adres e-mail.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        sub, created = NewsletterSubscriber.objects.get_or_create(email=email)
        if created:
            msg = 'Dziękujemy za zapisanie się do newslettera! Otrzymasz najlepsze promocje jako pierwszy.'
        else:
            msg = 'Ten adres e-mail jest już zapisany do naszego newslettera.'

        return Response({'message': msg, 'email': email})


class CheckoutAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        cart = get_or_create_cart(request)
        if cart.items.count() == 0:
            return Response(
                {'error': 'Twój koszyk jest pusty.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        full_name = request.data.get('full_name')
        email = request.data.get('email')
        phone = request.data.get('phone', '')
        address = request.data.get('address')
        city = request.data.get('city')
        postal_code = request.data.get('postal_code')
        payment_method = request.data.get('payment_method', 'BLIK')

        if not all([full_name, email, address, city, postal_code]):
            return Response(
                {'error': 'Proszę uzupełnić wszystkie wymagane pola dostawy.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        order_number = f"ORD-{uuid.uuid4().hex[:8].upper()}"
        order = Order.objects.create(
            order_number=order_number,
            user=request.user if request.user.is_authenticated else None,
            full_name=full_name,
            email=email,
            phone=phone,
            address=address,
            city=city,
            postal_code=postal_code,
            payment_method=payment_method,
            total_price=cart.total_price,
            status='paid',
        )

        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                product_name=item.product.name,
                unit_price=item.product.current_price,
                quantity=item.quantity,
                line_total=item.line_total,
            )

        # Clear cart
        cart.items.all().delete()

        return Response({
            'message': 'Zamówienie zostało złożone pomyślnie!',
            'order': OrderSerializer(order).data
        }, status=status.HTTP_201_CREATED)


# --- SPA Fallback View ---

@ensure_csrf_cookie
def spa_index(request):
    """Serves the single-page application index HTML."""
    return render(request, 'index.html')
