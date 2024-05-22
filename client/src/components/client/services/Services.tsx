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
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import apiServices from "../../../services/index";
import { TimeIcon } from "@chakra-ui/icons";
import DrawerExample from "../drawer/Drawer";

import obrve from "../../../assets/services/obrve.png";
import tretmaniLica from "../../../assets/services/tretmaniLica.png";
import tretmaniTela from "../../../assets/services/tretmaniTela.png";
import masaze from "../../../assets/services/masaze.png";
import manikir from "../../../assets/services/manikir.jpg";
import pedikir from "../../../assets/services/pedikir.jpg";
import { useState } from "react";

// Define the Category interface
interface Category {
  id: string;
  name: string;
  imgUrl?: string;
}

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categoriesPhotos: Record<string, string> = {
    "655bdc45b620146214b756a4": obrve,
    "655bdc45b620146214b756a1": tretmaniLica,
    "655bdc45b620146214b756a2": tretmaniTela,
    "655bdc45b620146214b756a3": masaze,
    "655bdc45b620146214b756a0": manikir,
    "66342998fa8f3d01e191b4ba": pedikir,
  };

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery(["categories"], apiServices.getCategories, {
    select: data => {
      return data.data.map((category: Category) => ({
        ...category,
        imgUrl: categoriesPhotos[category.id] || "https://bit.ly/dan-abramov",
      }));
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Define the category parameter type
  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category.id);
    onOpen();
  };

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center height="100vh">
        <Alert status="error">
          <AlertIcon />
          There was an error processing your request
        </Alert>
      </Center>
    );
  }

  return (
    <Stack
      display="flex"
      direction="column"
      gap="5vh"
      w="full"
      pb={{ base: "15%", sm: "10%" }}
      pt={{ base: "15%", sm: "5%" }}
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
        {categories.map((category, index) => (
          <Stack
            direction="row"
            justifyContent="center"
            gap={5}
            display="flex"
            alignItems="center"
            key={category.id}
          >
            <Box
              position="relative"
              width={{ base: "170px", md: "150px" }}
              height={{ base: "130px", md: "160px" }}
            >
              <Image
                borderRadius="full"
                width="full"
                height="full"
                objectFit="cover"
                src={category.imgUrl}
                alt="service"
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
                  onClick={() => handleCategoryClick(category)}
                />
              </Tooltip>
            </Box>

            <Stack display="flex" direction="column" flexGrow="1" color="black">
              <Text as="b" fontSize={{ base: "xl", md: "2xl" }}>
                {category.name}
              </Text>
              <Text fontSize={{ base: "sm", md: "md" }}>
                Izrazite svoju jedinstvenost kroz naše inovativne manikir
                usluge.
              </Text>
            </Stack>

            {(index + 1) % 3 !== 0 && index !== categories.length - 1 && (
              <Center height="130px" display={{ base: "none", md: "block" }}>
                <Divider orientation="vertical" borderColor="#E9BFC0" />
              </Center>
            )}
          </Stack>
        ))}
      </SimpleGrid>
      <DrawerExample
        isOpen={isOpen}
        onClose={onClose}
        selectedCategory={selectedCategory}
      />
    </Stack>
  );
};

export default Services;
