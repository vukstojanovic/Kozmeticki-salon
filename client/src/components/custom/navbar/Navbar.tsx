import { useState } from "react";
import {
  Box,
  Img,
  Stack,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";

import logo from "../../../assets/logo.png";
import Links from "./links/Links";
import { HamburgerIcon } from "@chakra-ui/icons";
import Sidebar from "../sidebar/Sidebar";

export default function Navbar() {
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box position="absolute" minW="100vw">
      <Stack
        direction={"row"}
        align={"center"}
        justify="space-between"
        px={{ base: "5%", md: "3%" }}
        py={{ base: "3%", md: "1%" }}
      >
        <Img
          src={logo}
          alt="logo"
          h={{ base: "70px", md: "112px" }}
          cursor="pointer"
          onClick={() => setSelectedIndex(null)}
        />
        {isLargerThan768 ? (
          <Links
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        ) : (
          <HamburgerIcon boxSize={6} onClick={onOpen} />
        )}
      </Stack>
      <Sidebar
        isOpen={isOpen}
        onClose={onClose}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </Box>
  );
}
