from django.contrib import admin
from .models import Facultad, Carrera, Alumno, Folio, Feedbacks, CustomUser, Rol, Escuela
# Register your models here.

admin.site.register(CustomUser)

@admin.register(Facultad)
class FacultadAdmin(admin.ModelAdmin):
    list_display = [
        'nombre'
    ]
    search_fields =[
        'nombre'
    ]

@admin.register(Carrera)
class CarreraAdmin(admin.ModelAdmin):
    list_display = [
        'nombre',
        'codigo'
    ]
    search_fields = [
        'codigo'
    ]
@admin.register(Alumno)
class AlumnoAdmin(admin.ModelAdmin):
    list_display = [
        'nombres',
        'apellidos',
        'rut',
        'carrera'
    ]
    search_fields = [
        'nombres',
        'apellidos',
        'rut'
    ]
@admin.register(Folio)
class FolioAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'alumno',
        'content',
        'created'
    ]
    search_fields = [
        'content'

    ]
@admin.register(Feedbacks)
class FeedbacksAdmin(admin.ModelAdmin):
    list_display=[
        'user',
        'comentario',
        'created'
    ]

@admin.register(Rol)
class RolAdmin(admin.ModelAdmin):
    list_display=[
        'roles'
    ]

@admin.register(Escuela)
class EscuelaAdmin(admin.ModelAdmin):
    list_display=[
        'nombre'
    ]