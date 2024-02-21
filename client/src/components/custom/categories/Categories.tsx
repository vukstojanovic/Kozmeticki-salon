import { Box, Text, Flex, Grid, Img, Spinner } from "@chakra-ui/react";
import apiServices from "../../../services/index";
import { useQuery } from "@tanstack/react-query";
import beauty from "../src/assets/Beauty-Salon.jpg";

function Categories() {
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery(["categories"], apiServices.getCategories);

  const {
    data: servicesData,
    isLoading: servicesLoading,
    isError: servicesError,
  } = useQuery(["services"], apiServices.getServices); //usluge

  if (servicesLoading || categoriesLoading) {
    return (
      <Flex
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"50vh"}
      >
        <Spinner />
      </Flex>
    );
  }

  if (servicesError || categoriesError) {
    return <Text>Error</Text>;
  }

  const filteredServices = servicesData?.data.filter(service =>
    categoriesData?.data.some(category => category.id === service.category_id)
  );

  return (
    <Grid
      maxW={{ base: "100%", md: "720px", lg: "1200px" }}
      h={"auto"}
      // paddingTop={{ base: "0", md: "100px" }}
    >
      <Img
        src={beauty}
        alt="logo"
        h={"full"}
        opacity="80%"
        px={{ base: "0", md: "0" }}
        display={{ base: "block", md: "none" }}
      />
      {categoriesData?.data?.map(category => {
        return (
          <>
            <Box
              key={category.id}
              paddingBottom={{ base: "10px", md: "50px" }}
              px={{ base: "10px", md: "0" }}
            >
              <Text fontSize="4xl" color="rgb(145,1,57)" paddingBottom="20px">
                {category.name}
              </Text>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(3, 1fr)",
                }}
                gap="15px"
              >
                {filteredServices
                  ?.filter(service => service.category_id === category.id)
                  .map(filteredService => (
                    <Flex
                      key={filteredService.id}
                      fontSize="xl"
                      paddingBottom="20px"
                      justifyContent={{ base: "space-between", md: "normal" }}
                      gap="10px"
                      flexDirection={{ base: "row", md: "column" }}
                    >
                      <Text
                        paddingBottom="5px"
                        fontFamily="monospace"
                        fontWeight={"semibold"}
                        color="blackAlpha.800"
                      >
                        {filteredService.name}
                      </Text>
                      <Text>{filteredService.price} din.</Text>
                    </Flex>
                  ))}
              </Grid>
            </Box>
          </>
        );
      })}
    </Grid>
  );
}

export default Categories;
