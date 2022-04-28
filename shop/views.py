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

'''
#index class - main view
class IndexView(TemplateView):
    #html template that is used for index
    template_name = 'shop/build/index.html'
    
    #variables that are accesible from template view
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        #models with many fields use values_list() to get values of all fields
        context['categories'] = Categories.objects.values_list()
        context['products'] = Products.objects.values_list()
        context['users'] = Users.objects.values_list()
        context['basket'] = Basket.objects.values_list()
        context['subcategories'] = subCategories.objects.values_list()
        context['services'] = Services.objects.values_list()
        return context
'''

context = {
    #models with many fields use values_list() to get values of all fields
    'categories' : Categories.objects.values_list(),
    'products' : Products.objects.values_list(),
    'users' : Users.objects.values_list(),
    'basket' : Basket.objects.values_list(),
    'subcategories' : subCategories.objects.values_list(),
    'services' : Services.objects.values_list(),
}

#index class - main view
def indexView(request):
    global context
    testView3(request)
    return render(request, 'shop/build/index.html',context)

class ProductView(generic.DetailView):
    model = Products
    template_name = 'shop/build/product.html'

#test views
def testView(request):
    global context
    testView3(request)
    return render(request, 'shop/build/indextest.html',context)

def testView2(request):
    global context
    testView3(request)
    return render(request, 'shop/build/indextest2.html',context)

def testView3(request):
    global context
    temp = Basket.objects.values_list().filter(userID_id=request.session['userpk'])
    out=""
    i=0
    ii=0
    for t in temp:
        st=Products.objects.values_list().filter(pk=t[2])
        for row in st:
            if ii!=0:
                out+='***'
            for field in row:
                if i!=0:
                    out+=';;;'
                out+=str(field)
                i=1
            i=0
            ii=1
    context["basketProducts"] = out
    
    return render(request, 'shop/build/indextest3.html',context)

#unique salt for hashing passwords
salt = "&sayu#"

#function that uses variagbles from html form request to add new user to db
def register(request):
    #get variables from html request
    login = request.POST["email"]
    password = request.POST["password"]
    #adding salt to password
    password += salt
    #hashing password
    passT = sha256(password.encode('utf-8'))
    #looking up to db to check if this login already exist
    checkLogin = Users.objects.values_list("login",flat=True).filter(login=login)
    #if login doesnt exist then create new user
    if str(checkLogin) == "<QuerySet []>":
        Users.objects.create(login=login,password=passT.hexdigest())
    #if login exist retun error
    else:
        request.session['loginError'] = "This login already exist"
    #redirect to index after end of function
    return HttpResponseRedirect(reverse('shop:index'))

#function for comparing variables from html request and db and then login users
def login(request):
    #get variables from html request
    login = request.POST["email"]
    password = request.POST["password"]
    #adding salt to password
    password += salt
    #hashing password
    passT = sha256(password.encode('utf-8'))
    passT = "<QuerySet ['"+str(passT.hexdigest())+"']>"
    #getting hashed password for given login from db
    getPass = Users.objects.values_list("password", flat=True).filter(login=login)
    #checking if given password is the same as the password from db
    if(str(getPass)==str(passT)):
        logging.info("Login: "+login)
        #deleting loginError variable from session after successful login
        if 'loginError' in request.session:
            del request.session['loginError']
        #adding login and pk variable from db to session
        request.session['email'] = login
        userpk = Users.objects.values_list("pk", flat=True).filter(login=login)
        userpk = str(userpk).replace("<QuerySet [","")
        userpk = userpk.replace("]>","")
        request.session['userpk'] = userpk
    else:
        #returning loginError after unsuccessful login
        logging.info("Bad login: "+login)
        request.session['loginError'] = "Bad login or password"
    #redirect to index after end of function
    return HttpResponseRedirect(reverse('shop:index'))

#function for logout from the account
def logout(request):
    #deleting login variables from session
    if 'email' in request.session:
        del request.session['email']
    if 'loginError' in request.session:
        del request.session['loginError']
    if 'userpk' in request.session:
        del request.session['userpk']
    #redirect to index after end of function
    return HttpResponseRedirect(reverse('shop:index'))

#function for adding products to active user basket
def addProductToBasket(request):
    #getting user id to identify user
    productID = request.POST['id']
    #query to add product to given user's basket
    Basket.objects.create(userID_id=request.session['userpk'],productID_id=productID)
    #redirect to index after end of function
    return HttpResponseRedirect(reverse('shop:index'))