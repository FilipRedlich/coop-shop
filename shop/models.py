#from operator import mod
#from pyexpat import model
from django.db import models

# Create your models here.

#table Users {pk,login,password}
class Users(models.Model):
    login=models.CharField(max_length=30)
    password=models.CharField(max_length=255)
    newsletter=models.BooleanField(default=True)
    def __str__(self):
        return str(self.pk)+". "+self.login

#table Categoeries {pk,name,picture}
class Categories(models.Model):
    name=models.CharField(max_length=50)
    picture=models.CharField(max_length=255,blank=1)
    def __str__(self):
        return str(self.pk)+". "+self.name

#table subCategories {pk,name,catID,picture}
class subCategories(models.Model):
    name=models.CharField(max_length=50,default="empty")
    picture=models.CharField(max_length=255,blank=1)
    catID=models.ForeignKey(Categories, on_delete=models.CASCADE)
    def __str__(self):
        return str(self.pk)+". "+self.name+" ("+str(self.catID)+")"

#table Products {pk,name,picture,subcat,quantity,price,mult,rating}
class Products(models.Model):
    name=models.CharField(max_length=255)
    picture=models.CharField(max_length=255,blank=1)
    subcat=models.ForeignKey(subCategories, on_delete=models.CASCADE,default=1)
    quantity=models.IntegerField(default=1)
    price=models.FloatField()
    mult=models.FloatField(default=1.0)
    rating=models.FloatField(default=3.0)
    hotshot=models.BooleanField(default=False)
    def __str__(self):
        return str(self.pk)+". "+self.name

#table Basket {pk,userID,productID}
class Basket(models.Model):
    userID=models.ForeignKey(Users, on_delete=models.CASCADE)
    productID=models.ForeignKey(Products, on_delete=models.CASCADE, unique=True)
    quantity=models.IntegerField(default=1)
    def __str__(self):
        return str(self.pk)+". "+str(self.userID)

#table Services {pk,name,price}
class Services(models.Model):
    name=models.CharField(max_length=255,default="test")
    price=models.FloatField(default=9.99)
    def __str__(self):
        return self.name