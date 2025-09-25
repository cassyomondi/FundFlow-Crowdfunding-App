# FundFlow Crowdfunding App

## Description

A full-stack crowdfunding application that allows users to create campaigns, donate to causes they care about, and track funding progress in real-time.

## Features

### Backend (Flask API)
- **User Authentication** - Secure user registration and password hashing
- **Campaign Management** - Create, read, update, and delete fundraising campaigns
- **Donation System** - Process donations with validation and tracking
- **RESTful API** - Clean JSON API with proper HTTP status codes
- **SQLite Database** - Persistent data storage with SQLAlchemy ORM

### Frontend (React)
- **Responsive Design** - Works on desktop and mobile devices
- **Campaign Browsing** - View all active fundraising campaigns
- **Interactive Donations** - Easy donation process with real-time validation
- **Progress Tracking** - Visual progress bars showing funding goals
- **User-Friendly Interface** - Intuitive navigation and clean design

## Technology Stack

### Backend
- **Framework**: Flask (Python)
- **Database**: SQLite with SQLAlchemy ORM
- **Authentication**: Flask-Bcrypt for password hashing
- **Serialization**: SQLAlchemy-Serializer for JSON responses
- **CORS**: Flask-CORS for frontend communication

### Frontend
- **Framework**: React with functional components and hooks
- **Routing**: React Router for navigation
- **Styling**: Inline styling
- **HTTP Client**: Fetch API for backend communication

## Prerequisites

Before running this project, make sure you have installed:
- Python 3.8+
- Node.js 14+ and npm
- Git for version control

## Installation & Setup

### 1. Clone the Repository
``bash 
git clone https://github.com/cassyomondi/FundFlow-Crowdfunding-App.git
cd FundFlow-Crowdfunding-App

### 2. Backend Setup
# Navigate to backend directory
cd server

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Initialize database
python seed.py

# Start the backend server
python app.py

The backend will run on http://127.0.0.1:5000

3. Frontend Setup
bash
# Open new terminal and navigate to frontend
cd client

# Install dependencies
npm install

# Start the development server
npm start
The frontend will run on http://localhost:3000

## Database Schema
Models
- **Users**: id, username, email, password_hash

-**Campaigns**: id, title, description, funding_goal, user_id

- **Donations**: id, amount, user_id, campaign_id

Relationships
- User has many Campaigns (one-to-many)

- User has many Donations (one-to-many)

- Campaign has many Donations (one-to-many)

- Campaign belongs to User (many-to-one)

- Donation belongs to User and Campaign (many-to-one)

## API Endpoints

### Authentication & Users

- GET /users - Get all users

- POST /users - Create new user

- POST /login - User login (if implemented)

### Campaigns

- GET /campaigns - Get all campaigns

- POST /campaigns - Create new campaign

- GET /campaigns/:id - Get specific campaign

- PATCH /campaigns/:id - Update campaign

- DELETE /campaigns/:id - Delete campaign

### Donations

- GET /donations - Get all donations

- POST /donations - Create new donation

## Testing the API

### Using Postman

1. Import the Postman collection from /docs/postman_collection.json

2. Set base URL to http://127.0.0.1:5000

3. Test all endpoints with provided examples

- **Example API Calls**
  ```bash
- **Get all campaigns**
curl http://127.0.0.1:5000/campaigns

- **Create a new user**
curl -X POST http://127.0.0.1:5000/users \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'


## Team Roles & Contributions

### Jackson (Backend Lead)
- Designed and implemented Flask API architecture

- Created database models and relationships

- Implemented user authentication system

- Built campaign and donation management endpoints

- Set up database migrations and seeding

### Cassy (Frontend Lead)
- Developed React frontend application

- Implemented responsive UI components

- Created campaign browsing and creation interfaces

- Integrated frontend with backend API

- Designed user experience and navigation

## License
MIT License

Copyright &copy; 2025 Jackson Mungai and Cassy Omondi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.