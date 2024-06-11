import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Admin from './Components/Admin/Admin';
import UserProfile from './Components/User/UserProfile';
import './App.css'

const App = () => {
  const mockUserData = {
    username: 'admin',
    usertype: 'admin',
    imageUrl: 'https://via.placeholder.com/100',
    name: 'Admin Name',
    email: 'admin@example.com',
    address: '123 Admin St',
    users: [
      { username: 'user1', status: 'active' },
      { username: 'user2', status: 'inactive' }
    ]
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Non-protected routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/administrator" element={<Admin userData={mockUserData} />} />
          <Route path="/auth/user" element={<UserProfile userData={mockUserData} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
