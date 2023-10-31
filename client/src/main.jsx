import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store/index.js";
import { Provider } from "react-redux";

//?Se le brinda a App la habilidad de generar rutas mediante BrowserRouter
//? Mediante Provider estamos dotando a nuestra App de los estados que se crean en mi store y por ello le pasamos la store como parametro

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
