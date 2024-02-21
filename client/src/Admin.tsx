
import { Flex, Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdCategory } from "react-icons/md";
import { FaServicestack } from "react-icons/fa";
import { FcBusinesswoman } from "react-icons/fc";
import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import CategoryAdmin from "./CategoryAdmin";
import ServicesAdmin from "./ServicesAdmin";
import WorkersAdmin from "./WorkersAdmin";

// const createNewCategory

const Admin = () => {
    return (
        // <Flex
        //     bg="blue.500"
        //     p={3}
        //     flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
        //     justifyContent='space-between'
        // >
        //     <Link to="/category-admin">
        //         <Flex maxH={{ base: "50px", md: "170px", lg: "170px" }} maxW={{ md: "200px", lg: "330px" }} width="350px" height="150px" bg="green.400" alignItems='center' justifyContent='space-between' px='10px' borderRadius='10px' _hover={{
        //             opacity: "0.8",
        //         }}>
        //             <Text fontSize='2xl' color='white'> Categories</Text> <MdCategory size='40px' color="white" />
        //         </Flex>
        //     </Link>

        //     <Link to="/services-admin">
        //         <Flex maxH={{ base: "50px", md: "170px", lg: "170px" }} maxW={{ md: "200px", lg: "330px" }} width="350px" height="150px" bg="orange.400" alignItems='center' justifyContent='space-between' px='10px' borderRadius='10px' _hover={{
        //             opacity: "0.8",
        //         }}>
        //             <Text fontSize='2xl' color='white'>Services</Text><FaServicestack size='40px' color="white" />
        //         </Flex>
        //     </Link>
        //     <Link to="/workers-admin">
        //         <Flex maxH={{ base: "50px", md: "170px", lg: "170px" }} maxW={{ md: "200px", lg: "330px" }} width="350px" height="150px" bg="purple.300" alignItems='center' justifyContent='space-between' px='10px' borderRadius='10px' _hover={{
        //             opacity: "0.8",
        //         }}>
        //             <Text fontSize='2xl' color='white'>Workers</Text> <FcBusinesswoman size='40px' color="white" />
        //         </Flex>
        //     </Link>
        //     <MySelect />
        // </Flex>
        <Tabs size='md' variant='enclosed' display='flex'>
            <TabList display='flex' flexDirection='column' >
                <Tab>Calendar</Tab>
                <Tab>Categories & Services</Tab>
                <Tab>Workers</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <p>Calendar</p>
                </TabPanel>
                <TabPanel>
                    <CategoryAdmin />
                </TabPanel>
                <TabPanel>
                    <WorkersAdmin />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default Admin;