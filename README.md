# mylists

A lightweight multi-user webapp for shared list.

## Overview

mylists is a built with Django REST Framework and Angular, deployed with Docker. Lists can be shared between users, items can be checked on and off.

## Tech Stack

**Backend:** Django 5, Django REST Framework, PostgreSQL 15, SimpleJWT, Gunicorn

**Frontend:** Angular 16, TypeScript

**Infrastructure:** Docker, nginx

## Features

- JWT Authentication
- Create, edit and delete shopping lists
- Share lists between users
- Add, edit, delete and check off items
- Light / Dark mode toggle

## Project Structure

```
├── backend/          Django REST API
│   ├── api/          Models, Views, Serializers
│   ├── core/         Settings (base, dev, prod)
│   └── Dockerfile
├── frontend/         Angular App
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/
│   │   │   │   ├── login/
│   │   │   │   └── lists/
│   │   │   └── services/
│   │   └── assets/fonts/
│   └── Dockerfile
├── nginx/            nginx config
└── docker-compose.yml
```

## Setup & Installation

**Prerequisites:** Docker (includes Docker Compose), Git

```bash
git clone https://github.com/dein-user/mylists.git
cd mylists
```

Create a `.env` file (see Environment Variables below), then:

```bash
docker compose up --build
```

App runs on `http://localhost`.



## Environment Variables

Create a `.env` file in the root directory:

```bash
# Database
DB_NAME=shoppinglist
DB_USER=youruser
DB_PASSWORD=yourpassword
DB_HOST=db
DB_PORT=5432

# Django
SECRET_KEY=your-secret-key
DJANGO_SETTINGS_MODULE=core.settings.prod

# Hosts
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Initial users
USER1_NAME=user1
USER1_PASSWORD=password1
USER2_NAME=user2
USER2_PASSWORD=password2
......
```

## License

MIT