from rest_framework import serializers
from django.contrib.auth.models import User, Group

from post.models import Alumno, Folio, Carrera, Feedbacks, CustomUser, Rol, Facultad


# class GroupSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Group
#         fields = ('id', 'name',)

# class RolSerializer(serializers.ModelSerializer):
#     model = Rol
#     fields = ('id', 'nombre')

class UserSerializer(serializers.ModelSerializer):
    rol = serializers.ReadOnlyField(source='rol.roles')

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'first_name', 'last_name',
                  'password', 'email', 'is_active', 'last_login','carrera', 'sex', 'rol', 'escuela')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #     groups = instance.groups.all()
    #     groups_serializers = GroupSerializer(groups, many=True)
    #     representation['groups'] = groups_serializers.data
    #     return representation

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

class FacultadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Facultad
        fields = ('nombre','id')

class CarreraSerializer(serializers.ModelSerializer):
    escuela = serializers.ReadOnlyField(source='escuela.nombre')
    facultad = serializers.ReadOnlyField(source='escuela.facultad.nombre')
    class Meta:
        model = Carrera
        fields = ('id', 'nombre', 'codigo', 'escuela', 'facultad')


class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumno
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['carrera'] = CarreraSerializer(instance.carrera).data
        return response


class FolioSerializer(serializers.ModelSerializer):
    usuario = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Folio
        fields = ('usuario', 'user', 'content', 'created', 'alumno', 'priority_one', 'priority_two')

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['alumno'] = AlumnoSerializer(instance.alumno).data
        return response

class FeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedbacks
        fields = '__all__'
    
