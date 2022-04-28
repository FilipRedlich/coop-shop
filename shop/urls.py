from django.urls import path

from . import views

app_name = 'shop'
urlpatterns = [
    path('', views.indexView, name='index'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('addProductToBasket/', views.addProductToBasket, name='addProductToBasket'),
    path('test/', views.testView, name='test'),
    path('test2/', views.testView2, name='test2'),
    path('test3/', views.testView3, name='test3'),
]