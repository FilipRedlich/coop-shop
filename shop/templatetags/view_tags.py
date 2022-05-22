from django import template
from shop.models import Basket, Categories, Products, Users, subCategories

register = template.Library()

#change to 0 after refractor
ON=0

@register.simple_tag
#check for discount and returns items from subcat with discount
def hasDiscount(cat=-1):
    if(cat!=-1):
        query = Products.objects.values_list().filter(subcat=cat).exclude(mult=1.0)
    else:
        query = Products.objects.values_list().exclude(mult=1.0)
    out=""
    i=0
    ii=0
    for row in query:
        if(i!=0):
            out+="***"
        for row2 in row:
            if(ii!=0):
                out+=";;;"
            out+=str(row2)
            ii=1
        ii=0
        i=1
    return out

@register.simple_tag
#check for hotshot and returns items from subcat with hotshot
def hasHotshot(cat=-1):
    if(cat!=-1):
        query = Products.objects.values_list().filter(subcat=cat).exclude(hotshot=False)
    else:
        query = Products.objects.values_list().exclude(hotshot=False)
    out=""
    i=0
    ii=0
    for row in query:
        if(i!=0):
            out+="***"
        for row2 in row:
            if(ii!=0):
                out+=";;;"
            out+=str(row2)
            ii=1
        ii=0
        i=1
    return out

@register.simple_tag
#output all products from selected user basket
def outputBasket(userID):
    query = Basket.objects.values_list().filter(userID=userID)
    tab = ""
    i=0
    for row in query:
        if(i!=0):
            out+=";"
        out+=str(row[2])
        i=1
    return tab

@register.simple_tag
#output all subcats specified field from selected cat
def getSubcatsFromCat(cat,field=-1):
    query = subCategories.objects.values_list().filter(catID=cat)
    out=""
    i=0
    ii=0
    for row in query:
        if field==-1:
            if(i!=0):
                out+="***"
            for row2 in row:
                if(ii!=0):
                    out+=";;;"
                out+=str(row2)
                ii=1
            ii=0
        else:
            if(i!=0):
                out+=";"
            out+=str(row[field])
        i=1
    return out

@register.simple_tag
#output all products specified field from selected subcat
def getProductsFromSubcat(cat,field=-1):
    query = Products.objects.values_list().filter(subcat=cat)
    out=""
    i=0
    ii=0
    for row in query:
        if field==-1:
            if(i!=0):
                out+="***"
            for row2 in row:
                if(ii!=0):
                    out+=";;;"
                out+=str(row2)
                ii=1
            ii=0
        else:
            if(i!=0):
                out+=";"
            out+=str(row[field])
        i=1
    return out