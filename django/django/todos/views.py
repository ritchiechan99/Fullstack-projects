from django.http import HttpResponse
from django.shortcuts import render
from .models import ToDoList

# /product
def index(request):
    todos = ToDoList.objects.all() #returns all object
    #Product.objects.filter() #filter products i.e < $2, out of stock, etc..
    #Product.objects.get() #get a single products
    #Product.objects.save() #insert/update products
    return render(request, 'index.html', {'todos': todos})

# /product/new
def new(request):
    return HttpResponse('This page is a new product page')