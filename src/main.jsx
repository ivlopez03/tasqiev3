import React from "react";
import App from "./App.jsx";
import "./index.css";
import "../src/pages/CalendarPage/CalendarPage.css";


import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>,
);
