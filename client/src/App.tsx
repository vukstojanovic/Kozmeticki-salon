import "./App.css";
import Admin from "./Admin";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./Home";

function App() {
  const [isAuthenticated] = useState(true);

  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route
          path="/admin"
          element={isAuthenticated ? <Admin /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
