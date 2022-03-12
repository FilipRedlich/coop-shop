from django.contrib import admin

from .models import Users,Basket,Categories,Products

class ProductsAdmin(admin.ModelAdmin):
    fields = ['name','picture','cat','quantity','price','rating']
    list_display = ('name','cat')

class UsersAdmin(admin.ModelAdmin):
    fields = ['login','password']
    list_display = ('login',)

class BasketAdmin(admin.ModelAdmin):
    fields = ['userID','productID']
    list_display=('userID','productID')

class CategoriesAdmin(admin.ModelAdmin):
    fields = ['name']
    list_display=('name',)

admin.site.register(Products,ProductsAdmin)
admin.site.register(Users,UsersAdmin)
admin.site.register(Basket,BasketAdmin)
admin.site.register(Categories,CategoriesAdmin)