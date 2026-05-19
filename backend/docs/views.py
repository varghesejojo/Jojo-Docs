from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from api.authentication import JWTAuthentication

# Create your views here.
class UserDetailsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        return Response({
            "id": user.id,
            "name": user.full_name,
            "picture": user.profile_picture,
            "provider": user.auth_provider,
            "email_hash": user.email_hash,
        })