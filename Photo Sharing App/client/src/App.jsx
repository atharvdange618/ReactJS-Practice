import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import Page404 from './Page404';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in on initial render
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Convert token to boolean
  }, []);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path='/' element={<Home />} />
        {isLoggedIn ? (
          <Route path='/profile' element={<Profile />} />
        ) : (
          <>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </>
        )}
        <Route path='*' element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
