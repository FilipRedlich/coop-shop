# Generated by Django 4.0.3 on 2022-03-31 15:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0006_services_alter_products_quantity'),
    ]

    operations = [
        migrations.AddField(
            model_name='categories',
            name='picture',
            field=models.CharField(blank=1, max_length=255),
        ),
        migrations.AddField(
            model_name='subcategories',
            name='picture',
            field=models.CharField(blank=1, max_length=255),
        ),
    ]
