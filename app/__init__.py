from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from config import DevelopmentConfig, StagingConfig
from flask_cors import CORS


db = SQLAlchemy()
jwt = JWTManager()


def create_app(class_config=DevelopmentConfig):
    # initialize and configure app
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(class_config)

    # initialize db and migration
    db.init_app(app)

    # initialize jwt
    jwt.init_app(app)

    # register blueprint
    from app.api import auth, projects, tasks
    from app.main import views

    app.register_blueprint(auth.bp)
    app.register_blueprint(projects.bp)
    app.register_blueprint(tasks.bp)
    app.register_blueprint(views.bp)

    with app.app_context():
        db.create_all()

    return app
