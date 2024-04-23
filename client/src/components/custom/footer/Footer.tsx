import { useState } from "react";
import {
  Box,
  Text,
  IconButton,
  Img,
  Stack,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import "./Footer.scss";
import logo from "../../../assets/logo.png";
import SimpleMap from "../simpleMap/SimpleMap";

const items = ["Usluge", "O Nama", "Edukacije", "Kontakt"];

export default function Footer() {
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

  return (
    <Box
      as="footer"
      className="footer"
      id="Kontakt"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      backgroundColor="darkBlue"
      paddingY="5%"
      paddingX="7%"
    >
      <Stack
        w="full"
        h="full"
        direction={{ base: "column", md: "row" }}
        spacing={{ base: "40px", md: "unset" }}
      >
        <Stack
          align={{ base: "center", md: "start" }}
          direction="column"
          spacing={10}
          w={{ base: "100%", md: "40%" }}
        >
          <Stack spacing={2} align={{ base: "center", md: "start" }}>
            <Img
              src={logo}
              alt="logo"
              h={{ base: "70px", md: "110px" }}
              cursor="pointer"
            />

            <Text
              fontSize={{ base: "sm", md: "17px" }}
              noOfLines={{ base: 2, md: 1 }}
              color="white"
              textAlign={{ base: "center", md: "start" }}
            >
              Mesto gde vaše lice i telo dobijaju kompletnu negu i lepši izgled
            </Text>
          </Stack>

          <Stack direction="row" spacing={3}>
            <IconButton
              border="1px solid white"
              borderRadius="full"
              isRound={true}
              aria-label="Instagram"
              color="#EFEEED"
              icon={<FaInstagram size={20} />}
              variant="none"
              h="38px"
              minW="38px"
            />
            <IconButton
              border="1px solid white"
              borderRadius="full"
              isRound={true}
              aria-label="Facebook"
              color="#EFEEED"
              icon={<FaFacebookF size={18} />}
              variant="none"
              h="38px"
              minW="38px"
            />
          </Stack>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-around"
          spacing={5}
          w={{ base: "100%", md: "60%" }}
          color="white"
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent={{ base: "space-around", md: "flex-start" }}
            gap={{ base: 7, md: 14 }}
          >
            <Stack direction="column" spacing={5}>
              <Text fontSize="xl">Navigacija</Text>
              <Stack>
                {items.map((item, index) => {
                  const isSelected = selectedIndex === index;
                  return (
                    <Link
                      to={`/${item}`}
                      key={item}
                      style={{
                        color: isSelected ? "#E6888A" : "white",
                      }}
                      onClick={() => setSelectedIndex(index)}
                    >
                      <Text
                        display="block"
                        fontSize="17px"
                        color="currentColor"
                      >
                        {item}
                      </Text>
                    </Link>
                  );
                })}
              </Stack>
            </Stack>

            <Stack direction="column" spacing={5}>
              <Text fontSize="xl">Kontakt</Text>
              <Stack spacing={3}>
                <Stack direction="row" align="center">
                  <Icon as={FaPhone} boxSize={5} />
                  <Text fontSize="17px"> +381 61 3931 281</Text>
                </Stack>
                <Stack direction="row" align="center">
                  <Icon as={FaLocationDot} boxSize={5} />
                  <Text fontSize="17px">Ljubomira Nikolića 15, Niš</Text>
                </Stack>
              </Stack>
            </Stack>
          </Box>

          <Stack direction="column" spacing={5} justify="center">
            <SimpleMap />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
