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
import Catalog from './pages/Catalog';
import Cart from './components/Cart';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const openCart = () => setCartOpen(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/auth/me`, {withCredentials: true});
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}/>
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register setUser={setUser} />} />
        <Route path="/" element={<Home user={user} setUser={setUser} openCart={openCart} cartOpen={cartOpen} setCartOpen={setCartOpen}/>}/>
        <Route path="/catalog/:id" element={<Catalog setUser={setUser} user={user} openCart={openCart}/>} />
        <Route path='/cart' element={<Cart user={user} setUser={setUser} setCartOpen={setCartOpen}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
