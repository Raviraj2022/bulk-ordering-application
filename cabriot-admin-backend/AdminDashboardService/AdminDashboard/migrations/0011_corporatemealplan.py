# Generated by Django 4.2 on 2024-07-22 11:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AdminDashboard', '0010_branch_manager_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='CorporateMealPlan',
            fields=[
                ('corporate_meal_plan_id', models.AutoField(primary_key=True, serialize=False)),
                ('corporate_meal_plan_name', models.CharField(max_length=100)),
                ('corporate_meal_plan_image', models.ImageField(blank=True, null=True, upload_to='media/menu_item_images/')),
                ('corporate_MealPlanImgUrl', models.CharField(blank=True, max_length=500, null=True)),
                ('corporate_meal_plan_description', models.TextField(blank=True)),
                ('corporate_meal_plan_availability_status', models.CharField(choices=[('available', 'Available'), ('unavailable', 'Unavailable')], default='available', max_length=50)),
                ('corporate_daily_breakfast_price', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('corporate_daily_lunch_price', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('corporate_daily_dinner_price', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('corporate_daily_breakfast_qty', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('corporate_daily_lunch_qty', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('corporate_daily_dinner_qty', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('corporate_is_monday_available', models.BooleanField(blank=True, default=False, null=True)),
                ('corporate_is_tuesday_available', models.BooleanField(blank=True, default=False, null=True)),
                ('corporate_is_wednesday_available', models.BooleanField(blank=True, default=False, null=True)),
                ('corporate_is_thursday_available', models.BooleanField(blank=True, default=False, null=True)),
                ('corporate_is_friday_available', models.BooleanField(blank=True, default=False, null=True)),
                ('corporate_is_saturday_available', models.BooleanField(blank=True, default=False, null=True)),
                ('corporate_is_sunday_available', models.BooleanField(blank=True, default=False, null=True)),
                ('data_create_time', models.DateTimeField(auto_now_add=True)),
                ('last_data_updated_time', models.DateTimeField(auto_now=True)),
                ('corporate_cuisine_choices', models.ManyToManyField(to='AdminDashboard.cuisinechoice')),
                ('corporate_dietary_choices', models.ManyToManyField(to='AdminDashboard.dietarychoice')),
                ('corporate_friday_breakfast_dish', models.ManyToManyField(blank=True, related_name='corporate_friday_breakfast_dish', to='AdminDashboard.dishinfo')),
                ('corporate_friday_breakfast_dish_option', models.ManyToManyField(blank=True, related_name='corporate_friday_breakfast_dish_option', to='AdminDashboard.dishinfo')),
                ('corporate_friday_breakfast_meal', models.ManyToManyField(blank=True, related_name='corporate_friday_breakfast_meal', to='AdminDashboard.meal')),
                ('corporate_friday_breakfast_meal_option', models.ManyToManyField(blank=True, related_name='corporate_friday_breakfast_meal_option', to='AdminDashboard.meal')),
                ('corporate_friday_dinner_dish', models.ManyToManyField(blank=True, related_name='corporate_friday_dinner_dish', to='AdminDashboard.dishinfo')),
                ('corporate_friday_dinner_dish_option', models.ManyToManyField(blank=True, related_name='corporate_friday_dinner_dish_dish_option', to='AdminDashboard.dishinfo')),
                ('corporate_friday_dinner_meal', models.ManyToManyField(blank=True, related_name='corporate_friday_dinner_meal', to='AdminDashboard.meal')),
                ('corporate_friday_dinner_meal_option', models.ManyToManyField(blank=True, related_name='corporate_friday_dinner_meal_option', to='AdminDashboard.meal')),
                ('corporate_friday_lunch_dish', models.ManyToManyField(blank=True, related_name='corporate_friday_lunch_dish', to='AdminDashboard.dishinfo')),
                ('corporate_friday_lunch_dish_option', models.ManyToManyField(blank=True, related_name='corporate_friday_lunch_dish_option', to='AdminDashboard.dishinfo')),
                ('corporate_friday_lunch_meal', models.ManyToManyField(blank=True, related_name='corporate_friday_lunch_meal', to='AdminDashboard.meal')),
                ('corporate_friday_lunch_meal_option', models.ManyToManyField(blank=True, related_name='corporate_friday_lunch_meal_option', to='AdminDashboard.meal')),
                ('corporate_monday_breakfast_dish', models.ManyToManyField(blank=True, related_name='corporate_monday_breakfast_dish', to='AdminDashboard.dishinfo')),
                ('corporate_monday_breakfast_dish_option', models.ManyToManyField(blank=True, related_name='corporate_monday_breakfast_dish_option', to='AdminDashboard.dishinfo')),
                ('corporate_monday_breakfast_meal', models.ManyToManyField(blank=True, related_name='corporate_monday_breakfast_meal', to='AdminDashboard.meal')),
                ('corporate_monday_breakfast_meal_option', models.ManyToManyField(blank=True, related_name='corporate_monday_breakfast_meal_option', to='AdminDashboard.meal')),
                ('corporate_monday_dinner_dish', models.ManyToManyField(blank=True, related_name='corporate_monday_dinner_dish', to='AdminDashboard.dishinfo')),
                ('corporate_monday_dinner_dish_option', models.ManyToManyField(blank=True, related_name='corporate_monday_dinner_dish_option', to='AdminDashboard.dishinfo')),
                ('corporate_monday_dinner_meal', models.ManyToManyField(blank=True, related_name='corporate_monday_dinner_meal', to='AdminDashboard.meal')),
                ('corporate_monday_dinner_meal_option', models.ManyToManyField(blank=True, related_name='corporate_monday_dinner_meal_option', to='AdminDashboard.meal')),
                ('corporate_monday_lunch_dish', models.ManyToManyField(blank=True, related_name='corporate_monday_lunch_dish', to='AdminDashboard.dishinfo')),
                ('corporate_monday_lunch_dish_option', models.ManyToManyField(blank=True, related_name='corporate_monday_lunch_dish_option', to='AdminDashboard.dishinfo')),
                ('corporate_monday_lunch_meal', models.ManyToManyField(blank=True, related_name='corporate_monday_lunch_meal', to='AdminDashboard.meal')),
                ('corporate_monday_lunch_meal_option', models.ManyToManyField(blank=True, related_name='corporate_monday_lunch_meal_option', to='AdminDashboard.meal')),
                ('corporate_saturday_breakfast_dish', models.ManyToManyField(blank=True, related_name='corporate_saturday_breakfast_dish', to='AdminDashboard.dishinfo')),
                ('corporate_saturday_breakfast_dish_option', models.ManyToManyField(blank=True, related_name='corporate_saturday_breakfast_dish_option', to='AdminDashboard.dishinfo')),
                ('corporate_saturday_breakfast_meal', models.ManyToManyField(blank=True, related_name='corporate_saturday_breakfast_meal', to='AdminDashboard.meal')),
                ('corporate_saturday_breakfast_meal_option', models.ManyToManyField(blank=True, related_name='corporate_saturday_breakfast_meal_option', to='AdminDashboard.meal')),
                ('corporate_saturday_dinner_dish', models.ManyToManyField(blank=True, related_name='corporate_saturday_dinner_dish', to='AdminDashboard.dishinfo')),
                ('corporate_saturday_dinner_dish_option', models.ManyToManyField(blank=True, related_name='corporate_saturday_dinner_dish_option', to='AdminDashboard.dishinfo')),
                ('corporate_saturday_dinner_meal', models.ManyToManyField(blank=True, related_name='corporate_saturday_dinner_meal', to='AdminDashboard.meal')),
                ('corporate_saturday_dinner_meal_option', models.ManyToManyField(blank=True, related_name='corporate_saturday_dinner_meal_option', to='AdminDashboard.meal')),
                ('corporate_saturday_lunch_dish', models.ManyToManyField(blank=True, related_name='corporate_saturday_lunch_dish', to='AdminDashboard.dishinfo')),
                ('corporate_saturday_lunch_dish_option', models.ManyToManyField(blank=True, related_name='corporate_saturday_lunch_dish_option', to='AdminDashboard.dishinfo')),
                ('corporate_saturday_lunch_meal', models.ManyToManyField(blank=True, related_name='corporate_saturday_lunch_meal', to='AdminDashboard.meal')),
                ('corporate_saturday_lunch_meal_option', models.ManyToManyField(blank=True, related_name='corporate_saturday_lunch_meal_option', to='AdminDashboard.meal')),
                ('corporate_sunday_breakfast_dish', models.ManyToManyField(blank=True, related_name='corporate_sunday_breakfast_dish', to='AdminDashboard.dishinfo')),
                ('corporate_sunday_breakfast_dish_option', models.ManyToManyField(blank=True, related_name='corporate_sunday_breakfast_dish_option', to='AdminDashboard.dishinfo')),
                ('corporate_sunday_breakfast_meal', models.ManyToManyField(blank=True, related_name='corporate_sunday_breakfast_meal', to='AdminDashboard.meal')),
                ('corporate_sunday_breakfast_meal_option', models.ManyToManyField(blank=True, related_name='corporate_sunday_breakfast_meal_option', to='AdminDashboard.meal')),
                ('corporate_sunday_dinner_dish', models.ManyToManyField(blank=True, related_name='corporate_sunday_dinner_dish', to='AdminDashboard.dishinfo')),
                ('corporate_sunday_dinner_dish_option', models.ManyToManyField(blank=True, related_name='corporate_sunday_dinner_dish_option', to='AdminDashboard.dishinfo')),
                ('corporate_sunday_dinner_meal', models.ManyToManyField(blank=True, related_name='corporate_sunday_dinner_meal', to='AdminDashboard.meal')),
                ('corporate_sunday_dinner_meal_option', models.ManyToManyField(blank=True, related_name='corporate_sunday_dinner_meal_option', to='AdminDashboard.meal')),
                ('corporate_sunday_lunch_dish', models.ManyToManyField(blank=True, related_name='corporate_sunday_lunch_dish', to='AdminDashboard.dishinfo')),
                ('corporate_sunday_lunch_dish_option', models.ManyToManyField(blank=True, related_name='corporate_sunday_lunch_dish_option', to='AdminDashboard.dishinfo')),
                ('corporate_sunday_lunch_meal', models.ManyToManyField(blank=True, related_name='corporate_sunday_lunch_meal', to='AdminDashboard.meal')),
                ('corporate_sunday_lunch_meal_option', models.ManyToManyField(blank=True, related_name='corporate_sunday_lunch_meal_option', to='AdminDashboard.meal')),
                ('corporate_thursday_breakfast_dish', models.ManyToManyField(blank=True, related_name='corporate_thursday_breakfast_dish', to='AdminDashboard.dishinfo')),
                ('corporate_thursday_breakfast_dish_option', models.ManyToManyField(blank=True, related_name='corporate_thursday_breakfast_dish_option', to='AdminDashboard.dishinfo')),
                ('corporate_thursday_breakfast_meal', models.ManyToManyField(blank=True, related_name='corporate_thursday_breakfast_meal', to='AdminDashboard.meal')),
                ('corporate_thursday_breakfast_meal_option', models.ManyToManyField(blank=True, related_name='corporate_thursday_breakfast_meal_option', to='AdminDashboard.meal')),
                ('corporate_thursday_dinner_dish', models.ManyToManyField(blank=True, related_name='corporate_thursday_dinner_dish', to='AdminDashboard.dishinfo')),
                ('corporate_thursday_dinner_dish_option', models.ManyToManyField(blank=True, related_name='corporate_thursday_dinner_dish_option', to='AdminDashboard.dishinfo')),
                ('corporate_thursday_dinner_meal', models.ManyToManyField(blank=True, related_name='corporate_thursday_dinner_meal', to='AdminDashboard.meal')),
                ('corporate_thursday_dinner_meal_option', models.ManyToManyField(blank=True, related_name='corporate_thursday_dinner_meal_option', to='AdminDashboard.meal')),
                ('corporate_thursday_lunch_dish', models.ManyToManyField(blank=True, related_name='corporate_thursday_lunch_dish', to='AdminDashboard.dishinfo')),
                ('corporate_thursday_lunch_dish_option', models.ManyToManyField(blank=True, related_name='corporate_thursday_lunch_dish_option', to='AdminDashboard.dishinfo')),
                ('corporate_thursday_lunch_meal', models.ManyToManyField(blank=True, related_name='corporate_thursday_lunch_meal', to='AdminDashboard.meal')),
                ('corporate_thursday_lunch_meal_option', models.ManyToManyField(blank=True, related_name='corporate_thursday_lunch_meal_option', to='AdminDashboard.meal')),
                ('corporate_tuesday_breakfast_dish', models.ManyToManyField(blank=True, related_name='corporate_tuesday_breakfast_dish', to='AdminDashboard.dishinfo')),
                ('corporate_tuesday_breakfast_dish_option', models.ManyToManyField(blank=True, related_name='corporate_tuesday_breakfast_dish_option', to='AdminDashboard.dishinfo')),
                ('corporate_tuesday_breakfast_meal', models.ManyToManyField(blank=True, related_name='corporate_tuesday_breakfast_meal', to='AdminDashboard.meal')),
                ('corporate_tuesday_breakfast_meal_option', models.ManyToManyField(blank=True, related_name='corporate_tuesday_breakfast_meal_option', to='AdminDashboard.meal')),
                ('corporate_tuesday_dinner_dish', models.ManyToManyField(blank=True, related_name='corporate_tuesday_dinner_dish', to='AdminDashboard.dishinfo')),
                ('corporate_tuesday_dinner_dish_option', models.ManyToManyField(blank=True, related_name='corporate_tuesday_dinner_dish_option', to='AdminDashboard.dishinfo')),
                ('corporate_tuesday_dinner_meal', models.ManyToManyField(blank=True, related_name='corporate_tuesday_dinner_meal', to='AdminDashboard.meal')),
                ('corporate_tuesday_dinner_meal_option', models.ManyToManyField(blank=True, related_name='corporate_tuesday_dinner_meal_option', to='AdminDashboard.meal')),
                ('corporate_tuesday_lunch_dish', models.ManyToManyField(blank=True, related_name='corporate_tuesday_lunch_dish', to='AdminDashboard.dishinfo')),
                ('corporate_tuesday_lunch_dish_option', models.ManyToManyField(blank=True, related_name='corporate_tuesday_lunch_dish_option', to='AdminDashboard.dishinfo')),
                ('corporate_tuesday_lunch_meal', models.ManyToManyField(blank=True, related_name='corporate_tuesday_lunch_meal', to='AdminDashboard.meal')),
                ('corporate_tuesday_lunch_meal_option', models.ManyToManyField(blank=True, related_name='corporate_tuesday_lunch_meal_option', to='AdminDashboard.meal')),
                ('corporate_wednesday_breakfast_dish', models.ManyToManyField(blank=True, related_name='corporate_wednesday_breakfast_dish', to='AdminDashboard.dishinfo')),
                ('corporate_wednesday_breakfast_dish_option', models.ManyToManyField(blank=True, related_name='corporate_wednesday_breakfast_dish_option', to='AdminDashboard.dishinfo')),
                ('corporate_wednesday_breakfast_meal', models.ManyToManyField(blank=True, related_name='corporate_wednesday_breakfcorporate_ast_meal', to='AdminDashboard.meal')),
                ('corporate_wednesday_breakfast_meal_option', models.ManyToManyField(blank=True, related_name='corporate_wednesday_breakfast_meal_option', to='AdminDashboard.meal')),
                ('corporate_wednesday_dinner_dish', models.ManyToManyField(blank=True, related_name='corporate_wednesday_dinner_dish', to='AdminDashboard.dishinfo')),
                ('corporate_wednesday_dinner_dish_option', models.ManyToManyField(blank=True, related_name='corporate_wednesday_dinner_dish_option', to='AdminDashboard.dishinfo')),
                ('corporate_wednesday_dinner_meal', models.ManyToManyField(blank=True, related_name='corporate_wednesday_dinner_meal', to='AdminDashboard.meal')),
                ('corporate_wednesday_dinner_meal_option', models.ManyToManyField(blank=True, related_name='corporate_wednesday_dinner_meal_option', to='AdminDashboard.meal')),
                ('corporate_wednesday_lunch_dish', models.ManyToManyField(blank=True, related_name='corporate_wednesday_lunch_dish', to='AdminDashboard.dishinfo')),
                ('corporate_wednesday_lunch_dish_option', models.ManyToManyField(blank=True, related_name='corporate_wednesday_lunch_dish_option', to='AdminDashboard.dishinfo')),
                ('corporate_wednesday_lunch_meal', models.ManyToManyField(blank=True, related_name='corporate_wednesday_lunch_meal', to='AdminDashboard.meal')),
                ('corporate_wednesday_lunch_meal_option', models.ManyToManyField(blank=True, related_name='corporate_wednesday_lunch_meal_option', to='AdminDashboard.meal')),
            ],
        ),
    ]
