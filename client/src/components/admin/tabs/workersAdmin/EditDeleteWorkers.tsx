import {
  Input,
  Button,
  Flex,
  Stack,
  Text,
  Heading,
  Divider,
  Avatar,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { WorkersType } from "../../../../services";
import apiServices from "../../../../services";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";

export default function EditDeleteWorkers({ name, id }: WorkersType) {
  const { register, handleSubmit } = useForm<WorkersType>();

  const { refetch: refetchWorkers } = useQuery(
    ["workers"],
    apiServices.getWorkers
  );

  const deleteWorkerMutation = useMutation(apiServices.deleteWorker, {
    onSuccess: () => {
      refetchWorkers();
    },
  });
  const updateWorkerMutation = useMutation(apiServices.updateWorker, {
    onSuccess: () => {
      refetchWorkers();
    },
  });

  function deleteWorker(id: string) {
    deleteWorkerMutation.mutate(id);
  }

  function updateWorker({ data, id }: any) {
    updateWorkerMutation.mutate({ data, id });
  }

  return (
    <Card maxW="sm" bg="#F8FAFB" borderRadius="20px" boxShadow="xs">
      <CardBody>
        <Avatar
          size="xl"
          name="Segun Adebayo"
          src="https://bit.ly/sage-adebayo"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md"> {name}</Heading>
          <Text color="blue.600" fontSize="2xl">
            $450
          </Text>
        </Stack>
      </CardBody>
      <Divider
        color="lightGray
      "
      />
      <CardFooter>
        <form onSubmit={handleSubmit(data => updateWorker({ data, id }))}>
          <Flex justifyContent="space-between">
            <Input
              fontSize={13}
              focusBorderColor="none"
              border="none"
              p={0}
              m={0}
              size="xs"
              color="black"
              placeholder="Enter name..."
              {...register("name")}
            />
            <Button variant="outline" type="submit">
              Izmeni
            </Button>
          </Flex>
        </form>
        <Button
          onClick={() => deleteWorker(id)}
          colorScheme="red"
          color="white"
          ml={3}
        >
          Izbriši
        </Button>
      </CardFooter>
    </Card>
  );
}
