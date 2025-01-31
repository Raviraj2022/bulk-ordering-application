# Generated by Django 4.2 on 2024-06-25 13:39

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CompanyInfo',
            fields=[
                ('company_id', models.AutoField(primary_key=True, serialize=False)),
                ('company_name', models.CharField(max_length=100)),
                ('company_description', models.TextField(blank=True, null=True)),
                ('company_phone_number', models.CharField(blank=True, max_length=100, null=True)),
                ('company_email', models.EmailField(blank=True, max_length=100, null=True)),
                ('company_address', models.CharField(blank=True, max_length=100, null=True)),
                ('data_create_time', models.DateTimeField(auto_now_add=True)),
                ('last_data_updated_time', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='CuisineChoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='DietaryChoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='DishInfo',
            fields=[
                ('dish_id', models.AutoField(primary_key=True, serialize=False)),
                ('dish_name', models.CharField(max_length=100)),
                ('dish_image', models.ImageField(blank=True, null=True, upload_to='media/menu_item_images/')),
                ('DishImgUrl', models.CharField(blank=True, max_length=500, null=True)),
                ('dish_description', models.TextField(blank=True)),
                ('dish_base_price', models.DecimalField(blank=True, decimal_places=2, max_digits=8)),
                ('dish_weight', models.DecimalField(blank=True, decimal_places=2, max_digits=8)),
                ('dish_availability_status', models.CharField(blank=True, choices=[('available', 'Available'), ('unavailable', 'Unavailable')], default='available', max_length=50)),
                ('dish_calories', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('dish_protein', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('dish_carbohydrates', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('dish_fat', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('dish_fiber', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('data_create_time', models.DateTimeField(auto_now_add=True)),
                ('last_data_updated_time', models.DateTimeField(auto_now=True)),
                ('cuisine_choices', models.ManyToManyField(to='AdminDashboard.cuisinechoice')),
                ('dietary_choices', models.ManyToManyField(to='AdminDashboard.dietarychoice')),
            ],
        ),
        migrations.CreateModel(
            name='Kitchen',
            fields=[
                ('kitchen_id', models.AutoField(primary_key=True, serialize=False)),
                ('kitchenImage', models.ImageField(blank=True, null=True, upload_to='media/menu_images/')),
                ('kitchenName', models.CharField(max_length=100)),
                ('kitchenUrl', models.CharField(blank=True, max_length=500, null=True)),
                ('kitchenDescription', models.CharField(blank=True, max_length=1000, null=True)),
                ('kitchenAddress', models.CharField(blank=True, max_length=100)),
                ('kitchenState', models.CharField(blank=True, max_length=100, null=True)),
                ('kitchenPinCode', models.IntegerField(blank=True)),
                ('kitchenLatitude', models.CharField(blank=True, max_length=100, null=True)),
                ('kitchenLongitude', models.CharField(blank=True, max_length=100, null=True)),
                ('is_delivery_available', models.BooleanField(blank=True, default=False, null=True)),
                ('kitchenCity', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), blank=True, null=True, size=None)),
                ('data_create_time', models.DateTimeField(auto_now_add=True)),
                ('last_data_updated_time', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Meal',
            fields=[
                ('meal_id', models.AutoField(primary_key=True, serialize=False)),
                ('meal_name', models.CharField(max_length=100)),
                ('meal_image', models.ImageField(blank=True, null=True, upload_to='media/menu_item_images/')),
                ('MealImgUrl', models.CharField(blank=True, max_length=500, null=True)),
                ('meal_description', models.TextField(blank=True)),
                ('meal_base_price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('meal_weight', models.DecimalField(decimal_places=2, max_digits=8, null=True)),
                ('meal_availability_status', models.CharField(choices=[('available', 'Available'), ('unavailable', 'Unavailable')], default='available', max_length=50)),
                ('meal_qty', django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=50), size=None), blank=True, null=True, size=None)),
                ('total_calories', models.DecimalField(decimal_places=2, default=0, max_digits=8, null=True)),
                ('total_protein', models.DecimalField(decimal_places=2, default=0, max_digits=8, null=True)),
                ('total_carbohydrates', models.DecimalField(decimal_places=2, default=0, max_digits=8, null=True)),
                ('total_fat', models.DecimalField(decimal_places=2, default=0, max_digits=8, null=True)),
                ('total_fiber', models.DecimalField(decimal_places=2, default=0, max_digits=8, null=True)),
                ('data_create_time', models.DateTimeField(auto_now_add=True)),
                ('last_data_updated_time', models.DateTimeField(auto_now=True)),
                ('cuisine_choices', models.ManyToManyField(to='AdminDashboard.cuisinechoice')),
                ('dietary_choices', models.ManyToManyField(to='AdminDashboard.dietarychoice')),
            ],
        ),
        migrations.CreateModel(
            name='MealChoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('menu_id', models.AutoField(primary_key=True, serialize=False)),
                ('dish_name', models.CharField(blank=True, max_length=100, null=True)),
                ('meal_name', models.CharField(blank=True, max_length=100, null=True)),
                ('menu_price', models.IntegerField()),
                ('menu_qty', models.IntegerField()),
                ('monday', models.BooleanField(blank=True, default=True, null=True)),
                ('tuesday', models.BooleanField(blank=True, default=True, null=True)),
                ('wednesday', models.BooleanField(blank=True, default=True, null=True)),
                ('thursday', models.BooleanField(blank=True, default=True, null=True)),
                ('friday', models.BooleanField(blank=True, default=True, null=True)),
                ('saturday', models.BooleanField(blank=True, default=True, null=True)),
                ('sunday', models.BooleanField(blank=True, default=True, null=True)),
                ('data_create_time', models.DateTimeField(auto_now_add=True)),
                ('last_data_updated_time', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='UserOrder',
            fields=[
                ('order_id', models.AutoField(primary_key=True, serialize=False)),
                ('user_id', models.CharField(max_length=100)),
                ('order_date', models.DateField()),
                ('order_time', models.TimeField()),
                ('order_status', models.CharField(choices=[('placed', 'Placed'), ('cancelled', 'Cancelled'), ('delivered', 'Delivered')], default='placed', max_length=50)),
                ('order_type', models.CharField(choices=[('bulk', 'Bulk'), ('dish', 'Dish'), ('meal', 'Meal')], default='bulk', max_length=50)),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('payment_status', models.CharField(choices=[('paid', 'Paid'), ('unpaid', 'Unpaid')], default='unpaid', max_length=50)),
                ('delivery_address', models.CharField(max_length=200)),
                ('delivery_date', models.DateField()),
                ('delivery_time', models.TimeField()),
                ('delivery_status', models.CharField(choices=[('delivered', 'Delivered'), ('pending', 'Pending')], default='pending', max_length=50)),
                ('data_create_time', models.DateTimeField(auto_now_add=True)),
                ('last_data_updated_time', models.DateTimeField(auto_now=True)),
                ('DishInfo', models.ManyToManyField(blank=True, related_name='user_ordered_dish', to='AdminDashboard.dishinfo')),
                ('Meal', models.ManyToManyField(blank=True, related_name='user_ordered_meal', to='AdminDashboard.meal')),
            ],
        ),
        migrations.CreateModel(
            name='MealPlan',
            fields=[
                ('meal_plan_id', models.AutoField(primary_key=True, serialize=False)),
                ('meal_plan_name', models.CharField(max_length=100)),
                ('meal_plan_image', models.ImageField(blank=True, null=True, upload_to='media/menu_item_images/')),
                ('MealPlanImgUrl', models.CharField(blank=True, max_length=500, null=True)),
                ('meal_plan_description', models.TextField(blank=True)),
                ('meal_plan_availability_status', models.CharField(choices=[('available', 'Available'), ('unavailable', 'Unavailable')], default='available', max_length=50)),
                ('daily_price', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('daily_breakfast_price', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('daily_lunch_price', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('daily_dinner_price', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('weekly_price', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('weekly_breakfast_price', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('weekly_lunch_price', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('weekly_dinner_price', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('monthly_price', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('monthly_breakfast_price', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('monthly_lunch_price', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('monthly_dinner_price', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('is_monday_available', models.BooleanField(blank=True, default=False, null=True)),
                ('is_tuesday_available', models.BooleanField(blank=True, default=False, null=True)),
                ('is_wednesday_available', models.BooleanField(blank=True, default=False, null=True)),
                ('is_thursday_available', models.BooleanField(blank=True, default=False, null=True)),
                ('is_friday_available', models.BooleanField(blank=True, default=False, null=True)),
                ('is_saturday_available', models.BooleanField(blank=True, default=False, null=True)),
                ('is_sunday_available', models.BooleanField(blank=True, default=False, null=True)),
                ('data_create_time', models.DateTimeField(auto_now_add=True)),
                ('last_data_updated_time', models.DateTimeField(auto_now=True)),
                ('cuisine_choices', models.ManyToManyField(to='AdminDashboard.cuisinechoice')),
                ('dietary_choices', models.ManyToManyField(to='AdminDashboard.dietarychoice')),
                ('friday_breakfast_dish', models.ManyToManyField(blank=True, related_name='friday_breakfast_dish', to='AdminDashboard.dishinfo')),
                ('friday_breakfast_dish_option', models.ManyToManyField(blank=True, related_name='friday_breakfast_dish_option', to='AdminDashboard.dishinfo')),
                ('friday_breakfast_meal', models.ManyToManyField(blank=True, related_name='friday_breakfast_meal', to='AdminDashboard.meal')),
                ('friday_breakfast_meal_option', models.ManyToManyField(blank=True, related_name='friday_breakfast_meal_option', to='AdminDashboard.meal')),
                ('friday_dinner_dish', models.ManyToManyField(blank=True, related_name='friday_dinner_dish', to='AdminDashboard.dishinfo')),
                ('friday_dinner_dish_option', models.ManyToManyField(blank=True, related_name='friday_dinner_dish_dish_option', to='AdminDashboard.dishinfo')),
                ('friday_dinner_meal', models.ManyToManyField(blank=True, related_name='friday_dinner_meal', to='AdminDashboard.meal')),
                ('friday_dinner_meal_option', models.ManyToManyField(blank=True, related_name='friday_dinner_meal_option', to='AdminDashboard.meal')),
                ('friday_lunch_dish', models.ManyToManyField(blank=True, related_name='friday_lunch_dish', to='AdminDashboard.dishinfo')),
                ('friday_lunch_dish_option', models.ManyToManyField(blank=True, related_name='friday_lunch_dish_option', to='AdminDashboard.dishinfo')),
                ('friday_lunch_meal', models.ManyToManyField(blank=True, related_name='friday_lunch_meal', to='AdminDashboard.meal')),
                ('friday_lunch_meal_option', models.ManyToManyField(blank=True, related_name='friday_lunch_meal_option', to='AdminDashboard.meal')),
                ('monday_breakfast_dish', models.ManyToManyField(blank=True, related_name='monday_breakfast_dish', to='AdminDashboard.dishinfo')),
                ('monday_breakfast_dish_option', models.ManyToManyField(blank=True, related_name='monday_breakfast_dish_option', to='AdminDashboard.dishinfo')),
                ('monday_breakfast_meal', models.ManyToManyField(blank=True, related_name='monday_breakfast_meal', to='AdminDashboard.meal')),
                ('monday_breakfast_meal_option', models.ManyToManyField(blank=True, related_name='monday_breakfast_meal_option', to='AdminDashboard.meal')),
                ('monday_dinner_dish', models.ManyToManyField(blank=True, related_name='monday_dinner_dish', to='AdminDashboard.dishinfo')),
                ('monday_dinner_dish_option', models.ManyToManyField(blank=True, related_name='monday_dinner_dish_option', to='AdminDashboard.dishinfo')),
                ('monday_dinner_meal', models.ManyToManyField(blank=True, related_name='monday_dinner_meal', to='AdminDashboard.meal')),
                ('monday_dinner_meal_option', models.ManyToManyField(blank=True, related_name='monday_dinner_meal_option', to='AdminDashboard.meal')),
                ('monday_lunch_dish', models.ManyToManyField(blank=True, related_name='monday_lunch_dish', to='AdminDashboard.dishinfo')),
                ('monday_lunch_dish_option', models.ManyToManyField(blank=True, related_name='monday_lunch_dish_option', to='AdminDashboard.dishinfo')),
                ('monday_lunch_meal', models.ManyToManyField(blank=True, related_name='monday_lunch_meal', to='AdminDashboard.meal')),
                ('monday_lunch_meal_option', models.ManyToManyField(blank=True, related_name='monday_lunch_meal_option', to='AdminDashboard.meal')),
                ('saturday_breakfast_dish', models.ManyToManyField(blank=True, related_name='saturday_breakfast_dish', to='AdminDashboard.dishinfo')),
                ('saturday_breakfast_dish_option', models.ManyToManyField(blank=True, related_name='saturday_breakfast_dish_option', to='AdminDashboard.dishinfo')),
                ('saturday_breakfast_meal', models.ManyToManyField(blank=True, related_name='saturday_breakfast_meal', to='AdminDashboard.meal')),
                ('saturday_breakfast_meal_option', models.ManyToManyField(blank=True, related_name='saturday_breakfast_meal_option', to='AdminDashboard.meal')),
                ('saturday_dinner_dish', models.ManyToManyField(blank=True, related_name='saturday_dinner_dish', to='AdminDashboard.dishinfo')),
                ('saturday_dinner_dish_option', models.ManyToManyField(blank=True, related_name='saturday_dinner_dish_option', to='AdminDashboard.dishinfo')),
                ('saturday_dinner_meal', models.ManyToManyField(blank=True, related_name='saturday_dinner_meal', to='AdminDashboard.meal')),
                ('saturday_dinner_meal_option', models.ManyToManyField(blank=True, related_name='saturday_dinner_meal_option', to='AdminDashboard.meal')),
                ('saturday_lunch_dish', models.ManyToManyField(blank=True, related_name='saturday_lunch_dish', to='AdminDashboard.dishinfo')),
                ('saturday_lunch_dish_option', models.ManyToManyField(blank=True, related_name='saturday_lunch_dish_option', to='AdminDashboard.dishinfo')),
                ('saturday_lunch_meal', models.ManyToManyField(blank=True, related_name='saturday_lunch_meal', to='AdminDashboard.meal')),
                ('saturday_lunch_meal_option', models.ManyToManyField(blank=True, related_name='saturday_lunch_meal_option', to='AdminDashboard.meal')),
                ('sunday_breakfast_dish', models.ManyToManyField(blank=True, related_name='sunday_breakfast_dish', to='AdminDashboard.dishinfo')),
                ('sunday_breakfast_dish_option', models.ManyToManyField(blank=True, related_name='sunday_breakfast_dish_option', to='AdminDashboard.dishinfo')),
                ('sunday_breakfast_meal', models.ManyToManyField(blank=True, related_name='sunday_breakfast_meal', to='AdminDashboard.meal')),
                ('sunday_breakfast_meal_option', models.ManyToManyField(blank=True, related_name='sunday_breakfast_meal_option', to='AdminDashboard.meal')),
                ('sunday_dinner_dish', models.ManyToManyField(blank=True, related_name='sunday_dinner_dish', to='AdminDashboard.dishinfo')),
                ('sunday_dinner_dish_option', models.ManyToManyField(blank=True, related_name='sunday_dinner_dish_option', to='AdminDashboard.dishinfo')),
                ('sunday_dinner_meal', models.ManyToManyField(blank=True, related_name='sunday_dinner_meal', to='AdminDashboard.meal')),
                ('sunday_dinner_meal_option', models.ManyToManyField(blank=True, related_name='sunday_dinner_meal_option', to='AdminDashboard.meal')),
                ('sunday_lunch_dish', models.ManyToManyField(blank=True, related_name='sunday_lunch_dish', to='AdminDashboard.dishinfo')),
                ('sunday_lunch_dish_option', models.ManyToManyField(blank=True, related_name='sunday_lunch_dish_option', to='AdminDashboard.dishinfo')),
                ('sunday_lunch_meal', models.ManyToManyField(blank=True, related_name='sunday_lunch_meal', to='AdminDashboard.meal')),
                ('sunday_lunch_meal_option', models.ManyToManyField(blank=True, related_name='sunday_lunch_meal_option', to='AdminDashboard.meal')),
                ('thursday_breakfast_dish', models.ManyToManyField(blank=True, related_name='thursday_breakfast_dish', to='AdminDashboard.dishinfo')),
                ('thursday_breakfast_dish_option', models.ManyToManyField(blank=True, related_name='thursday_breakfast_dish_option', to='AdminDashboard.dishinfo')),
                ('thursday_breakfast_meal', models.ManyToManyField(blank=True, related_name='thursday_breakfast_meal', to='AdminDashboard.meal')),
                ('thursday_breakfast_meal_option', models.ManyToManyField(blank=True, related_name='thursday_breakfast_meal_option', to='AdminDashboard.meal')),
                ('thursday_dinner_dish', models.ManyToManyField(blank=True, related_name='thursday_dinner_dish', to='AdminDashboard.dishinfo')),
                ('thursday_dinner_dish_option', models.ManyToManyField(blank=True, related_name='thursday_dinner_dish_option', to='AdminDashboard.dishinfo')),
                ('thursday_dinner_meal', models.ManyToManyField(blank=True, related_name='thursday_dinner_meal', to='AdminDashboard.meal')),
                ('thursday_dinner_meal_option', models.ManyToManyField(blank=True, related_name='thursday_dinner_meal_option', to='AdminDashboard.meal')),
                ('thursday_lunch_dish', models.ManyToManyField(blank=True, related_name='thursday_lunch_dish', to='AdminDashboard.dishinfo')),
                ('thursday_lunch_dish_option', models.ManyToManyField(blank=True, related_name='thursday_lunch_dish_option', to='AdminDashboard.dishinfo')),
                ('thursday_lunch_meal', models.ManyToManyField(blank=True, related_name='thursday_lunch_meal', to='AdminDashboard.meal')),
                ('thursday_lunch_meal_option', models.ManyToManyField(blank=True, related_name='thursday_lunch_meal_option', to='AdminDashboard.meal')),
                ('tuesday_breakfast_dish', models.ManyToManyField(blank=True, related_name='tuesday_breakfast_dish', to='AdminDashboard.dishinfo')),
                ('tuesday_breakfast_dish_option', models.ManyToManyField(blank=True, related_name='tuesday_breakfast_dish_option', to='AdminDashboard.dishinfo')),
                ('tuesday_breakfast_meal', models.ManyToManyField(blank=True, related_name='tuesday_breakfast_meal', to='AdminDashboard.meal')),
                ('tuesday_breakfast_meal_option', models.ManyToManyField(blank=True, related_name='tuesday_breakfast_meal_option', to='AdminDashboard.meal')),
                ('tuesday_dinner_dish', models.ManyToManyField(blank=True, related_name='tuesday_dinner_dish', to='AdminDashboard.dishinfo')),
                ('tuesday_dinner_dish_option', models.ManyToManyField(blank=True, related_name='tuesday_dinner_dish_option', to='AdminDashboard.dishinfo')),
                ('tuesday_dinner_meal', models.ManyToManyField(blank=True, related_name='tuesday_dinner_meal', to='AdminDashboard.meal')),
                ('tuesday_dinner_meal_option', models.ManyToManyField(blank=True, related_name='tuesday_dinner_meal_option', to='AdminDashboard.meal')),
                ('tuesday_lunch_dish', models.ManyToManyField(blank=True, related_name='tuesday_lunch_dish', to='AdminDashboard.dishinfo')),
                ('tuesday_lunch_dish_option', models.ManyToManyField(blank=True, related_name='tuesday_lunch_dish_option', to='AdminDashboard.dishinfo')),
                ('tuesday_lunch_meal', models.ManyToManyField(blank=True, related_name='tuesday_lunch_meal', to='AdminDashboard.meal')),
                ('tuesday_lunch_meal_option', models.ManyToManyField(blank=True, related_name='tuesday_lunch_meal_option', to='AdminDashboard.meal')),
                ('wednesday_breakfast_dish', models.ManyToManyField(blank=True, related_name='wednesday_breakfast_dish', to='AdminDashboard.dishinfo')),
                ('wednesday_breakfast_dish_option', models.ManyToManyField(blank=True, related_name='wednesday_breakfast_dish_option', to='AdminDashboard.dishinfo')),
                ('wednesday_breakfast_meal', models.ManyToManyField(blank=True, related_name='wednesday_breakfast_meal', to='AdminDashboard.meal')),
                ('wednesday_breakfast_meal_option', models.ManyToManyField(blank=True, related_name='wednesday_breakfast_meal_option', to='AdminDashboard.meal')),
                ('wednesday_dinner_dish', models.ManyToManyField(blank=True, related_name='wednesday_dinner_dish', to='AdminDashboard.dishinfo')),
                ('wednesday_dinner_dish_option', models.ManyToManyField(blank=True, related_name='wednesday_dinner_dish_option', to='AdminDashboard.dishinfo')),
                ('wednesday_dinner_meal', models.ManyToManyField(blank=True, related_name='wednesday_dinner_meal', to='AdminDashboard.meal')),
                ('wednesday_dinner_meal_option', models.ManyToManyField(blank=True, related_name='wednesday_dinner_meal_option', to='AdminDashboard.meal')),
                ('wednesday_lunch_dish', models.ManyToManyField(blank=True, related_name='wednesday_lunch_dish', to='AdminDashboard.dishinfo')),
                ('wednesday_lunch_dish_option', models.ManyToManyField(blank=True, related_name='wednesday_lunch_dish_option', to='AdminDashboard.dishinfo')),
                ('wednesday_lunch_meal', models.ManyToManyField(blank=True, related_name='wednesday_lunch_meal', to='AdminDashboard.meal')),
                ('wednesday_lunch_meal_option', models.ManyToManyField(blank=True, related_name='wednesday_lunch_meal_option', to='AdminDashboard.meal')),
            ],
        ),
        migrations.AddField(
            model_name='meal',
            name='meal_choices',
            field=models.ManyToManyField(to='AdminDashboard.mealchoice'),
        ),
        migrations.AddField(
            model_name='meal',
            name='selected_dishes',
            field=models.ManyToManyField(blank=True, related_name='selected_meals', to='AdminDashboard.dishinfo'),
        ),
        migrations.CreateModel(
            name='KitchenMenus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('kitchen_menus', models.ManyToManyField(related_name='kitchen_menus', to='AdminDashboard.menu')),
                ('kitchens', models.ManyToManyField(related_name='kitchen_menus', to='AdminDashboard.kitchen')),
            ],
        ),
        migrations.AddField(
            model_name='dishinfo',
            name='meal_choices',
            field=models.ManyToManyField(to='AdminDashboard.mealchoice'),
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('state', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cities', to='AdminDashboard.state')),
            ],
        ),
        migrations.CreateModel(
            name='BulkOrders',
            fields=[
                ('bulk_order_id', models.AutoField(primary_key=True, serialize=False)),
                ('bulk_order_name', models.CharField(blank=True, max_length=100, null=True)),
                ('bulk_order_description', models.TextField(blank=True, null=True)),
                ('per_day_meal_qty', models.IntegerField()),
                ('bulk_order_start_date', models.DateField()),
                ('bulk_order_end_date', models.DateField()),
                ('data_create_time', models.DateTimeField(auto_now_add=True)),
                ('last_data_updated_time', models.DateTimeField(auto_now=True)),
                ('MealPlan', models.ManyToManyField(related_name='meal_plan_bulk_orders', to='AdminDashboard.mealplan')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='company_info', to='AdminDashboard.companyinfo')),
                ('kitchen', models.ManyToManyField(related_name='kitchen_bulk_orders', to='AdminDashboard.kitchen')),
            ],
        ),
    ]
