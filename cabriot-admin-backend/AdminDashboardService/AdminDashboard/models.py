from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

class DietaryChoice(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class CuisineChoice(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class MealChoice(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class State(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class City(models.Model):
    name = models.CharField(max_length=100)
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name='cities')

    def __str__(self):
        return self.name


class Kitchen(models.Model):
    kitchen_id = models.AutoField(primary_key=True)
    kitchenImage = models.ImageField(upload_to='media/menu_images/', blank=True, null=True)
    kitchenName = models.CharField(max_length=100)
    kitchenUrl = models.CharField(max_length=500, blank=True, null=True)
    kitchenDescription=models.CharField(max_length=1000,  blank=True, null=True)
    kitchenAddress=models.CharField(max_length=100,  blank=True)
    kitchenState=models.CharField(max_length=100,  blank=True, null=True)

    kitchenPinCode=models.IntegerField(blank=True)
    kitchenLatitude=models.CharField(max_length=100,  blank=True, null=True)
    kitchenLongitude=models.CharField(max_length=100,  blank=True, null=True)
    is_delivery_available = models.BooleanField(default=False, blank=True, null=True)
    kitchenCity = ArrayField(models.CharField(max_length=200), blank=True, null=True)

    data_create_time = models.DateTimeField(auto_now_add=True)
    last_data_updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.kitchenName


class DishInfo(models.Model):
    dish_id = models.AutoField(primary_key=True)
    dish_name = models.CharField(max_length=100)
    dish_image = models.ImageField(upload_to='media/menu_item_images/', blank=True, null=True)
    DishImgUrl = models.CharField(max_length=500, blank=True, null=True)
    dish_description = models.TextField(blank=True)
    dish_base_price = models.DecimalField(max_digits=8, decimal_places=2, blank=True)
    dish_weight = models.DecimalField(max_digits=8, decimal_places=2, blank=True)
    dish_availability_status = models.CharField(max_length=50,
                                                choices=[('available', 'Available'), ('unavailable', 'Unavailable')],
                                                default='available', blank=True)
    dish_calories = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    dish_protein = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    dish_carbohydrates = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    dish_fat = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    dish_fiber = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)

  
    dietary_choices = models.ManyToManyField(DietaryChoice)
    cuisine_choices = models.ManyToManyField(CuisineChoice)
    meal_choices = models.ManyToManyField(MealChoice)

    data_create_time = models.DateTimeField(auto_now_add=True)
    last_data_updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.dish_name}"


class Meal(models.Model):
    meal_id = models.AutoField(primary_key=True)
    meal_name = models.CharField(max_length=100)
    meal_image = models.ImageField(upload_to='media/menu_item_images/', blank=True, null=True)
    MealImgUrl = models.CharField(max_length=500, blank=True, null=True)
    meal_description = models.TextField(blank=True)
    meal_base_price = models.DecimalField(max_digits=8, decimal_places=2)
    meal_weight = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    meal_availability_status = models.CharField(max_length=50,
                                                choices=[('available', 'Available'), ('unavailable', 'Unavailable')],
                                                default='available')
    meal_qty = ArrayField(ArrayField(models.CharField(max_length=50)), blank=True, null=True)

    dietary_choices = models.ManyToManyField(DietaryChoice)
    cuisine_choices = models.ManyToManyField(CuisineChoice)
    meal_choices = models.ManyToManyField(MealChoice) 
    selected_dishes = models.ManyToManyField('DishInfo', related_name='selected_meals', blank=True)

    total_calories = models.DecimalField(max_digits=8, decimal_places=2, default=0, null=True)
    total_protein = models.DecimalField(max_digits=8, decimal_places=2, default=0, null=True)
    total_carbohydrates = models.DecimalField(max_digits=8, decimal_places=2, default=0, null=True)
    total_fat = models.DecimalField(max_digits=8, decimal_places=2, default=0, null=True)
    total_fiber = models.DecimalField(max_digits=8, decimal_places=2, default=0, null=True)

    data_create_time = models.DateTimeField(auto_now_add=True)
    last_data_updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.meal_name}"


class Menu(models.Model):
    menu_id = models.AutoField(primary_key=True)
    dish_name = models.CharField(max_length=100,blank=True, null=True)
    meal_name = models.CharField(max_length=100, blank=True, null=True)
    menu_price = models.IntegerField()
    menu_qty = models.IntegerField()
    monday = models.BooleanField(default=True, blank=True, null=True)
    tuesday = models.BooleanField(default=True, blank=True, null=True)
    wednesday = models.BooleanField(default=True, blank=True, null=True)
    thursday = models.BooleanField(default=True, blank=True, null=True)
    friday = models.BooleanField(default=True, blank=True, null=True)
    saturday = models.BooleanField(default=True, blank=True, null=True)
    sunday = models.BooleanField(default=True, blank=True, null=True)

    data_create_time = models.DateTimeField(auto_now_add=True)
    last_data_updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self. menu_id} Menu Added"


class KitchenMenus(models.Model):
    kitchens = models.ManyToManyField(Kitchen, related_name='kitchen_menus')
    kitchen_menus = models.ManyToManyField(Menu, related_name='kitchen_menus')

    def __str__(self):
        return f"{self. kitchens} - {self.kitchen_menus}"




class MealPlan(models.Model):
    meal_plan_id = models.AutoField(primary_key=True)
    meal_plan_name = models.CharField(max_length=100)
    meal_plan_image = models.ImageField(upload_to='media/menu_item_images/', blank=True, null=True)
    MealPlanImgUrl = models.CharField(max_length=500, blank=True, null=True)
    meal_plan_description = models.TextField(blank=True)
    meal_plan_availability_status = models.CharField(max_length=50,
                                                     choices=[('available', 'Available'),
                                                              ('unavailable', 'Unavailable')],
                                                     default='available')

    dietary_choices = models.ManyToManyField(DietaryChoice)
    cuisine_choices = models.ManyToManyField(CuisineChoice)

    daily_price = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    daily_breakfast_price = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    daily_lunch_price = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    daily_dinner_price = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)

    weekly_price = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    weekly_breakfast_price = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    weekly_lunch_price = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    weekly_dinner_price = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)

    monthly_price = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    monthly_breakfast_price = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    monthly_lunch_price = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    monthly_dinner_price = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)

    is_monday_available = models.BooleanField(default=False, blank=True, null=True)
    monday_breakfast_dish=models.ManyToManyField(DishInfo, blank=True, related_name='monday_breakfast_dish')
    monday_breakfast_meal=models.ManyToManyField(Meal, blank=True, related_name='monday_breakfast_meal')
    monday_breakfast_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='monday_breakfast_dish_option')
    monday_breakfast_meal_option = models.ManyToManyField(Meal, blank=True, related_name='monday_breakfast_meal_option')
    monday_lunch_dish = models.ManyToManyField(DishInfo, blank=True, related_name='monday_lunch_dish')
    monday_lunch_meal = models.ManyToManyField(Meal, blank=True, related_name='monday_lunch_meal')
    monday_lunch_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='monday_lunch_dish_option')
    monday_lunch_meal_option = models.ManyToManyField(Meal, blank=True, related_name='monday_lunch_meal_option')
    monday_dinner_dish = models.ManyToManyField(DishInfo, blank=True, related_name='monday_dinner_dish')
    monday_dinner_meal = models.ManyToManyField(Meal, blank=True, related_name='monday_dinner_meal')
    monday_dinner_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='monday_dinner_dish_option')
    monday_dinner_meal_option = models.ManyToManyField(Meal, blank=True, related_name='monday_dinner_meal_option')

    is_tuesday_available = models.BooleanField(default=False, blank=True, null=True)
    tuesday_breakfast_dish = models.ManyToManyField(DishInfo, blank=True, related_name='tuesday_breakfast_dish')
    tuesday_breakfast_meal = models.ManyToManyField(Meal, blank=True, related_name='tuesday_breakfast_meal')
    tuesday_breakfast_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='tuesday_breakfast_dish_option')
    tuesday_breakfast_meal_option = models.ManyToManyField(Meal, blank=True, related_name='tuesday_breakfast_meal_option')
    tuesday_lunch_dish = models.ManyToManyField(DishInfo, blank=True, related_name='tuesday_lunch_dish')
    tuesday_lunch_meal = models.ManyToManyField(Meal, blank=True, related_name='tuesday_lunch_meal')
    tuesday_lunch_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='tuesday_lunch_dish_option')
    tuesday_lunch_meal_option = models.ManyToManyField(Meal, blank=True, related_name='tuesday_lunch_meal_option')
    tuesday_dinner_dish = models.ManyToManyField(DishInfo, blank=True, related_name='tuesday_dinner_dish')
    tuesday_dinner_meal = models.ManyToManyField(Meal, blank=True, related_name='tuesday_dinner_meal')
    tuesday_dinner_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='tuesday_dinner_dish_option')
    tuesday_dinner_meal_option = models.ManyToManyField(Meal, blank=True, related_name='tuesday_dinner_meal_option')

    is_wednesday_available = models.BooleanField(default=False, blank=True, null=True)
    wednesday_breakfast_dish = models.ManyToManyField(DishInfo, blank=True, related_name='wednesday_breakfast_dish')
    wednesday_breakfast_meal = models.ManyToManyField(Meal, blank=True, related_name='wednesday_breakfast_meal')
    wednesday_breakfast_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='wednesday_breakfast_dish_option')
    wednesday_breakfast_meal_option = models.ManyToManyField(Meal, blank=True, related_name='wednesday_breakfast_meal_option')
    wednesday_lunch_dish = models.ManyToManyField(DishInfo, blank=True, related_name='wednesday_lunch_dish')
    wednesday_lunch_meal = models.ManyToManyField(Meal, blank=True, related_name='wednesday_lunch_meal')
    wednesday_lunch_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='wednesday_lunch_dish_option')
    wednesday_lunch_meal_option = models.ManyToManyField(Meal, blank=True, related_name='wednesday_lunch_meal_option')
    wednesday_dinner_dish = models.ManyToManyField(DishInfo, blank=True, related_name='wednesday_dinner_dish')
    wednesday_dinner_meal = models.ManyToManyField(Meal, blank=True, related_name='wednesday_dinner_meal')
    wednesday_dinner_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='wednesday_dinner_dish_option')
    wednesday_dinner_meal_option = models.ManyToManyField(Meal, blank=True, related_name='wednesday_dinner_meal_option')

    is_thursday_available = models.BooleanField(default=False, blank=True, null=True)
    thursday_breakfast_dish = models.ManyToManyField(DishInfo, blank=True, related_name='thursday_breakfast_dish')
    thursday_breakfast_meal = models.ManyToManyField(Meal, blank=True, related_name='thursday_breakfast_meal')
    thursday_breakfast_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='thursday_breakfast_dish_option')
    thursday_breakfast_meal_option = models.ManyToManyField(Meal, blank=True, related_name='thursday_breakfast_meal_option')
    thursday_lunch_dish = models.ManyToManyField(DishInfo, blank=True, related_name='thursday_lunch_dish')
    thursday_lunch_meal = models.ManyToManyField(Meal, blank=True, related_name='thursday_lunch_meal')
    thursday_lunch_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='thursday_lunch_dish_option')
    thursday_lunch_meal_option = models.ManyToManyField(Meal, blank=True, related_name='thursday_lunch_meal_option')
    thursday_dinner_dish = models.ManyToManyField(DishInfo, blank=True, related_name='thursday_dinner_dish')
    thursday_dinner_meal = models.ManyToManyField(Meal, blank=True, related_name='thursday_dinner_meal')
    thursday_dinner_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='thursday_dinner_dish_option')
    thursday_dinner_meal_option = models.ManyToManyField(Meal, blank=True, related_name='thursday_dinner_meal_option')

    is_friday_available = models.BooleanField(default=False, blank=True, null=True)
    friday_breakfast_dish = models.ManyToManyField(DishInfo, blank=True, related_name='friday_breakfast_dish')
    friday_breakfast_meal = models.ManyToManyField(Meal, blank=True, related_name='friday_breakfast_meal')
    friday_breakfast_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='friday_breakfast_dish_option')
    friday_breakfast_meal_option = models.ManyToManyField(Meal, blank=True, related_name='friday_breakfast_meal_option')
    friday_lunch_dish = models.ManyToManyField(DishInfo, blank=True, related_name='friday_lunch_dish')
    friday_lunch_meal = models.ManyToManyField(Meal, blank=True, related_name='friday_lunch_meal')
    friday_lunch_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='friday_lunch_dish_option')
    friday_lunch_meal_option = models.ManyToManyField(Meal, blank=True, related_name='friday_lunch_meal_option')
    friday_dinner_dish = models.ManyToManyField(DishInfo, blank=True, related_name='friday_dinner_dish')
    friday_dinner_meal = models.ManyToManyField(Meal, blank=True, related_name='friday_dinner_meal')
    friday_dinner_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='friday_dinner_dish_dish_option')
    friday_dinner_meal_option = models.ManyToManyField(Meal, blank=True, related_name='friday_dinner_meal_option')

    is_saturday_available = models.BooleanField(default=False, blank=True, null=True)
    saturday_breakfast_dish = models.ManyToManyField(DishInfo, blank=True, related_name='saturday_breakfast_dish')
    saturday_breakfast_meal = models.ManyToManyField(Meal, blank=True, related_name='saturday_breakfast_meal')
    saturday_breakfast_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='saturday_breakfast_dish_option')
    saturday_breakfast_meal_option = models.ManyToManyField(Meal, blank=True, related_name='saturday_breakfast_meal_option')
    saturday_lunch_dish = models.ManyToManyField(DishInfo, blank=True, related_name='saturday_lunch_dish')
    saturday_lunch_meal = models.ManyToManyField(Meal, blank=True, related_name='saturday_lunch_meal')
    saturday_lunch_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='saturday_lunch_dish_option')
    saturday_lunch_meal_option = models.ManyToManyField(Meal, blank=True, related_name='saturday_lunch_meal_option')
    saturday_dinner_dish = models.ManyToManyField(DishInfo, blank=True, related_name='saturday_dinner_dish')
    saturday_dinner_meal = models.ManyToManyField(Meal, blank=True, related_name='saturday_dinner_meal')
    saturday_dinner_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='saturday_dinner_dish_option')
    saturday_dinner_meal_option = models.ManyToManyField(Meal, blank=True, related_name='saturday_dinner_meal_option')

    is_sunday_available = models.BooleanField(default=False, blank=True, null=True)
    sunday_breakfast_dish = models.ManyToManyField(DishInfo, blank=True, related_name='sunday_breakfast_dish')
    sunday_breakfast_meal = models.ManyToManyField(Meal, blank=True, related_name='sunday_breakfast_meal')
    sunday_breakfast_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='sunday_breakfast_dish_option')
    sunday_breakfast_meal_option = models.ManyToManyField(Meal, blank=True, related_name='sunday_breakfast_meal_option')
    sunday_lunch_dish = models.ManyToManyField(DishInfo, blank=True, related_name='sunday_lunch_dish')
    sunday_lunch_meal = models.ManyToManyField(Meal, blank=True, related_name='sunday_lunch_meal')
    sunday_lunch_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='sunday_lunch_dish_option')
    sunday_lunch_meal_option = models.ManyToManyField(Meal, blank=True, related_name='sunday_lunch_meal_option')
    sunday_dinner_dish = models.ManyToManyField(DishInfo, blank=True, related_name='sunday_dinner_dish')
    sunday_dinner_meal = models.ManyToManyField(Meal, blank=True, related_name='sunday_dinner_meal')
    sunday_dinner_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='sunday_dinner_dish_option')
    sunday_dinner_meal_option = models.ManyToManyField(Meal, blank=True, related_name='sunday_dinner_meal_option')

    data_create_time = models.DateTimeField(auto_now_add=True)
    last_data_updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.meal_plan_name

class CorporateMealPlan(models.Model):
    corporate_meal_plan_id = models.AutoField(primary_key=True)
    corporate_meal_plan_name = models.CharField(max_length=100)
    corporate_meal_plan_image = models.ImageField(upload_to='media/menu_item_images/', blank=True, null=True)
    corporate_MealPlanImgUrl = models.CharField(max_length=500, blank=True, null=True)
    corporate_meal_plan_description = models.TextField(blank=True)
    corporate_meal_plan_availability_status = models.CharField(max_length=50,
                                                     choices=[('available', 'Available'),
                                                              ('unavailable', 'Unavailable')],
                                                     default='available')
    corporate_manager_id = models.IntegerField(null=True)
    corporate_company_id = models.IntegerField(null=True)
    corporate_user_id = models.IntegerField(null=True)
    dietary_choices = models.ManyToManyField(DietaryChoice)
    cuisine_choices = models.ManyToManyField(CuisineChoice)

    corporate_daily_breakfast_price = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    corporate_daily_lunch_price = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    corporate_daily_dinner_price = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
  
    corporate_daily_breakfast_qty = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    corporate_daily_lunch_qty = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    corporate_daily_dinner_qty = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)



    corporate_is_monday_available = models.BooleanField(default=False, blank=True, null=True)
    corporate_monday_breakfast_dish=models.ManyToManyField(DishInfo, blank=True, related_name='corporate_monday_breakfast_dish')
    corporate_monday_breakfast_meal=models.ManyToManyField(Meal, blank=True, related_name='corporate_monday_breakfast_meal')
    corporate_monday_breakfast_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_monday_breakfast_dish_option')
    corporate_monday_breakfast_meal_option = models.ManyToManyField(Meal, blank=True, related_name='corporate_monday_breakfast_meal_option')
    corporate_monday_lunch_dish = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_monday_lunch_dish')
    corporate_monday_lunch_meal = models.ManyToManyField(Meal, blank=True, related_name='corporate_monday_lunch_meal')
    corporate_monday_lunch_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_monday_lunch_dish_option')
    corporate_monday_lunch_meal_option = models.ManyToManyField(Meal, blank=True, related_name='corporate_monday_lunch_meal_option')
    corporate_monday_dinner_dish = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_monday_dinner_dish')
    corporate_monday_dinner_meal = models.ManyToManyField(Meal, blank=True, related_name='corporate_monday_dinner_meal')
    corporate_monday_dinner_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_monday_dinner_dish_option')
    corporate_monday_dinner_meal_option = models.ManyToManyField(Meal, blank=True, related_name='corporate_monday_dinner_meal_option')

    corporate_is_tuesday_available = models.BooleanField(default=False, blank=True, null=True)
    corporate_tuesday_breakfast_dish = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_tuesday_breakfast_dish')
    corporate_tuesday_breakfast_meal = models.ManyToManyField(Meal, blank=True, related_name='corporate_tuesday_breakfast_meal')
    corporate_tuesday_breakfast_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_tuesday_breakfast_dish_option')
    corporate_tuesday_breakfast_meal_option = models.ManyToManyField(Meal, blank=True, related_name='corporate_tuesday_breakfast_meal_option')
    corporate_tuesday_lunch_dish = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_tuesday_lunch_dish')
    corporate_tuesday_lunch_meal = models.ManyToManyField(Meal, blank=True, related_name='corporate_tuesday_lunch_meal')
    corporate_tuesday_lunch_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_tuesday_lunch_dish_option')
    corporate_tuesday_lunch_meal_option = models.ManyToManyField(Meal, blank=True, related_name='corporate_tuesday_lunch_meal_option')
    corporate_tuesday_dinner_dish = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_tuesday_dinner_dish')
    corporate_tuesday_dinner_meal = models.ManyToManyField(Meal, blank=True, related_name='corporate_tuesday_dinner_meal')
    corporate_tuesday_dinner_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_tuesday_dinner_dish_option')
    corporate_tuesday_dinner_meal_option = models.ManyToManyField(Meal, blank=True, related_name='corporate_tuesday_dinner_meal_option')

    corporate_is_wednesday_available = models.BooleanField(default=False, blank=True, null=True)
    corporate_wednesday_breakfast_dish = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_wednesday_breakfast_dish')
    corporate_wednesday_breakfast_meal = models.ManyToManyField(Meal, blank=True, related_name='corporate_wednesday_breakfcorporate_ast_meal')
    corporate_wednesday_breakfast_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_wednesday_breakfast_dish_option')
    corporate_wednesday_breakfast_meal_option = models.ManyToManyField(Meal, blank=True, related_name='corporate_wednesday_breakfast_meal_option')
    corporate_wednesday_lunch_dish = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_wednesday_lunch_dish')
    corporate_wednesday_lunch_meal = models.ManyToManyField(Meal, blank=True, related_name='corporate_wednesday_lunch_meal')
    corporate_wednesday_lunch_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_wednesday_lunch_dish_option')
    corporate_wednesday_lunch_meal_option = models.ManyToManyField(Meal, blank=True, related_name='corporate_wednesday_lunch_meal_option')
    corporate_wednesday_dinner_dish = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_wednesday_dinner_dish')
    corporate_wednesday_dinner_meal = models.ManyToManyField(Meal, blank=True, related_name='corporate_wednesday_dinner_meal')
    corporate_wednesday_dinner_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_wednesday_dinner_dish_option')
    corporate_wednesday_dinner_meal_option = models.ManyToManyField(Meal, blank=True, related_name='corporate_wednesday_dinner_meal_option')

    corporate_is_thursday_available = models.BooleanField(default=False, blank=True, null=True)
    corporate_thursday_breakfast_dish = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_thursday_breakfast_dish')
    corporate_thursday_breakfast_meal = models.ManyToManyField(Meal, blank=True, related_name='corporate_thursday_breakfast_meal')
    corporate_thursday_breakfast_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_thursday_breakfast_dish_option')
    corporate_thursday_breakfast_meal_option = models.ManyToManyField(Meal, blank=True, related_name='corporate_thursday_breakfast_meal_option')
    corporate_thursday_lunch_dish = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_thursday_lunch_dish')
    corporate_thursday_lunch_meal = models.ManyToManyField(Meal, blank=True, related_name='corporate_thursday_lunch_meal')
    corporate_thursday_lunch_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_thursday_lunch_dish_option')
    corporate_thursday_lunch_meal_option = models.ManyToManyField(Meal, blank=True, related_name='corporate_thursday_lunch_meal_option')
    corporate_thursday_dinner_dish = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_thursday_dinner_dish')
    corporate_thursday_dinner_meal = models.ManyToManyField(Meal, blank=True, related_name='corporate_thursday_dinner_meal')
    corporate_thursday_dinner_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_thursday_dinner_dish_option')
    corporate_thursday_dinner_meal_option = models.ManyToManyField(Meal, blank=True, related_name='corporate_thursday_dinner_meal_option')

    corporate_is_friday_available = models.BooleanField(default=False, blank=True, null=True)
    corporate_friday_breakfast_dish = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_friday_breakfast_dish')
    corporate_friday_breakfast_meal = models.ManyToManyField(Meal, blank=True, related_name='corporate_friday_breakfast_meal')
    corporate_friday_breakfast_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_friday_breakfast_dish_option')
    corporate_friday_breakfast_meal_option = models.ManyToManyField(Meal, blank=True, related_name='corporate_friday_breakfast_meal_option')
    corporate_friday_lunch_dish = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_friday_lunch_dish')
    corporate_friday_lunch_meal = models.ManyToManyField(Meal, blank=True, related_name='corporate_friday_lunch_meal')
    corporate_friday_lunch_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_friday_lunch_dish_option')
    corporate_friday_lunch_meal_option = models.ManyToManyField(Meal, blank=True, related_name='corporate_friday_lunch_meal_option')
    corporate_friday_dinner_dish = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_friday_dinner_dish')
    corporate_friday_dinner_meal = models.ManyToManyField(Meal, blank=True, related_name='corporate_friday_dinner_meal')
    corporate_friday_dinner_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_friday_dinner_dish_dish_option')
    corporate_friday_dinner_meal_option = models.ManyToManyField(Meal, blank=True, related_name='corporate_friday_dinner_meal_option')

    corporate_is_saturday_available = models.BooleanField(default=False, blank=True, null=True)
    corporate_saturday_breakfast_dish = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_saturday_breakfast_dish')
    corporate_saturday_breakfast_meal = models.ManyToManyField(Meal, blank=True, related_name='corporate_saturday_breakfast_meal')
    corporate_saturday_breakfast_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_saturday_breakfast_dish_option')
    corporate_saturday_breakfast_meal_option = models.ManyToManyField(Meal, blank=True, related_name='corporate_saturday_breakfast_meal_option')
    corporate_saturday_lunch_dish = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_saturday_lunch_dish')
    corporate_saturday_lunch_meal = models.ManyToManyField(Meal, blank=True, related_name='corporate_saturday_lunch_meal')
    corporate_saturday_lunch_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_saturday_lunch_dish_option')
    corporate_saturday_lunch_meal_option = models.ManyToManyField(Meal, blank=True, related_name='corporate_saturday_lunch_meal_option')
    corporate_saturday_dinner_dish = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_saturday_dinner_dish')
    corporate_saturday_dinner_meal = models.ManyToManyField(Meal, blank=True, related_name='corporate_saturday_dinner_meal')
    corporate_saturday_dinner_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_saturday_dinner_dish_option')
    corporate_saturday_dinner_meal_option = models.ManyToManyField(Meal, blank=True, related_name='corporate_saturday_dinner_meal_option')

    corporate_is_sunday_available = models.BooleanField(default=False, blank=True, null=True)
    corporate_sunday_breakfast_dish = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_sunday_breakfast_dish')
    corporate_sunday_breakfast_meal = models.ManyToManyField(Meal, blank=True, related_name='corporate_sunday_breakfast_meal')
    corporate_sunday_breakfast_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_sunday_breakfast_dish_option')
    corporate_sunday_breakfast_meal_option = models.ManyToManyField(Meal, blank=True, related_name='corporate_sunday_breakfast_meal_option')
    corporate_sunday_lunch_dish = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_sunday_lunch_dish')
    corporate_sunday_lunch_meal = models.ManyToManyField(Meal, blank=True, related_name='corporate_sunday_lunch_meal')
    corporate_sunday_lunch_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_sunday_lunch_dish_option')
    corporate_sunday_lunch_meal_option = models.ManyToManyField(Meal, blank=True, related_name='corporate_sunday_lunch_meal_option')
    corporate_sunday_dinner_dish = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_sunday_dinner_dish')
    corporate_sunday_dinner_meal = models.ManyToManyField(Meal, blank=True, related_name='corporate_sunday_dinner_meal')
    corporate_sunday_dinner_dish_option = models.ManyToManyField(DishInfo, blank=True, related_name='corporate_sunday_dinner_dish_option')
    corporate_sunday_dinner_meal_option = models.ManyToManyField(Meal, blank=True, related_name='corporate_sunday_dinner_meal_option')

    data_create_time = models.DateTimeField(auto_now_add=True)
    last_data_updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.corporate_meal_plan_name



class CompanyInfo(models.Model):
    company_id=models.AutoField(primary_key=True)
    company_name=models.CharField(max_length=100)
    company_description=models.TextField(null=True, blank=True)
    company_phone_number=models.CharField(max_length=100, blank=True, null=True)
    company_email=models.EmailField(max_length=100, blank=True, null=True)
    company_address=models.CharField(max_length=100, blank=True, null=True)
    # admin = models.ManyToManyField(User, related_name='admin_companies', blank=True)
    company_admin = models.CharField(max_length=100, blank=True, null=True)
    user_id= models.IntegerField(null=True)
    data_create_time = models.DateTimeField(auto_now_add=True)
    last_data_updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.company_name


class BulkOrders(models.Model):
    bulk_order_id=models.AutoField(primary_key=True)
    company=models.ForeignKey(CompanyInfo, on_delete=models.CASCADE, related_name='company_info')
    bulk_order_name=models.CharField(max_length=100, null=True, blank=True)
    bulk_order_description=models.TextField(null=True, blank=True)
    kitchen = models.ManyToManyField(Kitchen, related_name='kitchen_bulk_orders')
    MealPlan = models.ManyToManyField(MealPlan, related_name='meal_plan_bulk_orders')
    per_day_meal_qty = models.IntegerField()
    bulk_order_start_date=models.DateField()
    bulk_order_end_date=models.DateField()

    data_create_time = models.DateTimeField(auto_now_add=True)
    last_data_updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.bulk_order_id


class UserOrder(models.Model):
    order_id = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=100)
    order_date = models.DateField()
    order_time = models.TimeField()
    DishInfo = models.ManyToManyField(DishInfo, blank=True, related_name='user_ordered_dish')
    Meal = models.ManyToManyField(Meal, blank=True, related_name='user_ordered_meal')
    order_status = models.CharField(
        max_length=50, choices=[('placed', 'Placed'), ('cancelled', 'Cancelled'), ('delivered', 'Delivered')], default='placed'
    )
    order_type = models.CharField(
        max_length=50, choices=[('bulk', 'Bulk'), ('dish', 'Dish'), ('meal', 'Meal')], default='bulk'
    )
    total_price = models.DecimalField(max_digits=8, decimal_places=2)
    payment_status = models.CharField(
        max_length=50, choices=[('paid', 'Paid'), ('unpaid', 'Unpaid')], default='unpaid'
    )
    delivery_address = models.CharField(max_length=200)
    delivery_date = models.DateField()
    delivery_time = models.TimeField()
    delivery_status = models.CharField(
        max_length=50, choices=[('delivered', 'Delivered'), ('pending', 'Pending')], default='pending'
    )

    data_create_time = models.DateTimeField(auto_now_add=True)
    last_data_updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.order_id)



class Branch(models.Model):
    # company = models.ForeignKey(CompanyInfo, on_delete=models.CASCADE, related_name='branches')
    branch_name = models.CharField(max_length=255)
    manager_id= models.CharField(max_length=100, blank=True, null=True)
    company_id= models.CharField(max_length=100, blank=True, null=True)
    address = models.TextField()
    user_id= models.IntegerField(null=True)
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    lon = models.DecimalField(max_digits=9, decimal_places=6)
    # managers = models.ManyToManyField(User, related_name='managed_branches', blank=True)
    # mentors = models.ManyToManyField(User, related_name='mentored_branches', blank=True)
    # delivery_locations = models.ManyToManyField('DeliveryLocation', related_name='branches')

    def __str__(self):
        return self.branch_name



class DeliveryLocation(models.Model):
    name = models.CharField(max_length=255)
    delivery_location1 = models.TextField(blank=True)
    delivery_location2 = models.TextField(blank=True)
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    lon = models.DecimalField(max_digits=9, decimal_places=6)

    def __str__(self):
        return self.name