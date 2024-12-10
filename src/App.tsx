import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Banner } from './components/Banner';
import { HomePage } from './pages/HomePage';
import { DataPage } from './pages/DataPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Banner />
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/data" className="nav-link">Power Data</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/data" element={<DataPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;