import {
  Input,
  Button,
  Text,
  Flex,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Category } from "./services";
import apiServices from "./services";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { IoTrash } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

export default function EditDeleteCategory({ name, id }: Category) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Category>();
  const { refetch: refetchCategories, data } = useQuery(
    ["categories"],
    apiServices.getCategories
  );

  console.log(data);

  const updateCategoryMutation = useMutation(apiServices.updateCategory, {
    onSuccess: () => {
      refetchCategories();
      onEditCategoryClose();
    },
  });
  const deleteCategoryMutation = useMutation(apiServices.deleteCategory, {
    onSuccess: () => {
      refetchCategories();
      onEditCategoryClose();
    },
  });

  const {
    isOpen: isEditCategoryOpen,
    onOpen: onEditCategoryOpen,
    onClose: onEditCategoryClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteCategoryOpen,
    onOpen: onDeleteCategoryOpen,
    onClose: onDeleteCategoryClose,
  } = useDisclosure();

  function deleteCategory(id: string) {
    deleteCategoryMutation.mutate(id);
  }

  function updateCategory({ data, id }: any) {
    console.log(data, id);
    updateCategoryMutation.mutate({ data, id });
  }

  return (
    <Flex justifyContent="space-between" backgroundColor="white">
      <Text paddingLeft="10px" paddingTop="5px">
        <b>{name}</b>
      </Text>
      <Box>
        <Button
          onClick={onEditCategoryOpen}
          color="white"
          bg="transparent"
          borderRadius="unset"
          _hover={{ transform: "scale(1.13)", filter: "brightness(140%)" }}
        >
          <FaRegEdit color="green" size={20} />
        </Button>
        <Button
          onClick={onDeleteCategoryOpen}
          color="white"
          bg="transparent"
          borderRadius="unset"
          _hover={{ transform: "scale(1.13)", filter: "brightness(140%)" }}
        >
          <IoTrash color="red" size={20} />
        </Button>
      </Box>
      <Modal
        isOpen={isEditCategoryOpen}
        blockScrollOnMount={false}
        onClose={onEditCategoryClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Edit Category Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(data => updateCategory({ data, id }))}>
              <Flex>
                <Input
                  border="none"
                  borderRadius="3xl"
                  bg="gray.100"
                  focusBorderColor="none"
                  fontSize={13}
                  placeholder="Enter name..."
                  {...register("name", {
                    required: "Category name is required",
                  })}
                />
              </Flex>
              {errors.name && (
                <Text color="red.500">{errors.name.message}</Text>
              )}
              <Button
                w="full"
                bgColor="#2266EE"
                color="white"
                type="submit"
                borderRadius="3xl"
                mt={"20px"}
                opacity="0.8"
                _hover={{
                  opacity: "1",
                }}
              >
                Edit Category Name{" "}
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isDeleteCategoryOpen}
        blockScrollOnMount={false}
        onClose={onDeleteCategoryClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Delete Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <p>
                Are you sure you want to{" "}
                <span style={{ fontWeight: "bold" }}>delete "{name}"</span>.
                This action cannot be undone.
              </p>
              <Flex justifyContent="flex-end" marginTop="20px">
                <Button onClick={onDeleteCategoryClose} fontWeight="normal">
                  Cancel
                </Button>
                <Button
                  onClick={() => deleteCategory(id)}
                  bgColor="red.400"
                  color="white"
                  marginLeft="15px"
                  fontWeight="normal"
                  _hover={{ bgColor: "red.500" }}
                >
                  Delete
                </Button>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
