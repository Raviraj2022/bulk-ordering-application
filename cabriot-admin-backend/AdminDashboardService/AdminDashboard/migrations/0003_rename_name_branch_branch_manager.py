# Generated by Django 4.2 on 2024-07-02 04:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('AdminDashboard', '0002_deliverylocation_branch'),
    ]

    operations = [
        migrations.RenameField(
            model_name='branch',
            old_name='name',
            new_name='branch_manager',
        ),
    ]
