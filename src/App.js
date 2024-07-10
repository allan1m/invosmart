import React, { useEffect } from 'react';
import Signup from "./components/Signup";
import Login from "./components/Login";
import Invoice from "./components/Invoice";
import Account from "./components/Account";
import NoPage from "./components/NoPage";
import Logout from "./components/Logout";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  console.log("1-1");

  useEffect(() => {
    console.log("1-2");
    const token = localStorage.getItem('jwtToken');
    console.log(token);

    // If token exists, redirect to home page
    if (token) {
      console.log("1-3");
      // If token exists AND if the user is not already on an allowed page, navigate to the invoice page
      if (window.location.pathname === '/' || window.location.pathname === '/Login' || window.location.pathname === '/Signup') {
        navigate('/Invoice');
      }
    } else {
      console.log("1-4");
      // If the token does not exist (i.e., the user is not authenticated)
      // and the current path is not '/login' or '/signup'
      if (window.location.pathname !== '/Login' && window.location.pathname !== '/Signup') {
        // Redirect the user to the login page
        navigate('/');
      }
    }
  }, [navigate]);
  console.log("1-5");

  return (
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Invoice" element={<Invoice />}></Route>
        <Route path="/Account" element={<Account />}></Route>
        <Route path="*" element={<NoPage />}></Route>
      </Routes>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App className="h-100"/>
    </BrowserRouter>
  );
}

export default AppWrapper;
