from django.contrib import admin
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


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug', 'picture')
    search_fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Subcategory)
class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'slug', 'picture')
    list_filter = ('category',)
    search_fields = ('name', 'slug', 'category__name')
    prepopulated_fields = {'slug': ('name',)}


@admin.action(description='Ustaw zaznaczony produkt jako Gorący Strzał (Hotshot)')
def make_hotshot(modeladmin, request, queryset):
    Product.objects.filter(is_hotshot=True).update(is_hotshot=False)
    first = queryset.first()
    if first:
        first.is_hotshot = True
        if first.discount_multiplier >= 1.0:
            first.discount_multiplier = 0.75  # 25% discount by default
        first.save()


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'subcategory',
        'price',
        'discount_multiplier',
        'current_price',
        'quantity',
        'rating',
        'is_hotshot',
    )
    list_filter = ('subcategory__category', 'subcategory', 'is_hotshot')
    search_fields = ('name', 'description')
    list_editable = ('price', 'discount_multiplier', 'quantity', 'is_hotshot')
    actions = [make_hotshot]
    prepopulated_fields = {'slug': ('name',)}


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    raw_id_fields = ('product',)


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'session_key', 'total_items', 'total_price', 'updated_at')
    inlines = [CartItemInline]


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    raw_id_fields = ('product',)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'full_name', 'email', 'total_price', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('order_number', 'full_name', 'email', 'phone')
    inlines = [OrderItemInline]


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'created_at')
    search_fields = ('email',)