from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from config import Config


db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()


def create_app(class_config=Config):
    # initialize and configure app
    app = Flask(__name__)
    app.config.from_object(class_config)

    # initialize db and migration
    db.init_app(app)
    migrate.init_app(app, db)

    # initialize jwt
    jwt.init_app(app)

    # register blueprint
    from app.api import auth, projects, tasks
    from app.main import views

    app.register_blueprint(auth.bp)
    app.register_blueprint(projects.bp)
    app.register_blueprint(tasks.bp)
    app.register_blueprint(views.bp)

    return app
