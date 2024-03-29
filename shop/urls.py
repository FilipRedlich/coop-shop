from django.urls import path

from . import views

app_name = 'shop'
urlpatterns = [
    path('', views.indexView, name='index'),
    path('<int:pk>/', views.ProductView.as_view(), name='product'),
    path('sethot/', views.setHotshot, name='setHotshot'),
    path('pay/', views.payView, name='pay'),
    path('register/', views.register, name='register'),
    path('loginFunc/', views.login, name='loginFunc'),
    path('logout/', views.logout, name='logout'),
    path('addProductToBasket/', views.addProductToBasket, name='addProductToBasket'),
    path('deleteProductToBasket/', views.deleteProductToBasket, name='deleteProductToBasket'),
    path('changeHotshot/', views.changeHotshot, name='changeHotshot'),
    path('subscribeToNewsletter/', views.subscribeToNewsletter, name='subscribeToNewsletter'),
    path('changeQuantityInBasket/', views.changeQuantityInBasket, name='changeQuantityInBasket'),
    path('test/', views.testView, name='test'),
    path('test2/', views.testView2, name='test2'),
    path('test3/', views.testView3, name='test3'),
]