from rest_framework import viewsets, generics

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication

from post.models import Alumno, Folio, Carrera
from .serializers import AlumnoSerializer, FolioSerializer, CarreraSerializer


class CarreraViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request):
        carrera = Carrera.objects.all()
        serializer = CarreraSerializer(carrera, many=True, context={"request": request})
        response_dict = {"error": False, "message": "Todas las carreras en Data", "data": serializer.data}
        return Response(response_dict)

    def create(self, request):
        try:
            serializer = CarreraSerializer(data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False, "message": "Carrera Data Save Successfully"}
        except:
            dict_response = {"error": True, "message": "Error During Saving Carrera Data"}
        return Response(dict_response)

    def update(self, request, pk=None):
        try:
            queryset = Carrera.objects.all()
            carrera = get_object_or_404(queryset, pk=pk)
            serializer = CarreraSerializer(carrera, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False, "message": "Successfully Updated Carrera Data"}
        except:
            dict_response = {"error": True, "message": "Error During Updating Carrera Data"}

        return Response(dict_response)


class FolioViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request):
        folio = Folio.objects.all()
        serializer = FolioSerializer(folio, many=True, context={"request": request})
        response_dict = {"error": False, "message": "Todas los folios en Data", "data": serializer.data}
        return Response(response_dict)

    def create(self, request):
        try:
            serializer = FolioSerializer(data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False, "message": "Folio Data Save Successfully"}
        except:
            dict_response = {"error": True, "message": "Error During Saving Folio Data"}
        return Response(dict_response)

    def update(self, request, pk=None):
        try:
            queryset = Folio.objects.all()
            folio = get_object_or_404(queryset, pk=pk)
            serializer = FolioSerializer(folio, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False, "message": "Successfully Updated Folio Data"}
        except:
            dict_response = {"error": True, "message": "Error During Updating Folio Data"}

        return Response(dict_response)


class AlumnoViewSet(viewsets.ModelViewSet):
    serializer_class = AlumnoSerializer
    queryset = Alumno.objects.all()


carrera_list=CarreraViewSet.as_view({"get":"list"})
carrera_creat=CarreraViewSet.as_view({"post":"create"})
carrera_update=CarreraViewSet.as_view({"put":"update"})

folio_list=FolioViewSet.as_view({"get":"list"})
folio_creat=FolioViewSet.as_view({"post":"create"})
folio_update=FolioViewSet.as_view({"put":"update"})