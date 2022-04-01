# Generated by Django 4.0.3 on 2022-03-31 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0005_alter_products_mult'),
    ]

    operations = [
        migrations.CreateModel(
            name='Services',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='test', max_length=255)),
                ('price', models.FloatField(default=9.99)),
            ],
        ),
        migrations.AlterField(
            model_name='products',
            name='quantity',
            field=models.IntegerField(default=1),
        ),
    ]