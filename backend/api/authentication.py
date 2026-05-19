import jwt

from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from .mongo_db import users_collection

class MongoUser:
    def __init__(self, user_data):
        self.user_data = user_data

        self.id = str(user_data.get("_id"))
        self.full_name = user_data.get("full_name")
        self.profile_picture = user_data.get("profile_picture")
        self.email_hash = user_data.get("email_hash")
        self.auth_provider = user_data.get("auth_provider")

    @property
    def is_authenticated(self):
        return True

    def get(self, key, default=None):
        return self.user_data.get(key, default)
    
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
            mongo_user = MongoUser(user)

            return (mongo_user, None)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Access token expired")

        except:
            raise AuthenticationFailed("Invalid token")