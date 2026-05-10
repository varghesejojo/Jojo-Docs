from django.urls import path
from .views import *

urlpatterns = [
    path('google-login/', GoogleLoginView.as_view(), name='google-login'),
    path("refresh/", RefreshTokenView.as_view(), name="token-refresh"),
]