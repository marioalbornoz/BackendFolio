from .views import AlumnoViewSet, FolioViewSet, CarreraViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'alumno', AlumnoViewSet)
router.register('folio', FolioViewSet, basename="folio")
router.register('carrera', CarreraViewSet, basename="carrera")
urlpatterns = router.urls

