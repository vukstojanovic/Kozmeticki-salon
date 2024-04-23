import {
  SimpleGrid,
  Stack,
  Image,
  Text,
  Divider,
  Box,
  Center,
  IconButton,
  useDisclosure,
  Tooltip,
  Heading,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import apiServices from "../../../services/index";

import manicure from "../../../assets/manicure.png";
import { TimeIcon } from "@chakra-ui/icons";
import DrawerExample from "../drawer/Drawer";

const Services = () => {
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery(["categories"], apiServices.getCategories);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack
      display="flex"
      direction="column"
      gap="5vh"
      w="full"
      py={{ base: "15%", sm: "5%" }}
      px="7%"
      position="relative"
    >
      <Stack display="flex" direction="column" spacing={{ base: 0, md: 3 }}>
        <Heading
          variant={{ base: "customH2Mob", md: "customH2" }}
          lineHeight="52px"
        >
          Usluge
        </Heading>
        <Text fontSize={{ base: "15px", md: "xl" }} color="black">
          Istražite naš širok spektar profesionalnih usluga
        </Text>
      </Stack>
      <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 3 }}
        spacing="40px"
        alignItems="center"
        justifyContent="center"
      >
        {categories?.data?.map(
          (category: { id: string; name: string }, index: number) => {
            return (
              <Stack
                direction="row"
                justifyContent="center"
                gap={5}
                display="flex"
                alignItems="center"
              >
                <Box
                  position="relative"
                  width={{ base: "170px", md: "130px" }}
                  height={{ base: "130px", md: "160px" }}
                >
                  <Image
                    borderRadius="full"
                    width={{ base: "full", md: "full" }}
                    height={{ base: "full", md: "full" }}
                    objectFit="cover"
                    src={manicure}
                    alt="Manicure"
                  />

                  <Tooltip
                    label="Zakaži termin"
                    fontSize="md"
                    color="white"
                    display={{ base: "none", md: "block" }}
                  >
                    <IconButton
                      position="absolute"
                      right={0}
                      bottom={0}
                      isRound={true}
                      variant="blue"
                      aria-label="Done"
                      fontSize="18px"
                      icon={<TimeIcon />}
                      onClick={onOpen}
                    />
                  </Tooltip>
                </Box>

                <Stack
                  display="flex"
                  direction="column"
                  flexGrow="1"
                  color="black"
                >
                  <Text as="b" fontSize={{ base: "xl", md: "2xl" }}>
                    {category.name}
                  </Text>
                  <Text fontSize={{ base: "sm", md: "md" }}>
                    Izrazite svoju jedinstvenost kroz naše inovativne manikir
                    usluge.
                  </Text>
                </Stack>

                {(index + 1) % 3 !== 0 &&
                  index !== categories?.data.length - 1 && (
                    <Center
                      height="130px"
                      display={{ base: "none", md: "block" }}
                    >
                      <Divider orientation="vertical" borderColor="#E9BFC0" />
                    </Center>
                  )}
              </Stack>
            );
          }
        )}
      </SimpleGrid>
      <DrawerExample isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};

export default Services;
