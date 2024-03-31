import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import Page404 from './Page404';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </>
  )
}

export default App;
