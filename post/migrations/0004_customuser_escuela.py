# Generated by Django 2.2.3 on 2020-10-25 02:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0003_auto_20201024_2358'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='escuela',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='post.Escuela'),
        ),
    ]
