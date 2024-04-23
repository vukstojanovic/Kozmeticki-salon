import { useEffect, useState } from "react";
import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";

import Admin from "./Admin";
import Home from "./Home";
import Loader from "./components/custom/loader/Loader";
import Login from "./components/custom/login/Login";

function App() {
  const [isAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fakeDataFetch = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    fakeDataFetch();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={isAuthenticated ? <Admin /> : <Login />} />
    </Routes>
  );
}

export default App;
