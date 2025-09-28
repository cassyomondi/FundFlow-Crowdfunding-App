from flask.cli import FlaskGroup
from server.app import app, db

# create a Flask CLI group so `flask db` commands work
cli = FlaskGroup(app)

if __name__ == "__main__":
    cli()
