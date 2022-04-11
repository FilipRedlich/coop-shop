from asyncio.windows_events import NULL
from cmath import log
import logging
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.views.generic.base import TemplateView
from hashlib import sha256

from flask import request

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
    checkLogin = Users.objects.values_list("login",flat=True).filter(login=login)
    #logging.info(checkLogin)
    if str(checkLogin) == "<QuerySet []>":
        request.session['loginError'] = ""
        Users.objects.create(login=login,password=passT.hexdigest())
    else:
        request.session['loginError'] = "This login already exist"
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
    #logging.info(request.session['email'])
    if(str(getPass)==str(passT)):
        logging.info("Login: "+login)
        request.session['loginError'] = ""
        request.session['email'] = login
        userpk = Users.objects.values_list("pk", flat=True).filter(login=login)
        #<QuerySet [14]>
        userpk = str(userpk).replace("<QuerySet [","")
        userpk = userpk.replace("]>","")
        #logging.info(userpk)
        request.session['userpk'] = userpk
    else:
        logging.info("Bad login: "+login)
        request.session['loginError'] = "Bad login or password"
    return HttpResponseRedirect(reverse('shop:index'))

def logout(request):
    request.session['email'] = ""
    request.session['loginError'] = ""
    request.session['userpk'] = ""
    return HttpResponseRedirect(reverse('shop:index'))

def addProductToBasket(request,pk):
    return 0