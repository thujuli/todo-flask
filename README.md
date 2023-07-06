# TODO APP FLASK API

## Backgound

This my final project, create a simple todo app using a minimalis frontend (html, css, js and bootstrap framework) with minimalis backend (flask framework).

And for deployment is use Docker and Docker Compose.

## Requirements

- Web Browser (Chrome, Firefox etc.)
- Text Editor (VSCode, Neovim, Nano, etc.)
- Python 3.8 or higher
- Sqlite3
- Docker
- Docker Compose
- Linux or Mac (Optional, for runing crontab)

## Objective

- Apply my skills to create a simple frontend app using html, css, js and bootstrap framework
- Apply my skills to create a simple backend using flask framework
- Apply my skills to consume API use AJAX
- Using Dockerfile to create a custome images for flask app
- Compose service using Docker Compose
- Create a scheduling job using crontab

## Folder Structure

```
.
├── app
│   ├── api
│   │   ├── auth.py
│   │   ├── projects.py
│   │   └── tasks.py
│   ├── __init__.py
│   ├── main
│   │   └── views.py
│   ├── models
│   │   ├── project.py
│   │   ├── task.py
│   │   ├── token_blocklist.py
│   │   └── user.py
│   ├── static
│   │   └── js
│   │       ├── script-index.js
│   │       ├── script-login.js
│   │       ├── script-project.js
│   │       └── script-register.js
│   └── templates
│       ├── auth
│       │   ├── base.html
│       │   ├── login.html
│       │   └── register.html
│       ├── base.html
│       ├── index.html
│       └── project.html
├── config.py
├── docker-compose.yml
├── Dockerfile
├── README.md
├── requirements.txt
├── run.py
└── script
    ├── backup.sh
    ├── copy.sh
    └── restore.sh
```
