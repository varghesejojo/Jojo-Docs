import hashlib
from cryptography.fernet import Fernet
from django.conf import settings
print(Fernet.generate_key().decode())

cipher = Fernet(settings.ENCRYPTION_KEY.encode())


def encrypt_data(data):
    return cipher.encrypt(data.encode()).decode()


def decrypt_data(data):
    return cipher.decrypt(data.encode()).decode()


def hash_email(email):
    return hashlib.sha256(email.lower().encode()).hexdigest()