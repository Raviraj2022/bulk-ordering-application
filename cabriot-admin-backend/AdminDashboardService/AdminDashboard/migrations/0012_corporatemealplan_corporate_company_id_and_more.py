# Generated by Django 4.2 on 2024-07-23 07:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AdminDashboard', '0011_corporatemealplan'),
    ]

    operations = [
        migrations.AddField(
            model_name='corporatemealplan',
            name='corporate_company_id',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='corporatemealplan',
            name='corporate_manager_id',
            field=models.IntegerField(null=True),
        ),
    ]
