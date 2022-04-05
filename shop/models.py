#from operator import mod
#from pyexpat import model
from django.db import models

# Create your models here.

class Users(models.Model):
    login=models.CharField(max_length=30)
    password=models.CharField(max_length=255)
    def __str__(self):
        return str(self.pk)+". "+self.login

class Categories(models.Model):
    name=models.CharField(max_length=50)
    picture=models.CharField(max_length=255,blank=1)
    def __str__(self):
        return str(self.pk)+". "+self.name

class subCategories(models.Model):
    name=models.CharField(max_length=50,default="empty")
    catID=models.ForeignKey(Categories, on_delete=models.CASCADE)
    picture=models.CharField(max_length=255,blank=1)
    def __str__(self):
        return str(self.pk)+". "+self.name+" ("+str(self.catID)+")"

class Products(models.Model):
    name=models.CharField(max_length=255)
    picture=models.CharField(max_length=255,blank=1)
    subcat=models.ForeignKey(subCategories, on_delete=models.CASCADE,default=1)
    quantity=models.IntegerField(default=1)
    price=models.FloatField()
    mult=models.FloatField(default=1.0)
    rating=models.FloatField(default=3.0)
    def __str__(self):
        return str(self.pk)+". "+self.name

class Basket(models.Model):
    userID=models.ForeignKey(Users, on_delete=models.CASCADE)
    productID=models.ForeignKey(Products, on_delete=models.CASCADE)
    def __str__(self):
        return str(self.pk)+". "+self.userID

class Services(models.Model):
    name=models.CharField(max_length=255,default="test")
    price=models.FloatField(default=9.99)
    def __str__(self):
        return self.name