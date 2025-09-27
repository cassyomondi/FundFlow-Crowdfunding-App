from .app import app  # relative import because wsgi.py and app.py are in the same package

if __name__ == "__main__":
    app.run()
