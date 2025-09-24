import React from 'react';

function ProgressBar({ campaign }) {

  const raised = 350; 
  const goal = campaign.funding_goal;
  const percentage = Math.min((raised / goal) * 100, 100);

  return (
    <div style={{ margin: '20px 0' }}>
      <h4>Funding Progress</h4>
      
      <div style={{ 
        width: '100%', 
        height: '20px', 
        backgroundColor: '#f0f0f0', 
        borderRadius: '10px',
        margin: '10px 0'
      }}>
        <div 
          style={{ 
            width: `${percentage}%`, 
            height: '100%', 
            backgroundColor: percentage >= 100 ? 'green' : '#007bff',
            borderRadius: '10px',
            transition: 'width 0.3s'
          }}
        ></div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Raised: ${raised}</span>
        <span>Goal: ${goal}</span>
      </div>
      
      <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
        {percentage.toFixed(1)}% Funded
      </p>
    </div>
  );
}

export default ProgressBar;