import { useEffect, useState } from "react";
import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box, Container, VStack } from "@chakra-ui/react";

import Admin from "./Admin";
import Loader from "./components/custom/loader/Loader";
import Header from "./components/custom/header/Header";
import Footer from "./components/custom/footer/Footer";
import SimpleMap from "./components/custom/simpleMap/SimpleMap";
import Services from "./components/custom/services/Services";

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
    // <Admin />
    <VStack minHeight="100vh" spacing={0}>
      <Header />
      <Container maxW="1440px" bg="white" color="white" p={0}>
        <section className="section" id="Usluge">
          <Services />
        </section>
        <section className="section" id="O nama">
          O nama
        </section>
        <section className="section" id="Kontakt">
          Kontakt
        </section>
      </Container>

      <SimpleMap />
      <Footer />
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
