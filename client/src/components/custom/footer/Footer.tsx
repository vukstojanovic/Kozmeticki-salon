import React from "react";
import "./Footer.scss";
import { Box, Divider, IconButton, Stack, Text } from "@chakra-ui/react";

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
      justifyContent="space-around"
      backgroundColor="darkBlue"
    >
      <Stack direction="column" justify="center" align="center" spacing={5}>
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
      {/* <SimpleMap /> */}
    </Box>
  );
}
