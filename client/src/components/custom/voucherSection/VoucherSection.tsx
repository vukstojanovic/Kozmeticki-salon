import { Stack, Image, Text } from "@chakra-ui/react";
import vaucher from "../../../assets/vaucer.png";

const VaucherSection = () => {
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      alignItems="center"
      justifyContent="space-around"
      width="full"
      zIndex={1}
      height={{ base: "100%", md: "250px" }}
      backgroundColor="darkBlue"
      paddingY={{ base: "5%", md: "0px" }}
    >
      <Stack
        direction="column"
        gap={0}
        zIndex={1}
        alignItems={{ base: "center", md: "start" }}
        paddingX={{ base: "5%", md: "0px" }}
      >
        <Text fontSize={{ base: "4xl", md: "6xl" }} color="lightGrey">
          Poklon vaučer
        </Text>
        <Text
          fontSize="16px"
          color="lightGrey"
          textAlign={{ base: "center", md: "start" }}
        >
          Iznenadite one koje volite poklon vaučerom za neku od usluga u našem
          salonu.
        </Text>
      </Stack>

      <Image
        src={vaucher}
        alt="Vaucher"
        height={{ base: "260px", md: "350px" }}
      />
    </Stack>
  );
};

export default VaucherSection;
