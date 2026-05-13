import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Estilos.css";
import { CartProvider } from "./contexto/CarroContexto";

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <CartProvider>
    <App />
    </CartProvider>
  </React.StrictMode>
  
);