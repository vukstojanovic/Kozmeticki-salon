import {
  Box,
  Text,
  IconButton,
  Img,
  Stack,
  Icon,
  Button,
} from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";

import "./Footer.scss";
import logo from "../../../assets/logo.png";
import SimpleMap from "../simpleMap/SimpleMap";

const items = ["O Nama", "Usluge"];

const MotionButton = motion(Button);

interface FooterProps {
  onOpen: () => void;
}

export default function Footer({ onOpen }: FooterProps) {
  const handleLinkClick = (index: number, elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      id="kontakt"
      as="footer"
      className="footer"
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
          spacing={6}
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

          <Stack
            direction={{ base: "row", md: "column" }}
            align={{ base: "center", md: "start" }}
            spacing={{ base: 8, md: 6 }}
          >
            <Stack direction="row" spacing={3}>
              <Link
                to="https://www.instagram.com/beauty_corner__marija/"
                color="white"
              >
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
              </Link>
              <Link
                to="https://m.facebook.com/p/Kozmeti%C4%8Dki-salon-Beauty-Corner-100064815321266/"
                color="white"
              >
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
              </Link>
            </Stack>

            <MotionButton
              leftIcon={<TimeIcon fontSize={{ base: "18px", md: "22px" }} />}
              variant="transparent"
              border={"1px solid white"}
              onClick={onOpen}
              fontSize={{ base: "15px", md: "17px" }}
              size={{ base: "sm", md: "md" }}
              boxShadow="xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Zakaži termin
            </MotionButton>
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
                  const elementId = item.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.2,
                        duration: 0.5,
                      }}
                    >
                      <Text
                        as="button"
                        onClick={() => handleLinkClick(index, elementId)}
                      >
                        {item}
                      </Text>
                    </motion.div>
                  );
                })}
              </Stack>
            </Stack>

            <Stack direction="column" spacing={5}>
              <Text fontSize="xl">Kontakt</Text>
              <Stack spacing={3}>
                <Stack direction="row" align="center">
                  <Icon as={FaPhone} boxSize={{ base: "4", md: "5" }} />
                  <Text fontSize="16px" as="a" href="tel:+381613931281">
                    +381 61 3931 281
                  </Text>
                </Stack>
                <Stack direction="row" align="center">
                  <Icon as={FaLocationDot} boxSize={{ base: "4", md: "5" }} />
                  <Text fontSize="16px">Ljubomira Nikolića 15, Niš</Text>
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
