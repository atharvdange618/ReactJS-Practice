import React from 'react'
import Header from './components/Header';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import Profile from './pages/Profile';
import Projects from './pages/Projects';
import ProjectDetail from './components/ProjectDetail';


const App = () => {
  const user = 'atharvdange618'
  return (
    <div className='App'>
      <BrowserRouter>
        <Header logo={logo} />
        <Routes>
          <Route path='/' element={<Profile userName={user} />} />
          <Route path='/projects' element={<Projects userName={user} />} />
          <Route
            path='/projects/:name'
            element={<ProjectDetail userName={user} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App