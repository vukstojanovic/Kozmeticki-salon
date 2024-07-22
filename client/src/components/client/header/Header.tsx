import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import React, { Suspense, lazy } from "react";
import "./Header.scss";

const Navbar = lazy(() => import("../navbar/Navbar"));
const DrawerExample = lazy(() => import("../drawer/Drawer"));

interface MemoizedStackProps {
  onOpen: () => void;
}

const MemoizedStack = React.memo(({ onOpen }: MemoizedStackProps) => (
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
    <Text fontSize={{ base: "md", md: "xl" }} noOfLines={{ base: 2, md: 1 }}>
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
));

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box className="header">
      <Suspense fallback={<Spinner size="lg" />}>
        <Navbar />
      </Suspense>

      <MemoizedStack onOpen={onOpen} />

      <Suspense fallback={<Spinner size="lg" />}>
        <DrawerExample isOpen={isOpen} onClose={onClose} />
      </Suspense>
    </Box>
  );
}
