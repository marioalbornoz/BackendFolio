from rest_framework import serializers
from django.contrib.auth.models import User, Group

from post.models import Alumno, Folio, Carrera


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name',)


class UserSerializer(serializers.ModelSerializer):
    #groups = GroupSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'username','first_name','last_name', 'password', 'email', 'is_active', 'last_login', 'groups')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        groups = instance.groups.all()
        groups_serializers = GroupSerializer(groups, many=True)
        representation['groups'] = groups_serializers.data
        return representation

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class CarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrera
        fields = "__all__"


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
        fields = ('usuario', 'user', 'content', 'created', 'alumno')

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['alumno'] = AlumnoSerializer(instance.alumno).data
        return response
