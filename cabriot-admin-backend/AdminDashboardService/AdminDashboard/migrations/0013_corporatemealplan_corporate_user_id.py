# Generated by Django 4.2 on 2024-07-23 12:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AdminDashboard', '0012_corporatemealplan_corporate_company_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='corporatemealplan',
            name='corporate_user_id',
            field=models.IntegerField(null=True),
        ),
    ]
