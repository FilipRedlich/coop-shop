from django.contrib import admin
from django.urls import path, include, re_path
from shop import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('shop.urls', namespace='shop')),
    # Client-side SPA routes fallback
    re_path(r'^(?!static/|media/|api/|admin/).*$', views.spa_index, name='spa_index'),
]
