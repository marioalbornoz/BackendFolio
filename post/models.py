from django.db import models
from django.contrib.auth.models import User, AbstractUser
import uuid


# Create your models here.

class Facultad(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre


class Carrera(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    codigo = models.IntegerField()
    facultad = models.ForeignKey(Facultad,on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.nombre

class CustomUser(AbstractUser):
    carrera = models.ForeignKey(Carrera, on_delete=models.CASCADE, blank=True, null=True)

class Alumno(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombres = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=50)
    rut = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    carrera = models.ForeignKey(Carrera, on_delete=models.CASCADE)

    def __str__(self):
        return '{} {}'.format(self.nombres, self.apellidos)


class Folio(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField(max_length=1000)
    created = models.DateTimeField(auto_now_add=True)
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.content


class Feedbacks(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    comentario = models.TextField(max_length=1000)
    created = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.comentario
