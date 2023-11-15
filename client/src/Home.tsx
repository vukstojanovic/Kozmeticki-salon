import { Box, Text, Spinner, Flex, Grid, Img } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query";
import apiServices from "./services/index";
import beauty from '../src/assets/Beauty-Salon.jpg'


const Home = () => {
    const { data, isLoading, isError } = useQuery(
        ["services"],
        apiServices.getServices
    );

    console.log(data);


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
        <Box maxW={{ base: "100%", md: "720px", lg: "1200px" }} h={'auto'} bgColor='white' paddingTop={{ base: '0', md: '100px' }} >
            <Img src={beauty} alt='logo' h={'full'} opacity='80%' px={{ base: "0", md: '0' }} display={{ base: 'block', md: 'none' }} />
            {data?.data?.map((category) => {
                return (
                    <Box paddingBottom='50px' px={{ base: "10px", md: '0' }}>
                        <Text fontSize='4xl' color='rgb(145,1,57)' paddingBottom='20px'>{category.category_name}</Text>
                        <Grid key={category.id} templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}>
                            {
                                category.category_services.map((usluga) => {
                                    return (
                                        <Flex fontSize='xl' textAlign='center' paddingBottom='20px' justifyContent={{ base: "space-between", md: "normal" }} gap='10px' flexDirection={{ base: 'row', md: 'column' }}>
                                            <Text paddingBottom='5px' fontFamily='cursive' fontWeight={"semibold"} color='blackAlpha.800'>{usluga.name}</Text>
                                            <Text>{usluga.price} din.</Text>
                                        </Flex>
                                    )
                                })
                            }
                        </Grid>
                    </Box>
                )
            })}
        </Box >
    )
}

export default Home


