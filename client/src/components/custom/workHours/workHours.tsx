import { Stack, Text, Image, Divider } from "@chakra-ui/react";
import { GoCircleSlash } from "react-icons/go";
import clock from "../../../assets/clock.png";

const WorkHours = () => {
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      padding={{ base: "5%", md: 0 }}
      height={{ base: "400px", md: "250px" }}
      alignItems="center"
      justifyContent="space-around"
      width="full"
      zIndex={1}
      backgroundColor="darkBlue"
      position="relative"
    >
      <Image
        src={clock}
        alt="Vaucher"
        h={{ base: "30%", md: "165%" }}
        position="absolute"
        opacity={0.1}
        top={{ base: 5, md: "unset" }}
        left={{ base: 5, md: 10 }}
        transform={{ base: "rotate(90deg)", md: "rotate(-60deg)" }}
      />
      <Stack direction="column" gap={0} zIndex={1} alignItems="start">
        <Text fontSize={{ base: "4xl", md: "6xl" }} color="lightGrey">
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
              textTransform="uppercase"
            >
              <Text
                fontSize={{ base: "md", md: "xl" }}
                fontWeight="medium"
                color="white"
              >
                Radnim danima
              </Text>
              <Text fontSize={{ base: "md", md: "xl" }} color="white">
                09h - 20h
              </Text>
            </Stack>
            <Divider
              orientation="vertical"
              borderColor="white"
              borderWidth="0.5px"
              w={{ base: "300px", md: "400px" }}
            />
          </Stack>

          <Stack direction="column" spacing={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              w="100%"
              px={2}
              textTransform="uppercase"
            >
              <Text
                fontSize={{ base: "md", md: "xl" }}
                fontWeight="medium"
                color="white"
              >
                Subota
              </Text>
              <Text fontSize={{ base: "md", md: "xl" }} color="white">
                09h - 16h
              </Text>
            </Stack>
            <Divider
              orientation="vertical"
              borderColor="white"
              borderWidth="0.5px"
              w={{ base: "300px", md: "400px" }}
            />
          </Stack>

          <Stack direction="column" spacing={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              w="100%"
              px={2}
              textTransform="uppercase"
            >
              <Text
                fontSize={{ base: "md", md: "xl" }}
                fontWeight="medium"
                color="white"
              >
                Nedelja
              </Text>
              <GoCircleSlash color="white" fontSize="20px" />
            </Stack>
            <Divider
              orientation="vertical"
              borderColor="white"
              borderWidth="0.5px"
              w={{ base: "300px", md: "400px" }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default WorkHours;
