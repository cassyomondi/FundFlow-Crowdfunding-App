from server.app import app  # absolute import works with gunicorn

if __name__ == "__main__":
    app.run()
