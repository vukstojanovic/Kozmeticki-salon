import { Stack, Image, Text, Box, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import section111 from "../../../assets/section111.png";

const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionBox = motion(Box);

const AboutUs = () => {
  return (
    <Stack
      id="o-nama"
      display="flex"
      direction="row"
      gap="5vh"
      w="full"
      pt={{ base: "15%", sm: "7%" }}
      pb={{ base: "0", md: "7%" }}
      px="7%"
      position="relative"
      zIndex={1}
    >
      <Stack
        display="flex"
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 0, md: 3 }}
      >
        <MotionBox
          zIndex={1}
          width={{ base: "100%", md: "50%" }}
          gap="5vh"
          display="flex"
          flexDirection="column"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 50 }}
        >
          <MotionHeading
            variant={{ base: "customH2Mob", md: "customH2" }}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
          >
            O Nama
          </MotionHeading>
          <Stack fontSize={{ base: "15px", md: "xl" }}>
            <MotionText
              color="blue"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Naš posao je naša strast – uvek smo spremni da mu poklonimo
              posebnu pažnju, učimo, napredujemo, a sve u cilju zadovoljstva
              naših klijenata.
            </MotionText>
            <MotionText
              color="blue"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Sa početkom karijere 2011. godine, naša vlasnica Marija
              Grozdanović je počela svoju avanturu u svetu kozmetike. Kroz rad u
              različitim salonima, stekla je bogato iskustvo koje je 2016.
              godine pretvorila u ostvarenje sna - otvaranje sopstvenog salona.
            </MotionText>
            <MotionText
              color="blue"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Prateći trendove u industriji lepote, danas klijentima možemo da
              ponudimo širok spektar usluga: manikir, pedikir, tretmane lica,
              trajnu šminku obrva, masaže. Posvećeni smo pružanjem vrhunske nege
              svojim klijentima, čineći svaki trenutak pravim uživanjem za čula
              i dušu.
            </MotionText>
            <MotionText
              color="blue"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Beauty Corner je mesto gde vaše lice i telo dobijaju kompletnu
              negu i lepši izgled.
            </MotionText>
          </Stack>
        </MotionBox>
        <MotionBox
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Image
            objectFit="cover"
            src={section111}
            alt="section111"
            width={{ base: "120%", md: "60%" }}
            height={{ base: "360px", sm: "100%" }}
            object-position="bottom"
            zIndex={1}
            position={{ base: "relative", md: "absolute" }}
            bottom={0}
            right={0}
            ml="auto"
          />
        </MotionBox>
      </Stack>
    </Stack>
  );
};

export default AboutUs;
