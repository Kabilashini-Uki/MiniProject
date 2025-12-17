import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './About.css';
import bg from '../assets/music.jpg'

function About() {
  const location = useLocation();
  const selectedMood = location.state?.selectedMood || { emoji: '🎵', name: 'Happy', color: '#667eea' };
  
  const [songs, setSongs] = useState([]);
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  

  const fetchSongs = async () => {
    try {
      const moodKeywords = {
        'Happy': 'happy pop music',
        'Sad': 'sad acoustic songs',
        'Calm': 'peaceful instrumental',
        'Excited': 'upbeat dance',
        'Motivated': 'motivational workout',
       'Focused': 'focus concentration',
   
      };

      const searchTerm = moodKeywords[selectedMood.name] || 'happy music';
      
    
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=song&limit=10`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch songs');
      }
      
      const data = await response.json();
      
   
      const formattedSongs = data.results.map(song => ({
        id: song.trackId,
        title: song.trackName || 'Unknown Title',
        artist: song.artistName || 'Unknown Artist',
        album: song.collectionName || 'Unknown Album',
        mood: selectedMood.name,
        previewUrl: song.previewUrl,
        artwork: song.artworkUrl100 || 'https://via.placeholder.com/100'
      }));
      
      return formattedSongs;
      
    } catch (error) {
      console.error('Error fetching songs:', error);
     
      return getFallbackSongs(selectedMood.name);
    }
  };

  const getFallbackSongs = (mood) => {
    const fallbackSongs = {
      'Happy': [
        { id: 1, title: "Happy", artist: "Pharrell Williams", album: "G I R L", mood: "Happy" },
        { id: 2, title: "Don't Stop Me Now", artist: "Queen", album: "Jazz", mood: "Happy" },
        { id: 3, title: "Walking on Sunshine", artist: "Katrina and The Waves", album: "Walking on Sunshine", mood: "Happy" }
      ],
      'Sad': [
        { id: 4, title: "Someone Like You", artist: "Adele", album: "21", mood: "Sad" },
        { id: 5, title: "Hurt", artist: "Johnny Cash", album: "American IV: The Man Comes Around", mood: "Sad" },
        { id: 6, title: "The Sound of Silence", artist: "Simon & Garfunkel", album: "Sounds of Silence", mood: "Sad" }
      ],
      'Angry': [
        { id: 7, title: "Break Stuff", artist: "Limp Bizkit", album: "Significant Other", mood: "Angry" },
        { id: 8, title: "Killing in the Name", artist: "Rage Against the Machine", album: "Rage Against the Machine", mood: "Angry" }
      ],
      'Calm': [
        { id: 9, title: "Weightless", artist: "Marconi Union", album: "Weightless", mood: "Calm" },
        { id: 10, title: "Clair de Lune", artist: "Claude Debussy", album: "Suite bergamasque", mood: "Calm" }
      ]
    };

    return fallbackSongs[mood] || [
      { id: 11, title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", mood: "Classic" },
      { id: 12, title: "Imagine", artist: "John Lennon", album: "Imagine", mood: "Peaceful" }
    ];
  };


  const fetchQuotes = async () => {
    try {
      const moodTags = {
        'Happy': 'happiness',
        'Sad': 'sad',
       'Calm': 'peace',
        'Excited': 'excitement',
        'Motivated': 'motivational',
      'Focused': 'focus',
    
      };

      const tag = moodTags[selectedMood.name] || 'inspirational';
      
    
      const response = await fetch(
        `https://api.quotable.io/quotes/random?tags=${tag}&limit=5`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch quotes');
      }
      
      const data = await response.json();
      
    
      const formattedQuotes = data.map(quote => ({
        id: quote._id,
        content: quote.content,
        author: quote.author,
        tags: quote.tags
      }));
      
      return formattedQuotes;
      
    } catch (error) {
      console.error('Error fetching quotes:', error);
    
      return getFallbackQuotes(selectedMood.name);
    }
  };

 
  const getFallbackQuotes = (mood) => {
    const fallbackQuotes = {
      'Happy': [
        { id: 1, content: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
        { id: 2, content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        
      ],
      'Sad': [
        { id: 3, content: "Tears come from the heart and not from the brain.", author: "Leonardo da Vinci" },
        { id: 4, content: "The soul would have no rainbow if the eyes had no tears.", author: "Native American Proverb" }
      ],
      'Angry': [
        { id: 5, content: "For every minute you remain angry, you give up sixty seconds of peace of mind.", author: "Ralph Waldo Emerson" },
        { id: 6, content: "Anger is an acid that can do more harm to the vessel in which it is stored than to anything on which it is poured.", author: "Mark Twain" }
      ],
      'Motivated': [
        { id: 7, content: "The only way to achieve the impossible is to believe it is possible.", author: "Charles Kingsleigh" },
        { id: 8, content: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" }
      ]
    };

    return fallbackQuotes[mood] || [
      { id: 9, content: "Music gives a soul to the universe, wings to the mind, flight to the imagination and life to everything.", author: "Plato" },
      { id: 10, content: "Where words fail, music speaks.", author: "Hans Christian Andersen" }
    ];
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
      
        const [songsData, quotesData] = await Promise.all([
          fetchSongs(),
          fetchQuotes()
        ]);
        
        setSongs(songsData);
        setQuotes(quotesData);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error(err);
        
 
        setSongs(getFallbackSongs(selectedMood.name));
        setQuotes(getFallbackQuotes(selectedMood.name));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedMood.name]);



  const handlePlayPreview = (url) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('Preview not available for this song');
    }
  };



  return (
    <div className="about-container"  style={{ backgroundImage: `url(${bg}) ` }}>
 
      <div className="glass mood-header container" style={{ borderLeft: `5px solid ${selectedMood.color}`, marginTop:'20px'}}>
        <div className="mood-info">
          <span className="mood-emoji-large">{selectedMood.emoji}</span>
          <div style={{color:"white"}}>
            <h2>Welcome to MoodWaves!</h2>
            <p className="mood-subtext">Here's your personalized music and quotes to boost your mood!</p>
          </div>
        </div>
      </div>


      {error && (
        <div className="glass-card error-message">
          <p> {error}</p>
          <p>Showing offline recommendations instead.</p>
        </div>
      )}

      <div className="content-grid ">
     
      

<div className="content-grid ">
  <div className="left-column ">
    <div className='d-flex p-4'>
   
    <div className='glass container'>
      <div className="section-header">
        <h3 style={{color:'white'}}>Recommended Songs for {selectedMood.name} Mood</h3>
        {!loading && <span className="count-badge">{songs.length} songs</span>}
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="songs-list"> 
          {songs.map((song) => (
            <div key={song.id} className="song-item"> 
              <div className="song-artwork">
                <img src={song.artwork} alt={song.title} />
              </div>
              <div className="song-info">
                <h4>{song.title}</h4>
                <p className="song-artist">{song.artist}</p>
                <p className="song-album">{song.album}</p>
                <div className="song-mood">{song.mood}</div>
              </div>
              <div className="song-actions">
                {song.previewUrl ? (
                  <button 
                    className="play-btn"
                    onClick={() => handlePlayPreview(song.previewUrl)}
                    title="Play preview"
                  >
                    Play
                  </button>
                ) : (
                  <span className="no-preview">No Preview</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

 
    <div className="glass container " style={{marginLeft:'20px', height:'500px', background:'rgba(0,0,0,0.6'}}>
      <div className="section-header">
        <h2 style={{color:'white'}}>Motivational Quotes</h2>
        {!loading && <span className="count-badge">{quotes.length} quotes</span>}
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="quotes-list p-4"> 
          {quotes.map((quote) => (
            <div key={quote.id} className="quote-item" style={{ borderLeftColor: selectedMood.color }}>
              <p className="quote-content">"{quote.content}"</p>
              <p className="quote-author">— {quote.author}</p>
              {quote.tags && (
                <div className="quote-tags">
                  {quote.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  </div>
</div>
     

      </div>
    </div>
  );
}

export default About;










