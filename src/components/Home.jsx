import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import bgImage from "../assets/back.webp";


import happyImg from "../assets/happy.png";
import sadImg from "../assets/sad.png";
import calmImg from "../assets/calm.png";
import excitedImg from "../assets/energy.png";
import motivatedImg from "../assets/motiveted.png";
import focusedImg from "../assets/heart.png";

function Home() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { 
      emoji: happyImg,
      name: 'Happy', 
      color: '#FFD700' 
    },
    { 
      emoji: sadImg,  
      name: 'Sad', 
      color: '#6495ED' 
    },
    { 
      emoji: calmImg, 
      name: 'Calm', 
      color: '#98FB98' 
    },
    { 
      emoji: excitedImg, 
      name: 'Excited', 
      color: '#FFA500' 
    },
    { 
      emoji: motivatedImg, 
      name: 'Motivated', 
      color: '#32CD32' 
    },
    { 
      emoji: focusedImg, 
      name: 'Focused', 
      color: '#00CED1' 
    },
  ];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setTimeout(() => {
      navigate('/about', { state: { selectedMood: mood } });
    }, 500);
  };

  return (
    <div className="home-container" style={{ backgroundImage: `url(${bgImage})`, height: '400px' }}>
      <div className="glass">
        <h1 className="title">🎵 How are you feeling today?</h1>
        <p className="subtitle">Select your current mood and let music heal your soul</p>
        
        <div className="moods-grid">
          {moods.map((mood, index) => (
            <button
              key={index}
              className={`mood-btn ${selectedMood?.name === mood.name ? 'selected' : ''}`}
              onClick={() => handleMoodSelect(mood)}
              style={{ '--mood-color': mood.color }}
            >
           
              <img 
                src={mood.emoji} 
                alt={mood.name} 
                className="mood-emoji"
                width="40"
                height="40"
              />
              <span className="mood-name">{mood.name}</span>
            </button>
          ))}
        </div>
        
        {selectedMood && (
          <div className="selection-message">
            <p>You selected: {selectedMood.name}</p>
            <p>Taking you to your personalized music and quotes...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
