import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/GlobalStyles.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="scanlines"></div>
    <div className="vignette"></div>
    <div className="rgb-split"></div>
    <App />
  </React.StrictMode>
);
