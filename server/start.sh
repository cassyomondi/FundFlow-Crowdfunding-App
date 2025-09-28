#!/bin/bash
# Apply migrations
flask db upgrade

# Default to 5000 if no $PORT is set
PORT=${PORT:-5000}

# Start gunicorn
gunicorn app:app --bind 0.0.0.0:$PORT --workers 3
