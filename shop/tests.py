from decimal import Decimal
from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from .models import Category, Subcategory, Product, Cart, CartItem, Order, NewsletterSubscriber


class ShopApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Create category and subcategory
        self.category = Category.objects.create(name='Komputery', picture='/test.jpg')
        self.subcat = Subcategory.objects.create(category=self.category, name='Laptopy', picture='/test.jpg')

        # Create products
        self.product1 = Product.objects.create(
            subcategory=self.subcat,
            name='Laptop Dell XPS 15',
            price=Decimal('5000.00'),
            discount_multiplier=Decimal('0.90'),
            quantity=5,
            rating=Decimal('4.90'),
            is_hotshot=True
        )
        self.product2 = Product.objects.create(
            subcategory=self.subcat,
            name='Laptop Lenovo Legion 5',
            price=Decimal('4000.00'),
            discount_multiplier=Decimal('1.00'),
            quantity=8,
            rating=Decimal('4.70'),
            is_hotshot=False
        )

        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='password123')
        self.admin = User.objects.create_superuser(username='adminuser', email='admin@example.com', password='adminpassword')

    def test_categories_api(self):
        response = self.client.get(reverse('shop:category_list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Komputery')
        self.assertEqual(len(response.data[0]['subcategories']), 1)

    def test_products_api(self):
        response = self.client.get(reverse('shop:product_list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_products_filter_on_sale(self):
        response = self.client.get(reverse('shop:product_list') + '?on_sale=true')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Laptop Dell XPS 15')

    def test_products_search(self):
        response = self.client.get(reverse('shop:product_list') + '?search=Legion')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Laptop Lenovo Legion 5')

    def test_hotshot_api(self):
        response = self.client.get(reverse('shop:hotshot'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.product1.id)

    def test_cart_workflow(self):
        # 1. Add product to cart
        add_resp = self.client.post(reverse('shop:cart_add'), {'product_id': self.product1.id, 'quantity': 2})
        self.assertEqual(add_resp.status_code, status.HTTP_200_OK)
        self.assertEqual(add_resp.data['cart']['total_items'], 2)
        # 5000 * 0.90 = 4500 * 2 = 9000
        self.assertEqual(Decimal(str(add_resp.data['cart']['total_price'])), Decimal('9000.00'))

        # 2. Update quantity
        update_resp = self.client.post(reverse('shop:cart_update'), {'product_id': self.product1.id, 'quantity': 1})
        self.assertEqual(update_resp.status_code, status.HTTP_200_OK)
        self.assertEqual(update_resp.data['cart']['total_items'], 1)
        self.assertEqual(Decimal(str(update_resp.data['cart']['total_price'])), Decimal('4500.00'))

        # 3. View cart
        cart_resp = self.client.get(reverse('shop:cart'))
        self.assertEqual(cart_resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(cart_resp.data['items']), 1)

        # 4. Remove product
        remove_resp = self.client.post(reverse('shop:cart_remove'), {'product_id': self.product1.id})
        self.assertEqual(remove_resp.status_code, status.HTTP_200_OK)
        self.assertEqual(remove_resp.data['cart']['total_items'], 0)

    def test_auth_workflow(self):
        # Register new user
        reg_resp = self.client.post(reverse('shop:auth_register'), {
            'username': 'newuser',
            'email': 'new@example.com',
            'password': 'secretpassword'
        })
        self.assertEqual(reg_resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(reg_resp.data['user']['username'], 'newuser')

        # Check me
        me_resp = self.client.get(reverse('shop:auth_me'))
        self.assertEqual(me_resp.data['authenticated'], True)
        self.assertEqual(me_resp.data['user']['username'], 'newuser')

        # Logout
        self.client.post(reverse('shop:auth_logout'))
        me_resp2 = self.client.get(reverse('shop:auth_me'))
        self.assertEqual(me_resp2.data['authenticated'], False)

        # Login
        login_resp = self.client.post(reverse('shop:auth_login'), {
            'username': 'newuser',
            'password': 'secretpassword'
        })
        self.assertEqual(login_resp.status_code, status.HTTP_200_OK)
        self.assertEqual(login_resp.data['user']['username'], 'newuser')

    def test_newsletter_subscription(self):
        resp = self.client.post(reverse('shop:newsletter'), {'email': 'newsletter@test.com'})
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertTrue(NewsletterSubscriber.objects.filter(email='newsletter@test.com').exists())

    def test_checkout_workflow(self):
        # Add item to cart
        self.client.post(reverse('shop:cart_add'), {'product_id': self.product2.id, 'quantity': 1})

        # Checkout
        checkout_resp = self.client.post(reverse('shop:checkout'), {
            'full_name': 'Jan Kowalski',
            'email': 'jan@kowalski.pl',
            'phone': '123456789',
            'address': 'ul. Kwiatowa 15',
            'city': 'Warszawa',
            'postal_code': '00-001',
            'payment_method': 'BLIK'
        })
        self.assertEqual(checkout_resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(checkout_resp.data['order']['full_name'], 'Jan Kowalski')
        self.assertEqual(Decimal(str(checkout_resp.data['order']['total_price'])), Decimal('4000.00'))

        # Cart should be empty after checkout
        cart_resp = self.client.get(reverse('shop:cart'))
        self.assertEqual(cart_resp.data['total_items'], 0)