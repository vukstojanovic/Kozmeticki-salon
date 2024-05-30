import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {
  Input,
  Text,
  Spinner,
  Flex,
  SimpleGrid,
  Stack,
  Box,
  Divider,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import apiServices, { WorkersType } from "../../../../services";
import EditDeleteWorkers from "./EditDeleteWorkers";
import AddWorkerModal from "../../modals/AddWorkerModal";

export default function WorkersAdmin() {
  const {
    data: workersData,
    isLoading: workersLoading,
    isError: workersError,
  } = useQuery(["workers"], apiServices.getWorkers);

  const { register } = useForm<WorkersType>();

  const {
    isOpen: isAddWorkerOpen,
    onOpen: onAddWorkerOpen,
    onClose: onAddWorkerClose,
  } = useDisclosure();

  if (workersLoading) {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        height="50vh"
        overflow="hidden"
      >
        <Spinner />
      </Flex>
    );
  }

  if (workersError) {
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
          Zaposleni
        </Text>
        <Stack direction="row">
          <Divider orientation="vertical" />
          <IconButton
            isRound={true}
            variant="solid"
            colorScheme="blue"
            bgColor="#343A59"
            aria-label="Add Worker"
            fontSize="20px"
            icon={<IoMdAdd color="F0EFED" />}
            onClick={onAddWorkerOpen}
          />
        </Stack>
      </Box>
      <SimpleGrid minChildWidth="200px" spacing="10px">
        {workersData?.data.map(worker => {
          return <EditDeleteWorkers key={worker.id} {...worker} />;
        })}
      </SimpleGrid>
      <AddWorkerModal isOpen={isAddWorkerOpen} onClose={onAddWorkerClose} />
    </Stack>
  );
}
