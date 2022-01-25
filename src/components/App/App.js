//import logo from "./logo.svg";
//import './App.css';
import LandingPage from "../LandingPage";
import About from "../About";
import React from "react";
import { ThemeProvide } from "@mui/styles";
//import { Route, Switch, Link } from 'react-router-dom';
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  return (
    <div className="app">
      <div>
        <h1>Hello World</h1>
        <h4>yo what up</h4>
      </div>
      <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/home" element={<LandingPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
