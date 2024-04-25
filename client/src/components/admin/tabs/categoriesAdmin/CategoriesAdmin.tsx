import { useState } from "react";
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
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import EditDeleteCategory from "../../EditDeleteCategory";
import EditDeleteService from "../../EditDeleteService";
import AddCategoryModal from "../../AddCategoryModal";
import AddServiceModal from "../../AddServiceModal";
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
import { AddIcon } from "@chakra-ui/icons";
import { IoMdSettings } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";

export default function CategoriesAdmin() {
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

  const [isHovered, setIsHovered] = useState(false);

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
        boxShadow="lg"
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
              onClick={onAddCategoryOpen}
            />
          </Stack>
        </Stack>
      </Box>
      {categoriesData?.data.map(category => (
        <TableContainer marginBlock="20px">
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
                    <Td isNumeric>
                      <Icon
                        as={IoMdSettings}
                        color="#343A59"
                        onClick={onEditServiceOpen}
                        cursor="pointer"
                        boxSize={5}
                      />
                    </Td>
                  </Tr>
                ))}

              <Button
                rightIcon={<FaCirclePlus />}
                bgColor="#343A59"
                color="#F8F8F8"
                variant="outline"
                marginLeft="20px"
                marginBlock="10px"
                size="sm"
              >
                Dodaj uslugu
              </Button>
            </Tbody>
          </Table>
        </TableContainer>
      ))}

      <AddCategoryModal
        isOpen={isAddCategoryOpen}
        onClose={onAddCategoryClose}
      />
      <AddServiceModal isOpen={isAddServiceOpen} onClose={onAddServiceClose} />
    </Stack>
  );
}
