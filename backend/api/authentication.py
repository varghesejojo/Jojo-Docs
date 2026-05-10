import jwt

from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from .mongo_db import users_collection


class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return None

        try:
            token = auth_header.split(" ")[1]

            payload = jwt.decode(
                token,
                settings.JWT_SECRET,
                algorithms=["HS256"]
            )

            if payload["type"] != "access":
                raise AuthenticationFailed("Invalid token")

            user = users_collection.find_one({
                "email_hash": payload["email_hash"]
            })

            if not user:
                raise AuthenticationFailed("User not found")

            return (user, None)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Access token expired")

        except:
            raise AuthenticationFailed("Invalid token")