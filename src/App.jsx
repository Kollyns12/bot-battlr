import React, { useState, useEffect } from 'react';
import BotCollection from './BotCollection.jsx'; 
import YourBotArmy from './YourBotArmy.jsx';     
import './App.css';

function App() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://bot-battlr-42w9.onrender.com/bots')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBots(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const enlistBot = (botToEnlist) => {
    if (!army.some((bot) => bot.id === botToEnlist.id)) {
      setArmy([...army, botToEnlist]);
    }
  };

  const releaseBot = (botToRelease) => {
    setArmy(army.filter((bot) => bot.id !== botToRelease.id));
  };

  const dischargeBot = (botId) => {
    fetch(`https://bot-battlr-42w9.onrender.com/bots/${botId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setArmy(army.filter((bot) => bot.id !== botId));
          setBots(bots.filter((bot) => bot.id !== botId));
        } else {
          console.error('Failed to discharge bot:', response.status);
        }
      })
      .catch((error) => console.error('Error discharging bot:', error));
  };

  if (loading) {
    return <div>Loading bots...</div>;
  }

  if (error) {
    return <div>Error loading bots: {error}</div>;
  }

  return (
    <div className="app">
      <h1>Bot Battlr</h1>
      <YourBotArmy army={army} releaseBot={releaseBot} dischargeBot={dischargeBot} />
      <BotCollection bots={bots} enlistBot={enlistBot} army={army} />
    </div>
  );
}

export default App;