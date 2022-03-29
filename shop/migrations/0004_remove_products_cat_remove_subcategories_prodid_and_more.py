# Generated by Django 4.0.3 on 2022-03-29 18:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0003_subcategories'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='products',
            name='cat',
        ),
        migrations.RemoveField(
            model_name='subcategories',
            name='prodID',
        ),
        migrations.AddField(
            model_name='products',
            name='subcat',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='shop.subcategories'),
        ),
        migrations.AddField(
            model_name='subcategories',
            name='name',
            field=models.CharField(default='empty', max_length=50),
        ),
    ]
