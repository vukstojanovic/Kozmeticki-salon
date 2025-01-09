import { Stack, Text, Box, Icon, Divider } from "@chakra-ui/react";
import { CiClock2 } from "react-icons/ci";
import { GoCircleSlash } from "react-icons/go";
import { motion } from "framer-motion";

import cover from "../../../assets/cover.png";

const MotionBox = motion(Box);

const WorkHoursSection = () => {
  return (
    <Stack
      display="flex"
      spacing={0}
      direction="column"
      w="full"
      bgImage={cover}
      bgSize="cover"
      bgPosition={{ base: "left", md: "center" }}
      bgRepeat="no-repeat"
      h="400px"
      position="relative"
      marginTop={{ base: "100px", md: "unset" }}
    >
      <MotionBox
        w={{ base: "250px", md: "350px" }}
        h={{ base: "300px", md: "400px" }}
        bg="white"
        position="absolute"
        right={{ base: 0, md: "10%" }}
        left={{ base: 0, md: "unset" }}
        top="-30%"
        borderRadius="10px"
        border="0.5px solid lightGrey"
        p="2%"
        boxShadow="xl"
        marginRight={{ base: "auto", md: "unset" }}
        marginLeft={{ base: "auto", md: "unset" }}
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
      >
        <Stack
          justify="space-around"
          height="full"
          align="center"
          color="black"
          h="full"
        >
          <Stack justify="center" align="center">
            <Icon as={CiClock2} boxSize="45px" />
            <Text display="block" fontSize="xl" as="b" color="currentColor">
              Radno Vreme
            </Text>
          </Stack>
          <Stack direction="column" alignItems="center" gap={8} zIndex={1}>
            <Stack direction="column" gap={5} alignItems="center">
              <Stack direction="column" spacing={1}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  w="100%"
                  px={2}
                >
                  <Text fontSize={{ base: "md", md: "lg" }} fontWeight="medium">
                    Radnim danima
                  </Text>
                  <Text fontSize={{ base: "md", md: "lg" }}>09h - 20h</Text>
                </Stack>
                <Divider
                  orientation="vertical"
                  borderWidth="1px"
                  w={{ base: "200px", md: "280px" }}
                />
              </Stack>

              <Stack direction="column" spacing={1}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  w="100%"
                  px={2}
                >
                  <Text fontSize={{ base: "md", md: "lg" }} fontWeight="medium">
                    Subota
                  </Text>
                  <Text fontSize={{ base: "md", md: "lg" }}>09h - 16h</Text>
                </Stack>
                <Divider
                  orientation="vertical"
                  borderWidth="1px"
                  w={{ base: "200px", md: "280px" }}
                />
              </Stack>

              <Stack direction="column" spacing={1}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  w="100%"
                  px={2}
                >
                  <Text fontSize={{ base: "md", md: "lg" }} fontWeight="medium">
                    Nedelja
                  </Text>
                  <GoCircleSlash fontSize="20px" />
                </Stack>
                <Divider
                  orientation="vertical"
                  borderWidth="1px"
                  w={{ base: "200px", md: "280px" }}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </MotionBox>
    </Stack>
  );
};

export default WorkHoursSection;
