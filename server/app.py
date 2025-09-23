from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, User, Campaign, Donation, bcrypt
import re

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fundflow.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)
bcrypt.init_app(app)
CORS(app)

@app.route('/')
def home():
    return jsonify({'message': 'Welcome to FundFlow API'})

@app.route('/users', methods=['GET', 'POST'])
def handle_users():
    if request.method == 'GET':
        users = User.query.all()
        return jsonify([u.to_dict() for u in users]), 200

    elif request.method == 'POST':
        data = request.get_json()
        if not data.get('username') or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Username, email, and password required'}), 400

        email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(email_pattern, data['email']):
            return jsonify({'error': 'Invalid email format'}), 400

        if User.query.filter_by(username=data['username']).first():
            return jsonify({'error': 'Username already exists'}), 400
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already exists'}), 400

        user = User(username=data['username'], email=data['email'])
        user.set_password(data['password'])

        db.session.add(user)
        db.session.commit()
        return jsonify(user.to_dict()), 201

@app.route('/campaigns', methods=['GET', 'POST'])
def handle_campaigns():
    if request.method == 'GET':
        campaigns = Campaign.query.all()
        return jsonify([c.to_dict() for c in campaigns]), 200

    elif request.method == 'POST':
        data = request.get_json()
        if not data.get('title') or not data.get('funding_goal') or not data.get('user_id'):
            return jsonify({'error': 'Title, funding goal, and user_id required'}), 400

        try:
            goal = float(data['funding_goal'])
            if goal <= 0:
                return jsonify({'error': 'Funding goal must be greater than 0'}), 400
        except ValueError:
            return jsonify({'error': 'Funding goal must be a valid number'}), 400

        campaign = Campaign(
            title=data['title'],
            description=data.get('description', ''),
            funding_goal=goal,
            user_id=data['user_id']
        )
        db.session.add(campaign)
        db.session.commit()
        return jsonify(campaign.to_dict()), 201

@app.route('/campaigns/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def handle_campaign(id):
    campaign = db.session.get(Campaign, id)
    if not campaign:
        return jsonify({'error': 'Campaign not found'}), 404

    if request.method == 'GET':
        return jsonify(campaign.to_dict()), 200

    elif request.method == 'PATCH':
        data = request.get_json()
        if 'title' in data:
            campaign.title = data['title']
        if 'description' in data:
            campaign.description = data['description']
        if 'funding_goal' in data:
            try:
                goal = float(data['funding_goal'])
                if goal <= 0:
                    return jsonify({'error': 'Funding goal must be greater than 0'}), 400
                campaign.funding_goal = goal
            except ValueError:
                return jsonify({'error': 'Funding goal must be a valid number'}), 400

        db.session.commit()
        return jsonify(campaign.to_dict()), 200

    elif request.method == 'DELETE':
        db.session.delete(campaign)
        db.session.commit()
        return jsonify({'message': 'Campaign deleted'}), 200


@app.route('/donations', methods=['GET', 'POST'])
def handle_donations():
    if request.method == 'GET':
        donations = Donation.query.all()
        return jsonify([d.to_dict() for d in donations]), 200

    elif request.method == 'POST':
        data = request.get_json()
        if not data.get('user_id') or not data.get('campaign_id') or not data.get('amount'):
            return jsonify({'error': 'user_id, campaign_id, and amount required'}), 400

        try:
            amount = float(data['amount'])
            if amount <= 0:
                return jsonify({'error': 'Donation amount must be greater than 0'}), 400
        except ValueError:
            return jsonify({'error': 'Donation amount must be a valid number'}), 400
        
        donation = Donation(user_id=data['user_id'], campaign_id=data['campaign_id'], amount=amount)
        db.session.add(donation)
        db.session.commit()
        return jsonify(donation.to_dict()), 201

if __name__ == '__main__':
    app.run(debug=True)
