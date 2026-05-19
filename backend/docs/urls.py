from django.urls import path
from .views import *

urlpatterns = [
    path('user-details/', UserDetailsView.as_view(), name='user-details'),
]