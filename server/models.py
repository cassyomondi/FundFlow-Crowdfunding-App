from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    campaigns = db.relationship('Campaign', back_populates='creator', cascade='all, delete-orphan')
    donations = db.relationship('Donation', back_populates='donor', cascade='all, delete-orphan')

    serialize_rules = ('-password_hash', '-campaigns', '-donations',)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)


class Campaign(db.Model, SerializerMixin):
    __tablename__ = 'campaigns'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    funding_goal = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    creator = db.relationship('User', back_populates='campaigns')
    donations = db.relationship('Donation', back_populates='campaign', cascade='all, delete-orphan')

    serialize_rules = ('-donations',)

    @property
    def amount_raised(self):
        return sum(d.amount for d in self.donations)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "funding_goal": self.funding_goal,
            "amount_raised": self.amount_raised,
            "user_id": self.user_id,
            "donations": [d.to_dict() for d in self.donations]
        }


class Donation(db.Model, SerializerMixin):
    __tablename__ = 'donations'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'), nullable=False)

    donor = db.relationship('User', back_populates='donations')
    campaign = db.relationship('Campaign', back_populates='donations')

    serialize_rules = ('-donor', '-campaign',)

    def to_dict(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "user_id": self.user_id,
            "campaign_id": self.campaign_id,
            "donor_name": self.donor.username if self.donor else "Anonymous"
        }
