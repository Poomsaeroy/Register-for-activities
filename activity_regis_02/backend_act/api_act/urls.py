from django import views
from django.urls import path, include
from rest_framework import routers
from . import views

# from django.conf import settings
# from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register(r'activity',views.ActivityViewSet)
router.register(r'user',views.UserViewSet)
router.register(r'normal_user',views.NormUserViewset)
# router.register(r'registerUser',views.RegisterUserViewSet)
# router.register(r'activityByUser',views.RegisterUserWithActivityViewSet)



urlpatterns = [
    path('', include(router.urls)),
    path('whoami/', views.whoami),
    path('register/<str:two_id>/',views.registerToActivity),
    path('cancel/<str:two_id>/',views.cancelToActivity),
    path('delete/<int:pk>/',views.deleteActivity),
    path('show-who-register/<int:pk>/',views.showUserToActivity),
    # path('rest-auth/facebook/', views.FacebookLogin.as_view(), name='fb_login'),
    # path('rest-auth/google/', views.GoogleLogin.as_view(), name='google_login'),
]

# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)