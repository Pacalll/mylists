from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from decouple import config

class Command(BaseCommand):
    def handle(self, *args, **options):
        users = [
            (config('USER1_NAME'), config('USER1_PASSWORD')),
            (config('USER2_NAME'), config('USER2_PASSWORD')),
        ]
        for username, password in users:
            if not User.objects.filter(username=username).exists():
                User.objects.create_user(username=username, password=password)
                self.stdout.write(self.style.SUCCESS(f'User {username} created.'))
            else:
                self.stdout.write(self.style.WARNING(f'User {username} already exists.'))