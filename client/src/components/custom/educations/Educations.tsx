import {
  Stack,
  Text,
  Heading,
  Box,
  Grid,
  GridItem,
  Icon,
} from "@chakra-ui/react";
import { GiGraduateCap } from "react-icons/gi";

import balkanKozmetik from "../../../assets/balkanKozmetik.jpg";
import edukacije1 from "../../../assets/edukacije1.jpg";
import edukacije2 from "../../../assets/edukacije2.jpg";
import edukacije3 from "../../../assets/edukacije3.jpg";

const Educations = () => {
  return (
    <Stack
      display="flex"
      direction="column"
      gap="5vh"
      w="full"
      py={{ base: "15%", sm: "5%" }}
      px="7%"
    >
      <Box flexGrow={1}>
        <Heading variant={{ base: "customH2Mob", md: "customH2" }}>
          Edukacije
        </Heading>
        <Text fontSize={{ base: "15px", md: "xl" }} color="darkBlue">
          Edukacija namenjena kako izgradjenim majstorima tako i početnicima.
        </Text>
      </Box>

      <Grid
        h="75vh"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
      >
        <GridItem
          rowSpan={{ base: 2, md: 2 }}
          colSpan={{ base: 8, md: 2 }}
          bgImage={balkanKozmetik}
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
        />
        <GridItem
          colSpan={2}
          display={{ base: "none", md: "block" }}
          bgImage={edukacije1}
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
        />
        <GridItem
          colSpan={2}
          display={{ base: "none", md: "block" }}
          bgImage={edukacije2}
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
        />
        <GridItem
          colSpan={2}
          display={{ base: "none", md: "block" }}
          bgImage={edukacije3}
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
        />
        <GridItem
          colSpan={{ base: 8, md: 2 }}
          bg="default"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={{ base: 0, md: 3 }}
        >
          <Icon as={GiGraduateCap} boxSize="100px" />
          <Text
            fontSize={{ base: "15px", md: "xl" }}
            textAlign={{ base: "center", md: "start" }}
            p={{ base: 2, md: 0 }}
            color="white"
            as="b"
          >
            Uz svaku edukaciju se dobija sertifikat o zavrsnoj obuci!
          </Text>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default Educations;
