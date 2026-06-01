from django.urls import path
from .views import *

urlpatterns = [
    path('user-details/', UserDetailsView.as_view(), name='user-details'),
    path('documents/', DocumentView.as_view(), name='documents'),
    path('documents/<str:document_id>/', DocumentDetailView.as_view(), name='document-detail'),
    # path('documents/<str:document_id>/star/', StarDocumentView.as_view(), name='star-document'),
    path('trash/', TrashView.as_view(), name='trash'),
    
]