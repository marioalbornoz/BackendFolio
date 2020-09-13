from rest_framework import viewsets

from post.models import Alumno, Folio
from .serializers import AlumnoSerializer, FolioSerializer

class AlumnoViewSet(viewsets.ReadOnlyModelViewSet):
	serializer_class = AlumnoSerializer
	queryset = Alumno.objects.all()

class FolioViewSet(viewsets.ModelViewSet):
	serializer_class = FolioSerializer
	queryset = Folio.objects.all()