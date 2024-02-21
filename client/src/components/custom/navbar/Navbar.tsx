import { Box, Button, Img, Stack, useDisclosure } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";

import DrawerExample from "../drawer/Drawer";
import logo from "../../../assets/logo.png";
import Links from "./links/Links";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box position="absolute" minW="100vw">
      <Stack
        direction={"row"}
        align={"center"}
        justify="space-between"
        px="3%"
        py="1%"
      >
        <Img src={logo} alt="logo" h="112px" />
        <Links />
        <Button leftIcon={<TimeIcon />} colorScheme="red" onClick={onOpen}>
          Zakaži termin
        </Button>
      </Stack>
      <DrawerExample isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Box>
  );
}
