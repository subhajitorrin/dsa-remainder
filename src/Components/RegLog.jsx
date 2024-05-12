import React, { useRef, useState } from "react";
import "./RegLog.css";

function RegLog({logrefsection}) {
  const [toggle, setToggle] = useState(false);
  function handleToggle() {
    setToggle((prev) => !prev);
  }

  return (
    <div className="h-screen pl-20 pr-20  flex flex-col items-center justify-center" ref={logrefsection}>
      <div className={`container ${toggle ? "active" : ""}`} id="container">
        <div className="form-container sign-up">
          <form>
            <h1>Create Account</h1>
            <div className="social-icons">
              <i className="fab fa-google-plus-g  iconx"></i>
              <i className="fab fa-facebook-f iconx"></i>
              <i className="fab fa-github iconx"></i>
              <i className="fab fa-linkedin-in iconx"></i>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="button" onClick={handleToggle}>
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form>
            <h1>Sign In</h1>
            <div className="social-icons">
              <i className="fab fa-google-plus-g iconx"></i>
              <i className="fab fa-facebook-f iconx"></i>
              <i className="fab fa-github iconx"></i>
              <i className="fab fa-linkedin-in iconx"></i>
            </div>
            <span>or use your email password</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <span>Forget Your Password?</span>
            <button type="button" onClick={handleToggle}>
              Sign In
            </button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden" id="login" onClick={handleToggle}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button className="hidden" id="register" onClick={handleToggle}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegLog;
