from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from .managers import CustomUserManager
from django.contrib.postgres.fields import ArrayField
# from django.contrib.postgres.fields import JSONField
# Create your models here.

class CustomUser(AbstractUser):
    username = models.CharField(max_length=250, null=True)
    email = models.EmailField(max_length=100, unique=True, null=True)
    ROLE_CHOICES = [
        ('admin', 'Admin'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='branch_manager')
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username



class CabriotItems(models.Model):
    item_id = models.AutoField(primary_key=True)
    itemImage = models.URLField(max_length=250, blank=True, null=True)
    itemName = models.CharField(max_length=100)
    user_id = models.IntegerField(default=1, null=True)
    data_create_time = models.DateTimeField(auto_now_add=True)
    last_data_updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.itemName

class MealItem(models.Model):
    MEAL_TYPES = (
        ('breakfast', 'Breakfast'),
        ('lunch', 'Lunch'),
        ('dinner', 'Dinner'),
    )
    item = models.ForeignKey(CabriotItems, on_delete=models.CASCADE, null=True)
    main_date = models.DateField()
    meal_availability_status = models.CharField(max_length=50)
    selected_dishes = ArrayField(models.IntegerField())

    def __str__(self):
        return f"Meal on {self.main_date} - {self.item.itemName} - {self.meal_availability_status}"

class MealQuantity(models.Model):
    MEAL_TYPES = (
        ('breakfast', 'Breakfast'),
        ('lunch', 'Lunch'),
        ('dinner', 'Dinner'),
    )
    meal_item = models.ForeignKey('MealItem', related_name='meal_quantities', on_delete=models.CASCADE)
    item_id = models.PositiveIntegerField()  # Or ForeignKey to a dish model if applicable
    quantity = models.PositiveIntegerField()
    meal_type = models.CharField(max_length=10, choices=MEAL_TYPES, default='breakfast')

    def __str__(self):
        return f"Dish {self.dish_id} - {self.quantity} - {self.meal_type}"

# class Meal(models.Model):
#     MEAL_TYPES = (
#         ('breakfast', 'Breakfast'),
#         ('lunch', 'Lunch'),
#         ('dinner', 'Dinner'),
#     )

#     dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
#     quantity = models.PositiveIntegerField()
#     meal_type = models.CharField(max_length=10, choices=MEAL_TYPES)
#     date = models.DateField()
#     availability_status = models.CharField(max_length=255)

#     def __str__(self):
#         return f"{self.dish.name} - {self.get_meal_type_display()} - {self.date}"

class VegeTableItem(models.Model):
    vegetable_date = models.DateField()
    vegetable_availability_status = models.CharField(max_length=50)
    vegetable_qty = ArrayField(ArrayField(models.IntegerField()), blank=True, null=True)
    selected_dishes = ArrayField(models.IntegerField())

    def __str__(self):
        return f"Meal on {self.vegetable_date} - {self.vegetable_availability_status}"        