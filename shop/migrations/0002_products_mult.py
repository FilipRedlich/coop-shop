# Generated by Django 4.0.3 on 2022-03-26 21:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='products',
            name='mult',
            field=models.FloatField(blank=1, default=1.0),
        ),
    ]
