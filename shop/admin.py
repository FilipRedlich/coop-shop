from django.contrib import admin

from .models import Services,Users,Basket,Categories,Products,subCategories

class ProductsAdmin(admin.ModelAdmin):
    #fields = ['name','picture','cat','quantity','price','mult','rating']
    list_display = ('pk','name','subcat')

class UsersAdmin(admin.ModelAdmin):
    #fields = ['login','password']
    list_display = ('login',)

class BasketAdmin(admin.ModelAdmin):
    #fields = ['userID','productID']
    list_display=('userID','productID')

class CategoriesAdmin(admin.ModelAdmin):
    #fields = ['name']
    list_display=('pk','name',)

class subCategoriesAdmin(admin.ModelAdmin):
    #fields = ['name']
    list_display=('pk','name','catID')

class servicesAdmin(admin.ModelAdmin):
    list_display=('name','price')

admin.site.register(Products,ProductsAdmin)
admin.site.register(Users,UsersAdmin)
admin.site.register(Basket,BasketAdmin)
admin.site.register(Categories,CategoriesAdmin)
admin.site.register(subCategories,subCategoriesAdmin)
admin.site.register(Services,servicesAdmin)