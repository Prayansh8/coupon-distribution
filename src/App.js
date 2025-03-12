import React from 'react';
import Navbar from './components/Navbar';
import Coupon from './components/Coupon';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Coupon />
    </div>
  );
}

export default App;