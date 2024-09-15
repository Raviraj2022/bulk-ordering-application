from django.contrib import admin

# Register your models here.

from .models import CustomUser, CabriotItems

admin.site.register(CustomUser)
admin.site.register(CabriotItems)
