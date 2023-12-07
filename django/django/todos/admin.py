from django.contrib import admin
from .models import ToDoList


class ListAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_done')


# class OfferAdmin(admin.ModelAdmin):
#     list_display = ('code', 'discount')


admin.site.register(ToDoList, ListAdmin)
# admin.site.register(Offer, OfferAdmin)