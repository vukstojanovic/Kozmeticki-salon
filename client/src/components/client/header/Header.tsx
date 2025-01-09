import { Box, Stack, Heading, Text, Button } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import "./Header.scss";

import Navbar from "../navbar/Navbar";

// Animacije za framer-motion
const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

interface HeaderProps {
  onOpen: () => void;
}

export default function Header({ onOpen }: HeaderProps) {
  return (
    <MotionBox
      className="header"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Navbar />
      <Stack
        h="100%"
        justify={{ base: "start", md: "center" }}
        alignItems="start"
        ml={{ base: "3%", md: "5%" }}
        mt={{ base: "30vh", md: "unset" }}
        spacing={0}
      >
        <MotionHeading
          fontSize={{ base: "44px", md: "80px" }}
          noOfLines={1}
          color="default"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Beauty Corner
        </MotionHeading>
        <MotionText
          fontSize={{ base: "13px", md: "xl" }}
          noOfLines={{ base: 2, md: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Mesto gde vaše lice i telo dobijaju kompletnu negu i lepši izgled
        </MotionText>
        <MotionButton
          leftIcon={<TimeIcon fontSize={{ base: "18px", md: "22px" }} />}
          variant="blue"
          onClick={onOpen}
          fontSize={{ base: "16px", md: "17px" }}
          size={{ base: "sm", md: "md" }}
          mt={5}
          boxShadow="xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Zakaži termin
        </MotionButton>
      </Stack>
    </MotionBox>
  );
}
