from django.contrib import admin

from .models import Users,Basket,Categories,Products

class ProductsAdmin(admin.ModelAdmin):
    fields = ['name','picture','cat','quantity','price','rating']
    list_display = ('name','cat')

class UsersAdmin(admin.ModelAdmin):
    fields = ['login','password']
    list_display = ('login')

admin.site.register(Products,ProductsAdmin)
admin.site.register(Users,UsersAdmin)
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