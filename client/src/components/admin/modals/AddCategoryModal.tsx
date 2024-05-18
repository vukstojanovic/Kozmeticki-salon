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
import apiServices from "../../../services";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../../../services";

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

  const { refetch: refetchCategories } = useQuery(
    ["categories"],
    apiServices.getCategories
  );

  return (
    <Modal isOpen={isOpen} blockScrollOnMount={false} onClose={onClose}>
      <ModalOverlay />
      <ModalContent display="flex" justifyContent="center" alignItems="center">
        <ModalHeader textAlign="center">Dodaj novu kategoriju</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          pt={0}
          pb={5}
          px={0}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <form onSubmit={handleSubmitForm(addCategory)}>
            <Flex
              flexDirection="column"
              w="375px"
              justifyContent="space-between"
            >
              <Input
                border="none"
                bg="gray.100"
                focusBorderColor="none"
                fontSize={13}
                placeholder="Unesi ime kategorije..."
                {...registerForm("name", {
                  required: "Category name is required",
                })}
              />

              {errors.name && (
                <Text color="red.500">{errors.name.message}</Text>
              )}
              <Button variant="blue" type="submit" borderRadius="2xl" mt="20px">
                Dodaj kategoriju
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
