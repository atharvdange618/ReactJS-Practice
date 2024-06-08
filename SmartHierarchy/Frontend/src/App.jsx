import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from "./Components/Register/Register";
// import './App.css'

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation links */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/administrator">Administrator Panel</Link>
            </li>
            <li>
              <Link to="/user">User Panel</Link>
            </li>
            <li>
              <Link to="/user/tree">User Tree</Link>
            </li>
            <li>
              <Link to="/administrator/user/tree">Administrator User Tree</Link>
            </li>
          </ul>
        </nav>

        {/* Route definitions */}
        <Routes>
          {/* Home route */}
          <Route path="/" component={<Home />} />
          {/* Login routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Administrator routes */}
          <Route path="/administrator" element={<AdministratorPanel />} />
          {/* User routes */}
          <Route path="/user" element={<UserPanel />} />
          <Route path="/user/tree" element={<UserTree />} />
          {/* Administrator user tree route */}
          <Route path="/administrator/user/tree" element={<AdministratorUserTree />} />
        </Routes>
      </div>
    </Router>
  );
};

// Placeholder components for each route
const Home = () => <h1>Welcome to the Home Page</h1>;
const Login = () => <h1>Login Page</h1>;
const AdministratorPanel = () => <h1>Administrator Panel</h1>;
const UserPanel = () => <h1>User Panel</h1>;
const UserTree = () => <h1>User Tree</h1>;
const AdministratorUserTree = () => <h1>Administrator User Tree</h1>;

export default App;
