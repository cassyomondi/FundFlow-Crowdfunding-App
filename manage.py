from flask.cli import FlaskGroup
from flask_migrate import Migrate
from server.app import app, db

# initialize Flask-Migrate
migrate = Migrate(app, db)

# create a Flask CLI group so `flask db` commands are always available
cli = FlaskGroup(app)

if __name__ == "__main__":
    cli()
