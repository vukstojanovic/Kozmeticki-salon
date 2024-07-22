import { useEffect, useState } from "react";
import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";

import Admin from "./Admin";
import Home from "./Home";
import Loader from "./components/client/loader/Loader";
import Login from "./components/admin/login/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status from localStorage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    const fakeDataFetch = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    fakeDataFetch();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/admin"
        element={
          isAuthenticated ? (
            <Admin setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/login"
        element={
          <Login onSuccess={() => setIsAuthenticated(true)} /> // Pass function to Login
        }
      />
    </Routes>
  );
}

export default App;
