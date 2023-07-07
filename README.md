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
├── app (main package for flask)
│   ├── api (python package to handle API endpoints)
│   │   ├── auth.py
│   │   ├── projects.py
│   │   └── tasks.py
│   ├── __init__.py (initialization flask app)
│   ├── main (handle routes for frontend service)
│   │   └── views.py
│   ├── models (contains table structures and relationships)
│   │   ├── project.py
│   │   ├── task.py
│   │   ├── token_blocklist.py
│   │   └── user.py
│   ├── static (contains the static file (css/js) used by frontend)
│   │   └── js
│   │       ├── script-index.js
│   │       ├── script-login.js
│   │       ├── script-project.js
│   │       └── script-register.js
│   └── templates (contains the html files used by frontend)
│       ├── auth
│       │   ├── base.html
│       │   ├── login.html
│       │   └── register.html
│       ├── base.html
│       ├── index.html
│       └── project.html
├── config.py (config file for database and jwt token)
├── docker-compose.yml (deploy flask and postgres services)
├── Dockerfile (create a flask custom images)
├── images (list images for documentation)
│   ├── login-page.png
│   ├── project-add.png
│   ├── project-delete.png
│   ├── project-edit.png
│   ├── projects-list.png
│   ├── registration-page.png
│   ├── task-add.png
│   ├── task-delete.png
│   ├── task-edit.png
│   ├── tasks-filter.png
│   └── tasks-list.png
├── README.md (documentation file for github)
├── requirements.txt (list third party packages used by flask app)
├── run.py (python file for running flask app)
└── script (contains script for backup, copy and restore file from container)
    ├── backup.sh
    ├── copy.sh
    └── restore.sh
```

## Setup Project

- Clone this repository

```
git clone https://github.com/thujuli/todo-flask.git
```

- Change directory to this repository

```
cd todo-flask
```

## Running Project

##### Without Container

- Create virtual environment

```
python -m venv .venv
```

- Use the virtual environment

```
source .venv/bin/activate
```

- Install third party packages from requirements.txt

```
pip install -r requirements.txt
```

- Run this project

```
python run.py
```

##### With Docker Compose

- Clone this repository

```
git clone https://github.com/thujuli/todo-flask.git
```

- Change directory to this repository

```
cd todo-flask
```

- Run docker compose

```
docker compose up -d
```

## Features

#### Registration Page

![Registration Page](images/registration-page.png?raw=true "Registration Page")

#### Login Page

![Login Page](images/login-page.png?raw=true "Login Page")

#### Project Page

- List of projects
  ![List of project](images/projects-list.png?raw=true "List of project")
- Added new project
  ![Added new project](images/project-add.png?raw=true "Added new project")
- Edit project
  ![Edit Project](images/project-edit.png?raw=true "Edit Project")
- Delete project
  ![Delete Project](images/project-delete.png?raw=true "Delete Project")

#### Todo Page (Home)

- List of tasks
  ![List of tasks](images/tasks-list.png?raw=true "List of tasks")
- Tasks filtered by selected project
  ![Tasks filtered by selected project](images/tasks-filter.png?raw=true "Tasks filtered by selected project")
- Added new task
  ![Added new task](images/task-add.png?raw=true "Added new task")
- Edit task
  ![Edit task](images/task-edit.png?raw=true "Edit task")
- Delete task
  ![Delete task](images/task-delete.png?raw=true "Delete task")
