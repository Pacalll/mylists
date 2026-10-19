from .base import *

DEBUG = False
SECRET_KEY = config('SECRET_KEY')
ALLOWED_HOSTS = config('ALLOWED_HOSTS').split(',')
CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS').split(',')