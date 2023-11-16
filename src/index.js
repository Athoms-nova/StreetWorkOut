import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { GestionContext, GestionProvider } from "./Context/GestionContext";
import { AnimContext, AnimProvider } from "./Context/AnimContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GestionProvider value={GestionContext}>
    <AnimProvider value={AnimContext}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </AnimProvider>
  </GestionProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
