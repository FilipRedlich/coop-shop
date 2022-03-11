from django.contrib import admin

from .models import Users,Basket,Categories,Products

class ProductsAdd(admin.ModelAdmin):
    fields = ['name','picture','cat','quantity','price','rating']

class UsersAdd(admin.ModelAdmin):
    fields = ['login','password']

admin.site.register(Products, ProductsAdd)
admin.site.register(Users,UsersAdd)
admin.site.register(Basket)
admin.site.register(Categories)

'''
class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3


class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['question_text']}),
        ('Date information', {'fields': ['pub_date'], 'classes': ['collapse']}),
    ]
    inlines = [ChoiceInline]

admin.site.register(Question, QuestionAdmin)
'''