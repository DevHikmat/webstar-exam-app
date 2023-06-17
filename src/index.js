import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={true}
      pauseOnHover={true}
      theme="light"
    />
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </div>
);
