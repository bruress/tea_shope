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

import Home from './pages/Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
