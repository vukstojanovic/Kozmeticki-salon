import { Box, useDisclosure, Spinner, Stack } from "@chakra-ui/react";
import { Suspense, lazy } from "react";
import { TimeIcon } from "@chakra-ui/icons";
import "./Header.scss";

import DrawerExample from "../drawer/Drawer";
import Navbar from "../navbar/Navbar";

const Heading = lazy(() =>
  import("@chakra-ui/react").then(module => ({ default: module.Heading }))
);
const Text = lazy(() =>
  import("@chakra-ui/react").then(module => ({ default: module.Text }))
);
const Button = lazy(() =>
  import("@chakra-ui/react").then(module => ({ default: module.Button }))
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box className="header">
      <Navbar />
      <Suspense fallback={<Spinner size="lg" />}>
        <Stack
          h="100%"
          justify={{ base: "start", md: "center" }}
          alignItems="start"
          ml={{ base: "3%", md: "5%" }}
          mt={{ base: "30vh", md: "unset" }}
          spacing={0}
        >
          <Heading
            fontSize={{ base: "42px", md: "80px" }}
            noOfLines={1}
            color="default"
          >
            Beauty Corner
          </Heading>
          <Text
            fontSize={{ base: "md", md: "xl" }}
            noOfLines={{ base: 2, md: 1 }}
          >
            Mesto gde vaše lice i telo dobijaju kompletnu negu i lepši izgled
          </Text>
          <Button
            leftIcon={<TimeIcon fontSize={{ base: "18px", md: "22px" }} />}
            variant="blue"
            onClick={onOpen}
            fontSize={{ base: "15px", md: "17px" }}
            size={{ base: "sm", md: "md" }}
            mt={5}
            boxShadow="xl"
          >
            Zakaži termin
          </Button>
        </Stack>
      </Suspense>
      <DrawerExample isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
