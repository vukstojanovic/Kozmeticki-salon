import {
  Button,
  Flex,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { Service, ServiceType } from "../../../services";
import apiServices from "../../../services";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

type DeleteServiceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  id: string;
  activeService: Service | null;
};

export default function DeleteServiceModal({
  isOpen,
  onClose,
  name,
  id,
  activeService,
}: DeleteServiceModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ServiceType>();
  const { refetch: refetchServices, data: servicesData } = useQuery(
    ["services"],
    apiServices.getServices
  );

  const deleteServiceMutation = useMutation(apiServices.deleteService, {
    onSuccess: () => {
      refetchServices();
    },
  });

  function deleteService(id: string) {
    deleteServiceMutation.mutate(id);
  }

  return (
    <Modal isOpen={isOpen} blockScrollOnMount={false} onClose={onClose}>
      <ModalOverlay />
      <ModalContent display="flex" justifyContent="center" alignItems="center">
        <ModalHeader textAlign="center">Izbriši uslugu</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          pt={0}
          pb={5}
          px={5}
          display="flex"
          flexDirection="column"
          w="full"
        >
          <Box>
            <p>
              Jeste li sigurni da želite da izbrišete{" "}
              <span style={{ fontWeight: "bold" }}>"{name}"</span>. Ova radnja
              se ne može opozvati.
            </p>
            <Flex justifyContent="flex-end" marginTop="20px">
              <Button onClick={onClose} fontWeight="normal">
                Izadji
              </Button>
              <Button
                onClick={() => deleteService(id)}
                variant="red"
                color="white"
                marginLeft="15px"
                fontWeight="normal"
              >
                Izbriši
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
