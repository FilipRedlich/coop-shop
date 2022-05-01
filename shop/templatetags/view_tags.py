from django import template
from shop.models import Basket, Categories, Products, Users, subCategories

register = template.Library()

#change to 0 after refractor
ON=0

@register.simple_tag
#check for discount and returns items from subcat with discount
def hasDiscount(cat):
    query = Products.objects.values_list("name","price","mult").filter(subcat=cat).exclude(mult=1.0)
    out=""
    for row in query:
        out+=str(row)
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
def getSubcatsFromCat(cat,field):
    query = subCategories.objects.values_list().filter(catID=cat)
    out=""
    i=0
    ii=0
    for row in query:
        if field==99:
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
def getProductsFromSubcat(cat,field=99):
    query = Products.objects.values_list().filter(subcat=cat)
    out=""
    i=0
    ii=0
    for row in query:
        if field==99:
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