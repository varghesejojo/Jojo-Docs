import uuid
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings
import jwt
import datetime
from .utilities import *
from .mongo_db import *
# Create your views here.

class GoogleLoginView(APIView):
    permission_classes = []
    def post(self, request):
        try:
            token = request.data.get('token')
            if not token:
                return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), settings.GOOGLE_CLIENT_ID)
            email = idinfo.get('email')
            name = idinfo.get('name')
            google_id = idinfo.get('sub')
            picture = idinfo.get('picture')
            email_hash = hash_email(email)
            user = users_collection.find_one({
                "email_hash": email_hash
            })
            session_id = str(uuid.uuid4())
            if not user:
                users_collection.insert_one({
                    "full_name": name,
                    "email": encrypt_data(email),
                    "email_hash": email_hash,
                    "google_id": encrypt_data(google_id),
                    "profile_picture": picture,
                    "auth_provider": "google",
                    "is_active": True,
                    "created_at": datetime.datetime.now(),
                    "current_session": {
                        "session_id": session_id,
                        "login_time": datetime.datetime.now()
                    }
                })
            else:
                users_collection.update_one(
                    {"email_hash": email_hash},
                    {
                        "$set": {
                            "last_login": datetime.datetime.now(),
                            "current_session": {
                                "session_id": session_id,
                                "login_time": datetime.datetime.now()
                            }
                        }
                    }
                )

            jwt_token = jwt.encode(
                {
                    "email_hash": email_hash,
                    "session_id": session_id,
                    "exp": datetime.datetime.now() + datetime.timedelta(days=7)
                },
                settings.JWT_SECRET,
                algorithm="HS256"
            )

            return Response({
                "token": jwt_token,
                "user": {
                    "name": name,
                    "picture": picture
                }
            })  
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        