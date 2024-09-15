# Generated by Django 4.2 on 2024-08-05 09:02

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CabriotItems',
            fields=[
                ('item_id', models.AutoField(primary_key=True, serialize=False)),
                ('itemImage', models.URLField(blank=True, max_length=250, null=True)),
                ('itemName', models.CharField(max_length=100)),
                ('user_id', models.IntegerField(default=1, null=True)),
                ('data_create_time', models.DateTimeField(auto_now_add=True)),
                ('last_data_updated_time', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='MealItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('main_date', models.DateField()),
                ('meal_availability_status', models.CharField(max_length=50)),
                ('selected_dishes', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), size=None)),
                ('item', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='cabriot_app.cabriotitems')),
            ],
        ),
        migrations.CreateModel(
            name='VegeTableItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vegetable_date', models.DateField()),
                ('vegetable_availability_status', models.CharField(max_length=50)),
                ('vegetable_qty', django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), size=None), blank=True, null=True, size=None)),
                ('selected_dishes', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), size=None)),
            ],
        ),
        migrations.CreateModel(
            name='MealQuantity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('item_id', models.PositiveIntegerField()),
                ('quantity', models.PositiveIntegerField()),
                ('meal_type', models.CharField(choices=[('breakfast', 'Breakfast'), ('lunch', 'Lunch'), ('dinner', 'Dinner')], default='breakfast', max_length=10)),
                ('meal_item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='meal_quantities', to='cabriot_app.mealitem')),
            ],
        ),
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('username', models.CharField(max_length=250, null=True)),
                ('email', models.EmailField(max_length=100, null=True, unique=True)),
                ('role', models.CharField(choices=[('admin', 'Admin')], default='branch_manager', max_length=20)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
        ),
    ]
