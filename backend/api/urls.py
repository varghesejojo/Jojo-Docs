from django.urls import path
from .views import *

urlpatterns = [
    path('sample/', SampleapiView.as_view(), name='sample'),
]