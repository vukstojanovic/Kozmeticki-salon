import { useMemo, useState } from "react";
import apiServices from "../../../../services";
import {
  Text,
  Spinner,
  Flex,
  Box,
  useDisclosure,
  Stack,
  IconButton,
  Divider,
  Button,
  Icon,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import EditServiceModal from "../../modals/EditServiceModal";
import AddCategoryModal from "../../modals/AddCategoryModal";
import AddServiceModal from "../../modals/AddServiceModal";
import DeleteServiceModal from "../../modals/DeleteServiceModal";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import { IoMdAdd } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Category, Service } from "../../../../services";

export default function CategoriesAdmin() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

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

  const {
    isOpen: isEditServiceOpen,
    onOpen: onEditServiceOpen,
    onClose: onEditServiceClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteServiceOpen,
    onOpen: onDeleteServiceOpen,
    onClose: onDeleteServiceClose,
  } = useDisclosure();

  const handleAddService = (category: Category | null) => {
    setSelectedCategory(category);
    onAddServiceOpen();
  };

  // const handleDeleteService = (service: Service) => {
  //   setActiveService(service);
  //   onDeleteServiceOpen();
  // };

  const handleEditService = (service: Service, category: Category) => {
    setSelectedService(service);
    setSelectedCategory(category);
    onEditServiceOpen();
  };

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
    <Stack spacing={5}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        backgroundColor="white"
        py={2}
        px={3}
        borderRadius="md"
        boxShadow="md"
      >
        <Text fontSize="xl" as="b">
          Usluge
        </Text>
        <Stack direction="row">
          <Stack direction="row">
            <Divider orientation="vertical" />
            <IconButton
              isRound={true}
              variant="solid"
              colorScheme="blue"
              bgColor="#343A59"
              aria-label="Done"
              fontSize="20px"
              icon={<IoMdAdd color="F0EFED" />}
              onClick={() => onAddServiceOpen()}
            />
          </Stack>
        </Stack>
      </Box>
      {categoriesData?.data.map(category => (
        <TableContainer marginBlock="20px" key={category.id}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th p={6} pl={3} fontSize="xl">
                  {category.name}
                </Th>
              </Tr>
              <Tr>
                <Th>Ime Usluge</Th>
                <Th>Trajanje</Th>
                <Th>Cena</Th>
                <Th>Radnici</Th>
              </Tr>
            </Thead>
            <Tbody>
              {servicesData?.data
                .filter(service => service.category_id === category.id)
                .map(service => (
                  <Tr key={service.id} _hover={{ bgColor: "#ebedf0" }}>
                    <Td width={500}>{service.name}</Td>
                    <Td>{service.time_in_minutes} min</Td>
                    <Td>{service.price} rsd</Td>
                    <Td>
                      <Avatar
                        size="sm"
                        name="Segun Adebayo"
                        src="https://bit.ly/sage-adebayo"
                      />
                    </Td>
                    <Td isNumeric>
                      <HStack spacing={4} justify="flex-end">
                        <Icon
                          as={RiDeleteBin6Line}
                          color="#EA5A29"
                          // onClick={() => handleDeleteService(service)}
                          cursor="pointer"
                          boxSize={6}
                        />
                        <Icon
                          as={FaEdit}
                          color="#343A59"
                          onClick={() => handleEditService(service, category)}
                          cursor="pointer"
                          boxSize={5}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
          <Button
            rightIcon={<FaCirclePlus />}
            variant="blue"
            marginLeft="20px"
            marginBlock="10px"
            size="sm"
            onClick={() => handleAddService(category)}
          >
            Dodaj uslugu
          </Button>
        </TableContainer>
      ))}

      <AddCategoryModal
        isOpen={isAddCategoryOpen}
        onClose={onAddCategoryClose}
      />
      <AddServiceModal
        isOpen={isAddServiceOpen}
        onClose={onAddServiceClose}
        selectedCategory={selectedCategory}
      />
      <EditServiceModal
        isOpen={isEditServiceOpen}
        onClose={onEditServiceClose}
        selectedService={selectedService}
        selectedCategory={selectedCategory}
      />
      {/* <DeleteServiceModal
        isOpen={isDeleteServiceOpen}
        onClose={onDeleteServiceClose}
        activeService={activeService}
      /> */}
    </Stack>
  );
}
