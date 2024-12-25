// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './Components/Navbar.jsx';
import SignUpPage from './Pages/SignUpPage.jsx';
import HomePage from './Pages/HomePage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import ProfilePage from './Pages/ProfilePage.jsx';
import { useAuthStore } from './store/useAuthStore.js';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const { checkAuth , authUser, onlineUsers} = useAuthStore();

  console.log({onlineUsers})
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
    <Toaster/>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser? <HomePage/> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser? <ProfilePage/> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
