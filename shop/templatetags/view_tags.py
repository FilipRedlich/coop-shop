from hashlib import sha256
from django import template
from shop.models import Categories, Users

register = template.Library()

@register.simple_tag
#insert into cat db
def insert_into_cat(name):
    #turned off for testing
    return 0
    Categories.objects.create(name=name)

@register.simple_tag
#adds new user to db
def registerUser(login,password):
    #turned off for testing
    return 0
    passT = sha256(password.encode('utf-8'))
    Users.objects.create(login=login,password=passT.hexdigest())
