import {
  SimpleGrid,
  Stack,
  Image,
  Text,
  Divider,
  Box,
  Center,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import apiServices from "../../../services/index";

const Services = () => {
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery(["categories"], apiServices.getCategories);

  console.log(categories);

  return (
    // Passing `columns={[2, null, 3]}` and `columns={{sm: 2, md: 3}}`
    // will have the same effect.
    <Stack display="flex" direction="column" py="135px" gap={20}>
      <Stack display="flex" direction="column">
        <Text fontSize="6xl" color="black">
          Naše usluge
        </Text>
        <Text fontSize="xl" color="black">
          Istražite naš širok spektar profesionalnih usluga
        </Text>
      </Stack>
      <SimpleGrid columns={{ sm: 2, md: 3 }} spacing="40px" alignItems="center">
        {categories?.data?.map((category: { id: number; name: string }) => {
          return (
            <Stack
              direction="row"
              justifyContent="center"
              gap={5}
              display="flex"
              alignItems="center"
            >
              <Image
                borderRadius="full"
                width="150px"
                height="200px"
                src="https://bit.ly/dan-abramov"
                alt="Manikir"
              />
              <Stack
                display="flex"
                direction="column"
                flexGrow="1"
                color="black"
              >
                <Text as="b" fontSize="xl">
                  {category.name}
                </Text>
                <Text fontSize="md">
                  Izrazite svoju jedinstvenost kroz naše inovativne manikir
                  usluge.
                </Text>
              </Stack>

              <Center height="130px">
                <Divider orientation="vertical" borderColor="#E9BFC0" />
              </Center>
            </Stack>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
};

export default Services;
