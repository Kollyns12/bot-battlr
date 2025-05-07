import React from 'react';
import './YourBotArmy.css';

function YourBotArmy({ army, releaseBot, dischargeBot }) { // Added dischargeBot
  const handleRelease = (bot) => {
    releaseBot(bot);
  };

    const handleDischarge = (bot) => {
    dischargeBot(bot.id);
  };

  return (
    <div className="your-bot-army">
      <h2>Your Bot Army</h2>
      <div className="bot-grid">
        {army.map((bot) => (
          <div key={bot.id} className="bot-card">
            <img src={bot.avatar_url} alt={bot.name} />
            <h3>{bot.name}</h3>
            <p>Class: {bot.bot_class}</p>
            <p>Health: {bot.health}</p>
            <p>Damage: {bot.damage}</p>
            <p>Armor: {bot.armor}</p>
            <button onClick={() => handleRelease(bot)}>Release</button>
            <button onClick={() => handleDischarge(bot)}>Discharge</button> {/* Discharge */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default YourBotArmy;
