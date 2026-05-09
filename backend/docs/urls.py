from django.urls import path
from .views import *

urlpatterns = [
    path('sample/', SampleView.as_view(), name='sample'),
]