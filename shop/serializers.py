from django.contrib.auth.models import User
from rest_framework import serializers

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


class SubcategorySerializer(serializers.ModelSerializer):
    category_id = serializers.IntegerField(source='category.id', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    product_count = serializers.IntegerField(source='products.count', read_only=True)

    class Meta:
        model = Subcategory
        fields = [
            'id',
            'name',
            'slug',
            'picture',
            'category_id',
            'category_name',
            'product_count',
        ]


class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubcategorySerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'picture', 'subcategories']


class ProductSerializer(serializers.ModelSerializer):
    subcategory_id = serializers.IntegerField(source='subcategory.id', read_only=True)
    subcategory_name = serializers.CharField(source='subcategory.name', read_only=True)
    category_id = serializers.IntegerField(source='subcategory.category.id', read_only=True)
    category_name = serializers.CharField(source='subcategory.category.name', read_only=True)
    current_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    is_discounted = serializers.BooleanField(read_only=True)
    discount_percentage = serializers.IntegerField(read_only=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'slug',
            'description',
            'picture',
            'price',
            'discount_multiplier',
            'current_price',
            'is_discounted',
            'discount_percentage',
            'quantity',
            'rating',
            'is_hotshot',
            'subcategory_id',
            'subcategory_name',
            'category_id',
            'category_name',
        ]


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    line_total = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'line_total']


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    total_items = serializers.IntegerField(read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'items', 'total_price', 'total_items']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff', 'is_superuser']


class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['id', 'email', 'created_at']


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product_name', 'unit_price', 'quantity', 'line_total']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id',
            'order_number',
            'full_name',
            'email',
            'phone',
            'address',
            'city',
            'postal_code',
            'payment_method',
            'total_price',
            'status',
            'created_at',
            'items',
        ]
