## Demo Website
* https://pycoop.herokuapp.com (It might load for few seconds due to hosting's hibernation)
## Links
* [General info] (#general-info)
* [Technologies] (#technologies)
## General info
Online shop project in team of duo.

## Technologies
Project is created with:
### Front-End
* React: 17.0.2
* React-router: ^6.8.2
* Babel/core: 7.17.5
* Babel/runtime: 7.17.2
* Babel-preset-airbnb: 5.0.0
* Eslint: 8.10.0
* Parcel: 2.5.0
* Prettier 2.5.1
* Sass 1.50.1
### Back-End
* Python 3.10.4
* Django 4.0.3
* django-heroku 0.3.1
* asgiref 3.5.0
* click 8.0.4
* colorama 0.4.4
* dj-database-url 0.5.0
* Flask 2.0.3
* itsdangerous 2.1.1
* Jinja2 3.0.3
* MarkupSafe 2.1.0
* psycopg2 2.9.3
* sqlparse 0.4.2
* tzdata 2021.5
* Werkzeug 2.0.3
* whitenoise 6.0.0
## Setup
To run this project on frontend:
* Change all the variables from for example: products to productsTest (you will find them in components)
* Otherwise you might encounter errors, elements not rendering
* ```npm install``` or ```npm i -D parcel```
* ```npm run dev```

To create a build (Depends on Parcel version):
* ```npm run prod```
or 
* ```npm run prodUnofficial```

To run localserver:
* ```python3 manage.py runserver```
## Details
* Path to project files is: ```shop\templates\shop\src```
* In build at ```shop\templates\shop\build``` we store our main file ```index.html``` that is being uploaded to heroku, and files like css, js etc. we store in static here ```shop\static\shop```
* Keep in mind that our index.html file in build must have: ```{% load static %} {% load view_tags %}``` on top of the document, and other Django functions that can be found in HTML script tag
* With each build you have to add all Django functions and the rest of the code from script tag to ```index.html``` or only change name inside already existing HTML in build folder to names of files that you moved to ```shop/static/shop```
* To create a build with Parcel bundler on version from ```package.json``` use ```npm run prodUnofficial```





