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
  Avatar,
  Box,
  Icon,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { FaPencilAlt } from "react-icons/fa";
import apiServices, { WorkersType } from "../../../services";
import { useQuery } from "@tanstack/react-query";

type AddWorkerModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddWorkerModal({
  isOpen,
  onClose,
}: AddWorkerModalProps) {
  function addWorker(data: WorkersType) {
    addWorkerMutation.mutate(data);
  }

  const addWorkerMutation = useMutation(apiServices.addWorker, {
    onSuccess: () => {
      refetchWorkers();
      onClose();
    },
  });

  const {
    register: registerForm,
    handleSubmit: handleSubmitForm,
    formState: { errors },
  } = useForm<WorkersType>();

  const { refetch: refetchWorkers } = useQuery(
    ["workers"],
    apiServices.getWorkers
  );

  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      blockScrollOnMount={false}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent display="flex" justifyContent="center" alignItems="center">
        <ModalHeader textAlign="center">Dodaj novog zaposlenog</ModalHeader>
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
          <form onSubmit={handleSubmitForm(addWorker)}>
            <Flex
              flexDirection="column"
              w="360px"
              justifyContent="space-between"
              alignItems="center"
              gap={4}
              px={5}
            >
              <Box position="relative">
                {/* <Avatar
                  size="xl"
                  name="Segun Adebayo"
                  src="https://bit.ly/sage-adebayo"
                /> */}
                {/* <Box
                  position="absolute"
                  bottom={0}
                  right={0}
                  bg="white"
                  borderRadius="full"
                  p={2}
                  cursor="pointer"
                  as="label"
                  htmlFor="file-upload"
                  display="flex"
                  border="0.5px solid black"
                >
                  <Icon as={FaPencilAlt} boxSize={4} color="gray.600" />
                  <Input
                    {...registerForm("image")}
                    id="file-upload"
                    type="file"
                    display="none"
                  />
                </Box> */}
              </Box>

              <Input
                border="none"
                bg="gray.100"
                focusBorderColor="none"
                fontSize={13}
                borderRadius="6px"
                placeholder="Unesi ime zaposlenog..."
                {...registerForm("name", {
                  required: "Worker name is required",
                })}
              />

              {errors.name && (
                <Text color="red.500">{errors.name.message}</Text>
              )}
              <Button variant="blue" type="submit" borderRadius="6px" mt="20px">
                Dodaj zaposlenog
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
