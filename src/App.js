import React from "react";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";

import Home from "./components/Home";
import About from "./components/About";

function App() {
  return (
    <Router>
      <div className="App">

      
        <nav className="glass-navbar">
          <div className="nav-container">
            <Link to="/" className="logo"><span style={{fontSize:'30px'}}> MoodWaves</span></Link>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
            </div>
          </div>
        </nav>

        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>

        
        <footer className="footer">
          <h4> MoodWaves - Let music heal your soul </h4>
        </footer>

      </div>
    </Router>
  );
}

export default App;