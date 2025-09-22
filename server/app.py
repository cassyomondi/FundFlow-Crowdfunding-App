from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, User, Campaign, Donation

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fundflow.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)

@app.route('/')
def home():
    return {"message": "FundFlow backend is running 🚀"}

@app.route('/users', methods=['GET', 'POST'])
def handle_users():
    if request.method == 'GET':
        users = User.query.all()
        return jsonify([user.to_dict() for user in users]), 200
    elif request.method == 'POST':
        data = request.get_json()
        if not data.get('username') or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Username, email, and password required'}), 400
        if User.query.filter_by(username=data['username']).first():
            return jsonify({'error': 'Username already exists'}), 400
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already exists'}), 400
        user = User(
            username=data['username'],
            email=data['email'],
            password=data['password']
        )
        db.session.add(user)
        db.session.commit()
        return jsonify(user.to_dict()), 201

@app.route('/campaigns', methods=['GET', 'POST'])
def handle_campaigns():
    if request.method == 'GET':
        campaigns = Campaign.query.all()
        return jsonify([campaign.to_dict() for campaign in campaigns]), 200
    elif request.method == 'POST':
        data = request.get_json()
        if not data.get('title') or not data.get('funding_goal') or not data.get('user_id'):
            return jsonify({'error': 'Title, funding goal, and user ID required'}), 400
        if not User.query.get(data['user_id']):
            return jsonify({'error': 'User ID does not exist'}), 404
        campaign = Campaign(
            title=data['title'],
            description=data.get('description', ''),
            funding_goal=data['funding_goal'],
            user_id=data['user_id']
        )
        db.session.add(campaign)
        db.session.commit()
        return jsonify(campaign.to_dict()), 201

@app.route('/campaigns/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def handle_campaign(id):
    campaign = Campaign.query.get_or_404(id)
    if request.method == 'GET':
        return jsonify(campaign.to_dict()), 200
    elif request.method == 'PATCH':
        data = request.get_json()
        if 'title' in data:
            campaign.title = data['title']
        if 'description' in data:
            campaign.description = data['description']
        if 'funding_goal' in data:
            campaign.funding_goal = data['funding_goal']
        db.session.commit()
        return jsonify(campaign.to_dict()), 200
    elif request.method == 'DELETE':
        db.session.delete(campaign)
        db.session.commit()
        return jsonify({'message': 'Campaign deleted'}), 204

@app.route('/donations', methods=['GET', 'POST'])
def handle_donations():
    if request.method == 'GET':
        donations = Donation.query.all()
        return jsonify([donation.to_dict() for donation in donations]), 200
    elif request.method == 'POST':
        data = request.get_json()
        if not data.get('user_id') or not data.get('campaign_id') or not data.get('amount'):
            return jsonify({'error': 'User ID, campaign ID, and amount required'}), 400
        if data['amount'] <= 0:
            return jsonify({'error': 'Amount must be greater than 0'}), 400
        if not User.query.get(data['user_id']):
            return jsonify({'error': 'User ID does not exist'}), 404
        if not Campaign.query.get(data['campaign_id']):
            return jsonify({'error': 'Campaign ID does not exist'}), 404
        donation = Donation(
            user_id=data['user_id'],
            campaign_id=data['campaign_id'],
            amount=data['amount']
        )
        db.session.add(donation)
        db.session.commit()
        return jsonify(donation.to_dict()), 201

if __name__ == '__main__':
    app.run(port=5000, debug=True)