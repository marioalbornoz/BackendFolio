# Generated by Django 2.2.3 on 2020-09-11 23:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0004_folio'),
    ]

    operations = [
        migrations.AlterField(
            model_name='folio',
            name='updated',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
