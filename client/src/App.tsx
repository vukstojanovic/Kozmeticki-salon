import { useEffect, useState } from "react";
import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box, VStack } from "@chakra-ui/react";

import Admin from "./Admin";
import Loader from "./components/custom/loader/Loader";
import Header from "./components/custom/header/Header";

function App() {
  const [isAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fakeDataFetch = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    };

    fakeDataFetch();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <VStack bgColor="#FAEEE9" minHeight="100vh">
      <Header />
      <section id="Services">Services</section>
      <section id="Portfolio">Portfolio</section>
      <section id="Contact">Contact</section>

      {/* 
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route
              path="/admin"
              element={isAuthenticated ? <Admin /> : <Navigate to="/" />}
            />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
 */}
    </VStack>
  );
}

export default App;
