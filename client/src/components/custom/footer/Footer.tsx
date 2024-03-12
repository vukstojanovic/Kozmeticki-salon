import React from "react";
import "./Footer.scss";
import { Box, IconButton, Stack } from "@chakra-ui/react";

import { FaInstagram, FaFacebookF } from "react-icons/fa";
import Links from "../navbar/links/Links";

export default function Footer() {
  return (
    <Box as="footer" className="footer">
      <Stack direction="column" justify="center" align="center" spacing={5}>
        <Stack direction="row">
          <IconButton
            aria-label="Instagram"
            fontSize="30px"
            color="#000000"
            icon={<FaInstagram />}
            isRound={true}
            variant="none"
          />
          <IconButton
            aria-label="Facebook"
            fontSize="30px"
            color="#000000"
            icon={<FaFacebookF />}
            isRound={true}
            variant="none"
          />
        </Stack>
        <Links color="#000000" />
      </Stack>
    </Box>
  );
}
