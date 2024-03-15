import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Profile from './Profile';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  )
}

export default App