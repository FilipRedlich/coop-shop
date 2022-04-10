from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.views.generic.base import TemplateView

from .models import Users,Basket,Categories,Products,subCategories,Services


class IndexView(TemplateView):
    template_name = 'shop/build/index.html'
    #context_object_name = 'cat_list'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        #for models with 1 field all() return first str field
        #context['categories'] = Categories.objects.all()

        #models with many fields use values_list() to get values of all fields
        context['categories'] = Categories.objects.values_list()
        context['products'] = Products.objects.values_list()
        context['users'] = Users.objects.values_list()
        context['basket'] = Basket.objects.values_list()
        context['subcategories'] = subCategories.objects.values_list()
        context['services'] = Services.objects.values_list()
        #call function from models and pass it to template via gall
        #context['gall'] = Products.return_all()
        return context

class TestView(TemplateView):
    template_name = 'shop/build/indextest.html'
    #context_object_name = 'cat_list'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        #for models with 1 field all() return first str field
        #context['categories'] = Categories.objects.all()
        
        #models with many fields use values_list() to get values of all fields
        context['categories'] = Categories.objects.values_list()
        context['products'] = Products.objects.values_list()
        context['users'] = Users.objects.values_list
        context['basket'] = Basket.objects.values_list
        context['subcategories'] = subCategories.objects.values_list()
        context['services'] = Services.objects.values_list()
        return context

class TestView2(TemplateView):
    template_name = 'shop/build/indextest2.html'
    #context_object_name = 'cat_list'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        #for models with 1 field all() return first str field
        #context['categories'] = Categories.objects.all()
        
        #models with many fields use values_list() to get values of all fields
        context['categories'] = Categories.objects.values_list()
        context['products'] = Products.objects.values_list()
        context['users'] = Users.objects.values_list
        context['basket'] = Basket.objects.values_list
        context['subcategories'] = subCategories.objects.values_list()
        context['services'] = Services.objects.values_list()
        return context

def register(request):
    login = request.POST["login"]
    password = request.POST["pass"]
    Users.objects.create(login=login,password=password)
    return HttpResponseRedirect(reverse('shop:index'))

'''
class IndexView(generic.ListView):
    #model = Products
    template_name = 'shop/build/index.html'
    context_object_name = 'latest_question_list'
    def get_queryset(self):
        return Products.objects.order_by('name')
'''
'''
def insert_into_cat(name):
    Categories.objects.create(name=name)

def register(login,password):
    Users.objects.create(login=login,password=sha256(password))
'''