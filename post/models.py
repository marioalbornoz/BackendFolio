from django.db import models
from django.contrib.auth.models import User, AbstractUser, BaseUserManager, AbstractBaseUser, UserManager
import uuid


# Create manager
"""
class userManager(BaseUserManager, models.Manager):

    def _create_user(self, username, email, password, is_staff, is_superuser, is_active, **extra_fields):
        user = self.model(
            username=username,
            email=email,
            is_staff=is_staff,
            is_superuser=is_superuser,
            is_active=is_active,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self.db)
        return user
    
    def create_user(self, username, email, password=None, **extra_fields):
        return self._create_user(username, email, password, False, False, True, **extra_fields)

    def create_superuser(self, username, email, password=None, **extra_fields):
        return self._create_user(username, email, password, True, True, True, **extra_fields)
"""

# Create your models here.

class Facultad(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Escuela(models.Model):
    nombre = models.CharField(max_length=50)
    facultad = models.ForeignKey(Facultad,on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.nombre

class Carrera(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    codigo = models.IntegerField()
    escuela = models.ForeignKey(Escuela,on_delete=models.CASCADE, null=True, blank=True)
    

    def __str__(self):
        return self.nombre

class Rol(models.Model):
    roles = models.CharField(max_length=50)
    def __str__(self):
        return self.roles

class CustomUser(AbstractUser):
    # username = models.CharField(max_length=50)
    # email = models.EmailField( max_length=254)
    first_name = models.CharField( max_length=50)
    last_name = models.CharField(max_length=50)
    carrera = models.ForeignKey(Carrera, on_delete=models.CASCADE, blank=True, null=True)
    facultad = models.ForeignKey(Facultad, on_delete=models.CASCADE, blank=True, null=True)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE, null=True, blank=True)
    escuela = models.ForeignKey(Escuela,on_delete=models.CASCADE, null=True, blank=True)

    # USERNAME_FIELD = 'username'
    # REQUIRED_FIELDS = ['email']

    #objects = userManager()

    def get_full_name(self):
        return self.nombres + ' ' + self.apellidos

class Alumno(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombres = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=50)
    rut = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    carrera = models.ForeignKey(Carrera, on_delete=models.CASCADE)

    class Meta:
        ordering = ['carrera']

    def __str__(self):
        return '{} {}'.format(self.nombres, self.apellidos)


class Folio(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField(max_length=1000)
    priority_one = models.BooleanField(default=False)
    priority_two = models.BooleanField(default=False)
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

