import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav'
import HomePage from './components/Body/HomePage'
import BookingPage from './components/Body/BookingPage';
import Login from './components/Body/Login'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/BookingPage" element={<BookingPage />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </Router>
    <Footer/>
    </div>
  );
}

export default App;
