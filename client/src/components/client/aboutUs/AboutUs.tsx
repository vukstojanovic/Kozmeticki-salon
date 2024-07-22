import { Stack, Image, Text, Box, Heading } from "@chakra-ui/react";
import section111 from "../../../assets/section111.png";

const AboutUs = () => {
  return (
    <Stack
      id="o-nama"
      display="flex"
      direction="row"
      gap="5vh"
      w="full"
      pt={{ base: "15%", sm: "5%" }}
      pb={{ base: "0", sm: "5%" }}
      px="7%"
      position="relative"
      zIndex={1}
    >
      <Stack
        display="flex"
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 0, md: 3 }}
      >
        <Box
          zIndex={1}
          width={{ base: "100%", md: "50%" }}
          gap="5vh"
          display="flex"
          flexDirection="column"
        >
          <Heading variant={{ base: "customH2Mob", md: "customH2" }}>
            O Nama
          </Heading>
          <Stack fontSize={{ base: "15px", md: "xl" }}>
            <Text color="blue">
              Naš posao je naša strast – uvek smo spremni da mu poklonimo
              posebnu pažnju, učimo, napredujemo, a sve u cilju zadovoljstva
              naših klijenata.
            </Text>
            <Text color="blue">
              Sa početkom karijere 2011. godine, naša vlasnica Marija
              Grozdanović je počela svoju avanturu u svetu kozmetike. Kroz rad u
              različitim salonima, stekla je bogato iskustvo koje je 2016.
              godine pretvorila u ostvarenje sna - otvaranje sopstvenog salona.
            </Text>
            <Text color="blue">
              Prateći trendove u industriji lepote, danas klijentima možemo da
              ponudimo širok spektar usluga: manikir, pedikir, tretmane lica,
              trajnu šminku obrva, masaže. Posvećeni smo pružanjem vrhunske nege
              svojim klijentima, čineći svaki trenutak pravim uživanjem za čula
              i dušu.
            </Text>
            <Text color="blue">
              Beauty Corner je mesto gde vaše lice i telo dobijaju kompletnu
              negu i lepši izgled.
            </Text>
          </Stack>
        </Box>
        <Box>
          <Image
            objectFit="cover"
            src={section111}
            alt="section111"
            width={{ base: "120%", md: "60%" }}
            object-position="bottom"
            zIndex={1}
            position={{ base: "relative", md: "absolute" }}
            bottom={0}
            right={0}
            ml="auto"
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default AboutUs;
