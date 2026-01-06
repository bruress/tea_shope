import {
  BrowserRouter as Router,
  Routes, 
  Route,
  Navigate,
  BrowserRouter
} from 'react-router-dom';

import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser}/>}/>
        <Route path="/register" element={<Register setUser={setUser}/>}/>
        <Route path="/" element={<Home user={user}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
