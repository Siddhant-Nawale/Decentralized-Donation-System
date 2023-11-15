import { Navbar, Welcome, Footer, Services, Transactions, Fbtrial, Login, Register, RegisterCharity, Charity } from "./components";
import React from 'react';
// import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App1 = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Welcome />
    </div>
    {/* <Services /> */}
    <Transactions />
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
    <div className="">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/UserHome" element={<App1/>} exact />
        <Route path="/Register" element={<Register/>} exact />
        <Route path="/Register Charity" element={<RegisterCharity/>} exact />
        <Route path="/Charity" element={<Charity/>} exact />

        
      </Routes>
    </div>
    </Router>
  )
}

export default App