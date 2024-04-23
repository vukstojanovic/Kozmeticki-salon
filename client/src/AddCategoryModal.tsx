import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import apiServices from "./services";
import { useQuery } from "@tanstack/react-query";
import { Category } from "./services";

type AddCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddCategoryModal({
  isOpen,
  onClose,
}: AddCategoryModalProps) {
  function addCategory(data: Category) {
    addCategoryMutation.mutate(data);
  }
  const addCategoryMutation = useMutation(apiServices.addCategory, {
    onSuccess: () => {
      refetchCategories();
      onClose();
    },
  });

  const {
    register: registerForm,
    handleSubmit: handleSubmitForm,
    formState: { errors },
  } = useForm<Category>();

  console.log(errors, "greske");

  const { refetch: refetchCategories } = useQuery(
    ["categories"],
    apiServices.getCategories
  );

  return (
    <Modal isOpen={isOpen} blockScrollOnMount={false} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Add New Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmitForm(addCategory)}>
            <Flex
              flexDirection="column"
              w="375px"
              justifyContent="space-between"
            >
              <Input
                border="none"
                borderRadius="3xl"
                bg="gray.100"
                focusBorderColor="none"
                fontSize={13}
                placeholder="Enter category..."
                {...registerForm("name", {
                  required: "Category name is required",
                })}
              />

              {errors.name && (
                <Text color="red.500">{errors.name.message}</Text>
              )}
              <Button
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
                Add Category
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
