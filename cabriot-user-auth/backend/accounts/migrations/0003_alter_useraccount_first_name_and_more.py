# Generated by Django 4.2.1 on 2024-05-26 17:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_useraccount_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='first_name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='last_name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
