import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';
import './header.css';
import './footer.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Footer />
      </div>
    </Router>
  );
}

export default App;