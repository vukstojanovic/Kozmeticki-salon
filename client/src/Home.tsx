import { Container, VStack } from "@chakra-ui/react";
import "./App.scss";
import Header from "./components/custom/header/Header";
import Footer from "./components/custom/footer/Footer";
import Services from "./components/custom/services/Services";
import FollowUsSection from "./components/custom/followUsSection/FollowUsSection";
import AboutUs from "./components/custom/aboutUs/AboutUs";
import VaucherSection from "./components/custom/voucherSection/VoucherSection";
import WorkHoursSection from "./components/custom/workHoursSection/WorkHoursSection";

const Home = () => {
  return (
    <VStack minHeight="100vh" spacing={0}>
      <Header />
      <Container minW="100vw" bg="white" color="white" p={0} m={0}>
        <section className="section" id="O nama">
          <FollowUsSection />
          <AboutUs />
        </section>
        <section className="section" id="Usluge">
          <VaucherSection />
          <Services />
        </section>
        <WorkHoursSection />
      </Container>

      <Footer />
    </VStack>
  );
};

export default Home;
