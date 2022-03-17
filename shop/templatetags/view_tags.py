from django import template

from shop.views import insert_into_cat

register = template.Library()

@register.simple_tag
def insert_into_cat_tag(name):
    insert_into_cat(name)
