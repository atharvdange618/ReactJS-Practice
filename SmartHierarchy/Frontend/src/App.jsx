import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Admin from './Components/Admin/Admin';
import UserProfile from './Components/User/UserProfile';
import Cookies from 'js-cookie';
import './App.css'

const App = () => {

  // Function to check if token exists
  const isAuthenticated = () => {
    const token = Cookies.get('token'); 
    return !!token;
  };

  // Protected Route Component
  const AuthenticatedRoute = ({ element, ...rest }) => {
    return isAuthenticated() ? (
      element
    ) : (
      <Navigate to="/login" state={{ from: rest.location }} replace />
    );
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

          {/* Protected routes */}
          <Route path="/auth/administrator" element={<AuthenticatedRoute element={<Admin />} />} />
          <Route path="/auth/user" element={<AuthenticatedRoute element={<UserProfile />} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
