import { Box, Heading, Text, Stack } from "@chakra-ui/react";
import "./Header.scss";

import Navbar from "../navbar/Navbar";

export default function Header() {
  return (
    <Box className="header">
      <Navbar />
      <Stack h="100%" justify="center" ml="5%">
        <Text fontSize={32}>Welcome to</Text>
        <Heading as="h1" size="4xl" noOfLines={1} color="#E9BFC0">
          Beauty Corner
        </Heading>
        <Text fontSize="2xl">
          Mesto gde vaše lice i telo dobijaju kompletnu negu i lepši izgled
        </Text>
      </Stack>
    </Box>
  );
}
