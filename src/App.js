import React, {useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout, Typography } from "antd";
import {
  Navbar,
  Exchanges,
  Homepage,
  Cryptocurrencies,
  News,
  CryptoDetails,
  Login,
  Register,
  Watchlist,
  Logout
} from "./components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

const App = () => {
  const [isAuth, setIsAuth ] = useState(false);

  const setAuth = (boolean) => {
    setIsAuth(boolean);
  }

  console.log(isAuth);

  async function verify(){
    try{
      const response = await fetch("https://kritserver1.herokuapp.com/auth/is-verify", {
        method: "GET",
        headers: {token: localStorage.token}
      });

      const parseRes = await response.json()
      parseRes === true ? setAuth(true) : setAuth(false);
    } catch(err){
      console.error(err.message);
    }
  }

  useEffect(() => {
    verify();
  })

  return (
    <div className="app">
      <ToastContainer />
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
              <Route path="/watchlist" setAuth={setAuth} element={isAuth ? <Watchlist /> : <Navigate to="/login" />} />
              <Route path="/login" setAuth={setAuth} element={isAuth ? <Navigate to="/cryptocurrencies" /> :<Login />} />
              <Route path="/register" setAuth={setAuth} element={isAuth ? <Navigate to="/" /> : <Register />} />
              <Route path="/logout" setAuth={setAuth} element={isAuth ? <Logout /> : <Navigate to ="/login" />} />
            </Routes>
          </div>
        </Layout>
      <div className="footer">
        <Typography.Title level={5} style={{ color: 'white', textAlign: 'center'}}>
          All rights reserved © 2022
        </Typography.Title>
      </div>
      </div>
    </div>
  );
};

export default App;
