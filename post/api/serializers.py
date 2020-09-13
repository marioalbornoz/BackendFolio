from rest_framework import serializers
from post.models import Alumno, Folio


class AlumnoSerializer(serializers.ModelSerializer):
	class Meta:
		model = Alumno
		fields = ['id','nombres', 'apellidos', 'rut', 'carrera', 'is_active']

class FolioSerializer(serializers.ModelSerializer):
	user = serializers.ReadOnlyField(source='user.username')
	class Meta:
		model = Folio
		fields = ['user','content','student','created','updated']