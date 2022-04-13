from django import template
from shop.models import Basket, Categories, Products, Users, subCategories

register = template.Library()

ON=1

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
        temp = subCategories.objects.values_list('name').filter(catID=cat)
        out=""
        for t in temp:
            out+=str(t)
        return out

@register.simple_tag
#check for discount and returns items from cat with discount
def hasDiscount(cat):
    if(ON==1):
        temp = Products.objects.values_list("name","price","mult").filter(subcat=cat).exclude(mult=1.0)
        out=""
        for t in temp:
            out+=str(t)
        return out

@register.simple_tag
def outputBasket(userID):
    if(ON==1):
        getUserProds = Basket.objects.values_list().filter(userID=userID)
        tab = ""
        for tt in getUserProds:
            tab += str(tt[2])+" "
        return tab

@register.simple_tag
def getSubcatsFromCat(cat,field):
    if(ON==1):
        temp = subCategories.objects.values_list().filter(catID=cat)
        out=""
        i=0
        for t in temp:
            if(i!=0):
                out+=";"
            out+=str(t[int(field)])
            i=1
        return out

@register.simple_tag
def getProductsFromSubcat(cat,field):
    if(ON==1):
        temp = Products.objects.values_list().filter(subcat=cat)
        out=""
        i=0
        for t in temp:
            if(i!=0):
                out+=";"
            out+=str(t[int(field)])
            i=1
        return out