from hashlib import sha256
from django import template
from shop.models import Categories, Users

register = template.Library()
@register.simple_tag

def insert_into_cat(name):
    return 0
    Categories.objects.create(name=name)

def registerUser(login,password):
    Users.objects.create(login=login,password=sha256(password))