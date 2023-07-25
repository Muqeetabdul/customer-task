import React, { useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/auth/login";
import { Routes, Route } from "react-router";
import * as authActions from "./redux/auth/authActions";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import Dashboard from "./pages/dashboard/dashboard";
import { PrivateRoute, UnauthorizedRoute } from "./components";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.localStorage.getItem("TOKEN")) {
      // @ts-ignore
      dispatch(authActions.Who_Am_i());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <UnauthorizedRoute>
              <LoginPage />
            </UnauthorizedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
