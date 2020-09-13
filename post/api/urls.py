from .views import AlumnoViewSet, FolioViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'alumno', AlumnoViewSet)
router.register(r'folio', FolioViewSet)
urlpatterns = router.urls

