from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.views.generic.base import TemplateView

from .models import Users,Basket,Categories,Products


class IndexView(generic.ListView):
    #model = Products
    template_name = 'shop/build/index.html'
    context_object_name = 'latest_question_list'
    def get_queryset(self):
        return Products.objects.order_by('name')

class CatView(TemplateView):
    template_name = 'shop/build/index.html'
    #context_object_name = 'cat_list'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Categories.objects.all()
        context['products'] = Products.objects.all()
        context['users'] = Users.objects.all()
        context['basket'] = Basket.objects.all()
        return context


'''
def insert_into_cat(name):
    Categories.objects.create(name=name)

def register(login,password):
    Users.objects.create(login=login,password=sha256(password))
'''