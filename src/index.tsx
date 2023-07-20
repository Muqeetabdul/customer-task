import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import * as axiosInitializer from "./app/redux/axios";
import axios from "axios";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root")!;
const root = createRoot(container);
// axiosInitializer.mockAxios(axios);
axiosInitializer.setupAxios({axios,store});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
