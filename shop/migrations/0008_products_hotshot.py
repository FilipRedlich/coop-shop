# Generated by Django 4.0.3 on 2022-04-28 18:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0007_categories_picture_subcategories_picture'),
    ]

    operations = [
        migrations.AddField(
            model_name='products',
            name='hotshot',
            field=models.BooleanField(default=False),
        ),
    ]
