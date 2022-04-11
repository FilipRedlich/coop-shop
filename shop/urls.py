from django.urls import path

from . import views

app_name = 'shop'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('test/', views.TestView.as_view(), name='test'),
    path('test2/', views.TestView2.as_view(), name='test2'),
]