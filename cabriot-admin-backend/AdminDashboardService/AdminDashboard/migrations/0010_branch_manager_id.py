# Generated by Django 4.2 on 2024-07-16 11:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AdminDashboard', '0009_alter_branch_user_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='branch',
            name='manager_id',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
