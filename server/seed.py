from app import app, db
from models import User, Campaign, Donation

with app.app_context():
    db.drop_all()
    db.create_all()

    user1 = User(username='alice', email='alice@example.com')
    user1.set_password('password123')

    user2 = User(username='bob', email='bob@example.com')
    user2.set_password('password456')

    db.session.add_all([user1, user2])
    db.session.commit()

    campaign1 = Campaign(
        title='Education Fund',
        description='Support education for kids',
        funding_goal=1000.0,
        user_id=user1.id
    )
    campaign2 = Campaign(
        title='Health Initiative',
        description='Fund medical supplies',
        funding_goal=5000.0,
        user_id=user2.id
    )

    db.session.add_all([campaign1, campaign2])
    db.session.commit()

    donation1 = Donation(user_id=user2.id, campaign_id=campaign1.id, amount=50.0)
    donation2 = Donation(user_id=user1.id, campaign_id=campaign2.id, amount=100.0)

    db.session.add_all([donation1, donation2])
    db.session.commit()

    print("Database seeded successfully!")
