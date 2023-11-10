import { Box, Text, Spinner, Flex } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query";
import apiServices from "./services/index";


const Home = () => {
    const { data, isLoading, isError } = useQuery(
        ["services"],
        apiServices.getServices
    );

    if (isLoading) {
        return (
            <Flex display={'flex'} justifyContent={'center'} alignItems={'center'} height={'50vh'}>
                <Spinner />
            </Flex>
        );
    }

    if (isError) {
        return <Text>Error</Text>;
    }


    return (
        <Box maxW={{ base: "100%", md: "720px", lg: "1200px" }}/*  bgColor={'#FFF5F5'} */ h={'auto'} bgColor='white'>
            {data?.data?.map((category) => {
                // const { category_name } = category;
                return (
                    <Box key={category.id}><Text fontSize='2xl'>{category.category_name}</Text>
                        {
                            category.category_services.map((usluga) => {
                                return (
                                    <Text>{usluga.name}</Text>
                                )
                            })
                        }
                    </Box>
                )
            })}
        </Box >
    )
}

export default Home
