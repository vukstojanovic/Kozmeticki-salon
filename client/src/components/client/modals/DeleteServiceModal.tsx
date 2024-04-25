import {
  Input,
  Button,
  Text,
  Flex,
  Box,
  Select as SelectChakra,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import apiServices, { Service } from "../../../services";

export default function EditDeleteService({ name, id }: Service) {
  const { refetch: refetchServices } = useQuery(
    ["services"],
    apiServices.getServices
  );

  const deleteServiceMutation = useMutation(apiServices.deleteService, {
    onSuccess: () => {
      refetchServices();
    },
  });

  const {
    isOpen: isDeleteServiceOpen,
    onOpen: onDeleteServiceOpen,
    onClose: onDeleteServiceClose,
  } = useDisclosure();

  function deleteService(id: string) {
    deleteServiceMutation.mutate(id);
  }

  return (
    <Modal
      isOpen={isDeleteServiceOpen}
      blockScrollOnMount={false}
      onClose={onDeleteServiceClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Delete Service</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <p>
              Are you sure you want to{" "}
              <span style={{ fontWeight: "bold" }}>delete "{name}"</span>. This
              action cannot be undone.
            </p>
            <Flex justifyContent="flex-end" marginTop="20px">
              <Button onClick={onDeleteServiceClose} fontWeight="normal">
                Cancel
              </Button>
              <Button
                onClick={() => deleteService(id)}
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
  );
}
