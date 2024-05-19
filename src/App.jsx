import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import { auth } from "./firebase/firebase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [triggerUserEffect, settriggerUserEffect] = useState(false);
  useEffect(() => {
    // Fetch the login status from local storage
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [triggerUserEffect]);

  return (
    <>
      {isLoggedIn ? (
        <Dashboard settriggerUserEffect={settriggerUserEffect} isLoggedIn={isLoggedIn}/>
      ) : (
        <Home settriggerUserEffect={settriggerUserEffect} />
      )}
    </>
  );
}

export default App;
