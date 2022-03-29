from hashlib import sha256
from django import template
from shop.models import Categories, Products, Users, subCategories

register = template.Library()

ON=1

@register.simple_tag
#insert into cat db
def insert_into_cat(name):
    if(ON==1):
        Categories.objects.create(name=name)

@register.simple_tag
#check for discount and returns items from cat with discount
def outputSubcat(cat,field):
    if(ON==1):
        temp = Products.objects.values_list(field).filter(subcat=cat)
        out=""
        for t in temp:
            out+=str(t)
        return out

@register.simple_tag
#check for discount and returns items from cat with discount
def outputCat(cat):
    if(ON==1):
        temp = subCategories.objects.values_list("name").filter(catID=cat)
        out=""
        for t in temp:
            out+=str(t)
        return out

@register.simple_tag
#check for discount and returns items from cat with discount
def hasDiscount(cat):
    if(ON==1):
        temp = Products.objects.filter(subcat=cat).exclude(mult=1.0)
        out=""
        for t in temp:
            out+=str(t)
        return out

@register.simple_tag
#adds new user to db
def registerUser(login,password):
    if(ON==1):
        passT = sha256(password.encode('utf-8'))
        Users.objects.create(login=login,password=passT.hexdigest())
