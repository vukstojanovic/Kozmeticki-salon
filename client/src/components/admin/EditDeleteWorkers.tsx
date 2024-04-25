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
import { WorkersType } from "../../services";
import apiServices from "../../services";
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
    <Card maxW="sm" boxShadow="none">
      <CardBody>
        <Avatar
          size="2xl"
          name="Segun Adebayo"
          src="https://bit.ly/sage-adebayo"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md"> {name}</Heading>
          <Text>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design
            with a sprinkle of vintage design.
          </Text>
          <Text color="blue.600" fontSize="2xl">
            $450
          </Text>
        </Stack>
      </CardBody>
      <Divider />
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
            <Button bgColor="#EAA89F" color="white" type="submit">
              Update
            </Button>
          </Flex>
        </form>
        <Button
          onClick={() => deleteWorker(id)}
          bgColor="#EAA89F"
          color="white"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
