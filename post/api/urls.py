from .views import AlumnoViewSet, FolioViewSet, CarreraViewSet, UserViewSet, FeedbackViewSet, FacultadViewSet, \
    EscuelaViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'alumno', AlumnoViewSet)
router.register(r'folio', FolioViewSet, basename="folio")
router.register('carrera', CarreraViewSet, basename="carrera")
router.register('feedback', FeedbackViewSet, basename="feedback")
router.register('usuarios', UserViewSet, basename="usuarios")
router.register('facultad', FacultadViewSet, basename="facultad")
router.register('escuelas', EscuelaViewSet, basename="escuela")
urlpatterns = router.urls

