import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeScreen from './components/home_screen/HomeScreen';
import Login from './components/login_screen/Login';

function App() {

  const routes = {

  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Login />
        } />
        <Route path="/login" element={
          <Login />
        } />
        <Route path="/home" element={
          <HomeScreen />
        } />
        <Route path="*" element={
          <Login />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
