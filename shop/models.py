from operator import mod
from pyexpat import model
from django.db import models

# Create your models here.

class Users(models.Model):
    login=models.CharField(max_length=30)
    password=models.CharField(max_length=255)

class Categories(models.Model):
    name=models.CharField(max_length=50)

class Products(models.Model):
    name=models.CharField(max_length=255)
    picture=models.CharField(max_length=255,blank=1)
    cat=models.ForeignKey(Categories, on_delete=models.CASCADE)
    quantity=models.IntegerField()
    price=models.FloatField()
    rating=models.FloatField(default=3.0)

class Basket(models.Model):
    userID=models.ForeignKey(Users, on_delete=models.CASCADE)
    productID=models.ForeignKey(Products, on_delete=models.CASCADE)