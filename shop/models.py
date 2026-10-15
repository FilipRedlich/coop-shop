from decimal import Decimal
from django.contrib.auth.models import User
from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    picture = models.CharField(max_length=255, blank=True)

    class Meta:
        verbose_name = 'Kategoria'
        verbose_name_plural = 'Kategorie'
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Subcategory(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='subcategories'
    )
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    picture = models.CharField(max_length=255, blank=True)

    class Meta:
        verbose_name = 'Podkategoria'
        verbose_name_plural = 'Podkategorie'
        ordering = ['category__name', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            idx = 1
            while Subcategory.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{idx}"
                idx += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.category.name} -> {self.name}"


class Product(models.Model):
    subcategory = models.ForeignKey(
        Subcategory,
        on_delete=models.CASCADE,
        related_name='products'
    )
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, blank=True)
    description = models.TextField(blank=True, default='')
    picture = models.CharField(max_length=255, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_multiplier = models.DecimalField(
        max_digits=4,
        decimal_places=2,
        default=Decimal('1.00')
    )
    quantity = models.PositiveIntegerField(default=10)
    rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=Decimal('4.50')
    )
    is_hotshot = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Produkt'
        verbose_name_plural = 'Produkty'
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)[:240]
            slug = base_slug
            idx = 1
            while Product.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{idx}"
                idx += 1
            self.slug = slug
        super().save(*args, **kwargs)

    @property
    def current_price(self) -> Decimal:
        raw = self.price * self.discount_multiplier
        return Decimal(str(round(float(raw), 2)))

    @property
    def is_discounted(self) -> bool:
        return self.discount_multiplier < Decimal('1.00')

    @property
    def discount_percentage(self) -> int:
        if not self.is_discounted:
            return 0
        return int(round((1 - float(self.discount_multiplier)) * 100))

    def __str__(self):
        return self.name


class Cart(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='carts'
    )
    session_key = models.CharField(max_length=40, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Koszyk'
        verbose_name_plural = 'Koszyki'

    @property
    def total_price(self) -> Decimal:
        total = sum(item.line_total for item in self.items.all())
        return Decimal(str(round(float(total), 2)))

    @property
    def total_items(self) -> int:
        return sum(item.quantity for item in self.items.all())

    def __str__(self):
        owner = self.user.username if self.user else f"Sesja: {self.session_key}"
        return f"Koszyk #{self.pk} ({owner})"


class CartItem(models.Model):
    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name='items'
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='cart_items'
    )
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        verbose_name = 'Element koszyka'
        verbose_name_plural = 'Elementy koszyka'
        unique_together = ('cart', 'product')

    @property
    def line_total(self) -> Decimal:
        return self.product.current_price * self.quantity

    def __str__(self):
        return f"{self.quantity}x {self.product.name}"


class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Subskrybent newslettera'
        verbose_name_plural = 'Subskrybenci newslettera'
        ordering = ['-created_at']

    def __str__(self):
        return self.email


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Oczekujące'),
        ('paid', 'Opłacone'),
        ('shipped', 'Wysłane'),
        ('delivered', 'Dostarczone'),
        ('cancelled', 'Anulowane'),
    ]

    order_number = models.CharField(max_length=32, unique=True)
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='orders'
    )
    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    payment_method = models.CharField(max_length=50, default='BLIK')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='paid')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Zamówienie'
        verbose_name_plural = 'Zamówienia'
        ordering = ['-created_at']

    def __str__(self):
        return f"Zamówienie {self.order_number} ({self.full_name})"


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name='items'
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    product_name = models.CharField(max_length=255)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)
    line_total = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        verbose_name = 'Pozycja zamówienia'
        verbose_name_plural = 'Pozycje zamówienia'

    def __str__(self):
        return f"{self.quantity}x {self.product_name}"