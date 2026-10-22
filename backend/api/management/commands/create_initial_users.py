from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
import os

class Command(BaseCommand):
    def handle(self, *args, **options):
        i = 1
        while True:
            username = os.environ.get(f'USER{i}_NAME')
            password = os.environ.get(f'USER{i}_PASSWORD')
            
            if not username or not password:
                break  
                
            if not User.objects.filter(username=username).exists():
                User.objects.create_user(username=username, password=password)
                self.stdout.write(self.style.SUCCESS(f'User {username} created.'))
            else:
                self.stdout.write(self.style.WARNING(f'User {username} already exists.'))
            
            i += 1