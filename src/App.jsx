import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import { auth } from "./firebase/firebase";
import Loading from "./Pages/Loading";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [triggerUserEffect, settriggerUserEffect] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    // Fetch the login status from local storage
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setisLoading(false);
  }, [triggerUserEffect]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isLoggedIn ? (
        <Dashboard
          settriggerUserEffect={settriggerUserEffect}
          isLoggedIn={isLoggedIn}
        />
      ) : (
        <Home settriggerUserEffect={settriggerUserEffect} />
      )}
    </>
  );
}

export default App;
