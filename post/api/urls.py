from .views import AlumnoViewSet, FolioViewSet, CarreraViewSet, UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'alumno', AlumnoViewSet)
router.register(r'folio', FolioViewSet, basename="folio")
router.register('carrera', CarreraViewSet, basename="carrera")
router.register('usuarios', UserViewSet, basename="usuarios")
urlpatterns = router.urls

