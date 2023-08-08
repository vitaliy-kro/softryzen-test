import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./index.css";
import { App } from "./App";
import { CardsProvider } from "./hooks/useCards";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <CardsProvider>
        <App />
        <ToastContainer />
      </CardsProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
