import logging
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.views.generic.base import TemplateView
from hashlib import sha256

from .models import Users,Basket,Categories,Products,subCategories,Services

logging.basicConfig(level=logging.INFO)

class IndexView(TemplateView):
    template_name = 'shop/build/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

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

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

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

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        #models with many fields use values_list() to get values of all fields
        context['categories'] = Categories.objects.values_list()
        context['products'] = Products.objects.values_list()
        context['users'] = Users.objects.values_list
        context['basket'] = Basket.objects.values_list
        context['subcategories'] = subCategories.objects.values_list()
        context['services'] = Services.objects.values_list()
        return context

salt = "&sayu#"

def register(request):
    login = request.POST["email"]
    password = request.POST["password"]
    password += salt
    passT = sha256(password.encode('utf-8'))
    Users.objects.create(login=login,password=passT.hexdigest())
    return HttpResponseRedirect(reverse('shop:index'))

def login(request):
    login = request.POST["email"]
    password = request.POST["password"]
    password += salt
    passT = sha256(password.encode('utf-8'))
    passT = "<QuerySet ['"+str(passT.hexdigest())+"']>"
    getPass = Users.objects.values_list("password", flat=True).filter(login=login)
    #logging.info(getPass)
    #logging.info(passT)
    logging.info(request.session['email'])
    if(str(getPass)==str(passT)):
        logging.info("Login: "+login)
        request.session['email'] = login
    else:
        logging.info("Bad login: "+login)
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