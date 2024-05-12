import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ScrollProvidor } from "./context/ScrollContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ScrollProvidor>
    <App />
  </ScrollProvidor>
);
