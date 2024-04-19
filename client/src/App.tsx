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
import Educations from "./components/custom/educations/Educations";
import FollowUsSection from "./components/custom/followUsSection/FollowUsSection";
import AboutUs from "./components/custom/aboutUs/AboutUs";
import VaucherSection from "./components/custom/voucherSection/VoucherSection";
import WorkHours from "./components/custom/workHours/workHours";
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
    // <Login />
    // <Admin />
    <VStack minHeight="100vh" spacing={0}>
      <Header />
      <Container minW="100vw" bg="white" color="white" p={0} m={0}>
        <section className="section" id="O nama">
          <WorkHours />
          <AboutUs />
        </section>
        <section className="section" id="Usluge">
          <FollowUsSection />
          <Services />
        </section>
        <section className="section" id="Edukacije">
          <VaucherSection />
          <Educations />
        </section>
        <SimpleMap />
      </Container>

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
