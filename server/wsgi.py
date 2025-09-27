from .app import app  # ✅ note the dot, since wsgi.py is in same folder as app.py

if __name__ == "__main__":
    app.run()
