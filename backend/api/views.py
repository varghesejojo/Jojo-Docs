import datetime
import uuid
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings
import jwt
from .utilities import *
from .mongo_db import *
from django.utils import timezone

# Create your views here.

class   GoogleLoginView(APIView):
    permission_classes = []
    def post(self, request):
        try:
            token = request.data.get('token')
            device_info = request.data.get("device_info", {})
            ip_address = request.META.get("REMOTE_ADDR")
            print(f"Login attempt from IP: {ip_address}, Device Info: {device_info}")
            
            if not token:
                return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), settings.GOOGLE_CLIENT_ID)
            print(f"Google ID Token verified: {idinfo}")
            
            if not idinfo.get("email_verified"):
                return Response(
                    {"error": "Google account email is not verified"},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            email = idinfo.get('email')
            name = idinfo.get('name')
            google_id = idinfo.get('sub')
            picture = idinfo.get('picture')
            email_hash = hash_email(email)
            user = users_collection.find_one({
                "email_hash": email_hash
            })
            session_id = str(uuid.uuid4())
            current_time = timezone.now()
            session_data = {
                "session_id": session_id,
                "token_id": session_id,
                "device_info": {
                    "user_agent": device_info.get("user_agent"),
                    "platform": device_info.get("platform"),
                    "language": device_info.get("language"),
                    "client_type": device_info.get("client_type"),
                    "ip_address": ip_address
                },
                "login_time": current_time,
                "last_activity": current_time,
                "is_active": True
            }
            if not user:
                users_collection.insert_one({
                    "full_name": name,
                    "email_encrypted": encrypt_data(email),
                    "email_hash": email_hash,
                    "google_id_encrypted": encrypt_data(google_id),

                    "auth_provider": "google",
                    "profile_picture": picture,

                    "is_active": True,
                    "is_verified": True,

                    "created_at": current_time,
                    "updated_at": current_time,
                    "last_login": current_time,

                    "current_session": session_data,
                    "previous_sessions": []
                })
            else:
                update_data = {
                    "$set": {
                        "last_login": current_time,
                        "updated_at": current_time,
                        "current_session": session_data
                    }
                }

                if user.get("current_session"):
                    update_data["$push"] = {
                        "previous_sessions": user["current_session"]
                    }

                users_collection.update_one(
                    {"email_hash": email_hash},
                    update_data
                )

            access_token = jwt.encode(
                {
                    "email_hash": email_hash,
                    "session_id": session_id,
                    "type": "access",
                    "exp": current_time + datetime.timedelta(minutes=15)
                },
                settings.JWT_SECRET,
                algorithm="HS256"
            )

            refresh_token = jwt.encode(
                {
                    "email_hash": email_hash,
                    "session_id": session_id,
                    "type": "refresh",
                    "exp": current_time + datetime.timedelta(days=7)
                },
                settings.JWT_SECRET,
                algorithm="HS256"
            )

            return Response({
                "access": access_token,
                "refresh": refresh_token,
                "user": {
                    "name": name,
                    "picture": picture
                }
            })  
            
        except Exception as e:
            print("Google login error:", str(e))
            return Response(
                {"error": "Login failed"},
                status=status.HTTP_400_BAD_REQUEST
            )


class RefreshTokenView(APIView):
    permission_classes = []

    def post(self, request):
        try:
            refresh = request.data.get("refresh")

            if not refresh:
                return Response(
                    {"error": "Refresh token required"},
                    status=400
                )

            payload = jwt.decode(
                refresh,
                settings.JWT_SECRET,
                algorithms=["HS256"]
            )

            if payload["type"] != "refresh":
                return Response(
                    {"error": "Invalid token"},
                    status=401
                )

            new_access = jwt.encode(
                {
                    "email_hash": payload["email_hash"],
                    "session_id": payload["session_id"],
                    "type": "access",
                    "exp": timezone.now() + datetime.timedelta(minutes=15)
                },
                settings.JWT_SECRET,
                algorithm="HS256"
            )

            return Response({
                "access": new_access
            })

        except:
            return Response(
                {"error": "Refresh expired"},
                status=401
            )
        
        