from server.app import app  # absolute import works with Gunicorn

if __name__ == "__main__":
    app.run()
