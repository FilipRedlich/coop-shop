from django.contrib import admin

from .models import Users,Basket,Categories,Products

class ProductAdd(admin.ModelAdmin):
    fields = ['name','picture','cat','quantity','price','rating']

admin.site.register(Products, ProductAdd)

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