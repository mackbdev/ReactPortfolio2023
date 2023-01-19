import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
/* Remove for DND to work in Dev environment <React.StrictMode> */
root.render(

  <BrowserRouter>
    <App />
  </BrowserRouter>

);
