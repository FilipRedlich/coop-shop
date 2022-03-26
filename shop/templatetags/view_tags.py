from hashlib import sha256
from django import template
from shop.models import Categories, Products, Users

register = template.Library()

ON=0

@register.simple_tag
#insert into cat db
def insert_into_cat(name):
    if(ON==1):
        Categories.objects.create(name=name)

@register.simple_tag
#check for discount and returns items from cat with discount
def outputCat(cat):
    if(ON==1):
        return Products.objects.filter(cat=cat)

@register.simple_tag
#check for discount and returns items from cat with discount
def hasDiscount(cat):
    if(ON==1):
        return Products.objects.filter(cat=cat).exclude(mult=0)

@register.simple_tag
#adds new user to db
def registerUser(login,password):
    if(ON==1):
        passT = sha256(password.encode('utf-8'))
        Users.objects.create(login=login,password=passT.hexdigest())
