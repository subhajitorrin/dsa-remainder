import React, { useState } from "react";
import "./App.css";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      {
        isLoggedIn ?
        <Dashboard/> :
        <Home/>
      }
    </>
  );
}

export default App;
