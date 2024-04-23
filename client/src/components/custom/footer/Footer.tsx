import React from "react";
import "./Footer.scss";
import {
  Box,
  Divider,
  Heading,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";

import { FaInstagram, FaFacebookF } from "react-icons/fa";
import Links from "../navbar/links/Links";
import SimpleMap from "../simpleMap/SimpleMap";

export default function Footer() {
  return (
    <Box
      as="footer"
      className="footer"
      id="Kontakt"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      backgroundColor="darkBlue"
    >
      <Stack w="full" direction="row" justify="space-between" align="center">
        <Stack direction="column" justify="center" align="center" spacing={5}>
          <Heading>Edukacije</Heading>

          <Stack direction="row">
            <IconButton
              aria-label="Instagram"
              fontSize="30px"
              color="#EFEEED"
              icon={<FaInstagram />}
              isRound={true}
              variant="none"
            />
            <IconButton
              aria-label="Facebook"
              fontSize="30px"
              color="#EFEEED"
              icon={<FaFacebookF />}
              isRound={true}
              variant="none"
            />
          </Stack>
        </Stack>
        <Stack direction="column" justify="center" align="center" spacing={5}>
          <Heading>Follow us</Heading>

          <Stack direction="row">
            <IconButton
              aria-label="Instagram"
              fontSize="30px"
              color="#EFEEED"
              icon={<FaInstagram />}
              isRound={true}
              variant="none"
            />
            <IconButton
              aria-label="Facebook"
              fontSize="30px"
              color="#EFEEED"
              icon={<FaFacebookF />}
              isRound={true}
              variant="none"
            />
          </Stack>
        </Stack>
        <Stack direction="column" justify="center" align="center" spacing={5}>
          <Heading>Lokacija</Heading>
          <SimpleMap />
        </Stack>
      </Stack>
    </Box>
  );
}
