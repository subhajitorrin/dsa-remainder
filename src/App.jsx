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
  const [isMobileView, setIsMobileView] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1000);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobileView) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-[30px]">
        Please open on desktop...
      </div>
    );
  }

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
