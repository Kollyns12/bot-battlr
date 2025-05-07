import React from 'react';
import BotCard from './BotCard';
import './BotCollection.css'; // You can create this CSS file

function BotCollection({ bots, enlistBot }) {
  return (
    <div className="bot-collection">
      <h2>Available Bots</h2>
      <div className="bot-grid">
        {bots.map((bot) => (
          <BotCard key={bot.id} bot={bot} enlistBot={enlistBot} />
        ))}
      </div>
    </div>
  );
}

export default BotCollection;