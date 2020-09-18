from django.contrib import admin
from .models import Carrera, Alumno, Folio
# Register your models here.
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