from django.urls import path
from . import views

app_name = 'shop'

urlpatterns = [
    # Catalog
    path('categories/', views.CategoryListAPIView.as_view(), name='category_list'),
    path('subcategories/', views.SubcategoryListAPIView.as_view(), name='subcategory_list'),
    path('products/', views.ProductListAPIView.as_view(), name='product_list'),
    path('products/<int:pk>/', views.ProductDetailAPIView.as_view(), name='product_detail'),
    path('hotshot/', views.HotshotAPIView.as_view(), name='hotshot'),

    # Cart
    path('cart/', views.CartAPIView.as_view(), name='cart'),
    path('cart/add/', views.CartAddAPIView.as_view(), name='cart_add'),
    path('cart/update/', views.CartUpdateAPIView.as_view(), name='cart_update'),
    path('cart/remove/', views.CartRemoveAPIView.as_view(), name='cart_remove'),
    path('cart/clear/', views.CartClearAPIView.as_view(), name='cart_clear'),

    # Auth
    path('auth/me/', views.AuthMeAPIView.as_view(), name='auth_me'),
    path('auth/login/', views.LoginAPIView.as_view(), name='auth_login'),
    path('auth/register/', views.RegisterAPIView.as_view(), name='auth_register'),
    path('auth/logout/', views.LogoutAPIView.as_view(), name='auth_logout'),

    # Newsletter & Checkout
    path('newsletter/', views.NewsletterSubscribeAPIView.as_view(), name='newsletter'),
    path('checkout/', views.CheckoutAPIView.as_view(), name='checkout'),
]