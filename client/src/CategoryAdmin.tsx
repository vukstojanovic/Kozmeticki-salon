import apiServices from "./services";
import {
    Button,
    Text,
    Spinner,
    Flex,
    Box,
    useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import EditDeleteCategory from "./EditDeleteCategory";
import EditDeleteService from "./EditDeleteService";
import AddCategoryModal from "./AddCategoryModal";
import AddServiceModal from "./AddServiceModal";

export default function CategoryAdmin() {
    const {
        data: categoriesData,
        isLoading: categoriesLoading,
        isError: categoriesError,
    } = useQuery(["categories"], apiServices.getCategories);

    const {
        data: servicesData,
        isLoading: servicesLoading,
        isError: servicesError,
    } = useQuery(["services"], apiServices.getServices);

    const {
        isOpen: isAddCategoryOpen,
        onOpen: onAddCategoryOpen,
        onClose: onAddCategoryClose,
    } = useDisclosure();

    const {
        isOpen: isAddServiceOpen,
        onOpen: onAddServiceOpen,
        onClose: onAddServiceClose,
    } = useDisclosure();

    if (categoriesLoading) {
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

    if (categoriesError) {
        return <Text>Error</Text>;
    }

    return (
        <Box margin="auto">
            <Box display="flex" justifyContent="space-evenly" mb='40px'>

                <Button onClick={onAddCategoryOpen} w='25%' borderRadius='3xl' fontWeight='thin' boxShadow='dark-lg'>New Category</Button>


                <Button onClick={onAddServiceOpen} w='25%' borderRadius='3xl' fontWeight='thin' boxShadow='dark-lg'>New Service</Button>

            </Box>
            {categoriesData?.data.map((category) => (
                <Box key={category.id}>
                    <EditDeleteCategory {...category} />
                    {servicesData?.data
                        .filter((service) => service.category_id === category.id)
                        .map((service) => (
                            <EditDeleteService key={service.id} {...service} />
                        ))}
                </Box>
            ))}
            <AddCategoryModal
                isOpen={isAddCategoryOpen}
                onClose={onAddCategoryClose}
            />
            <AddServiceModal isOpen={isAddServiceOpen} onClose={onAddServiceClose} />
        </Box>
    );
}
