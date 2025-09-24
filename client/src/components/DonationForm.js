import React, { useState } from 'react';

function DonationForm({ campaign }) {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!amount || amount <= 0) {
      setMessage('Please enter a valid amount');
      return;
    }

    try {
      const donationData = {
        user_id: 1, // For testing - would normally come from login
        campaign_id: campaign.id,
        amount: parseFloat(amount)
      };

      const response = await fetch('http://127.0.0.1:5000/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Donation successful! Thank you!');
        setAmount('');
      } else {
        setMessage('Error: ' + result.error);
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px 0' }}>
      <h3>Make a Donation</h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Amount: $ </label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ padding: '5px', marginLeft: '10px' }}
            min="1"
            required
          />
        </div>
        
        <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none' }}>
          Donate Now
        </button>
      </form>

      {message && <p style={{ color: message.includes('Error') ? 'red' : 'green', marginTop: '10px' }}>{message}</p>}
    </div>
  );
}

export default DonationForm;