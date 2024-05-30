import {
  Input,
  Button,
  Flex,
  Stack,
  Heading,
  Divider,
  Avatar,
  Box,
  Icon,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { WorkersType } from "../../../../services";
import apiServices from "../../../../services";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { FaPencilAlt } from "react-icons/fa";

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
    <Card bg="white" borderRadius="lg" boxShadow="md">
      <CardBody display="flex" flexDirection="column" alignItems="center">
        <Box position="relative">
          <Avatar
            size="xl"
            name="Segun Adebayo"
            src="https://bit.ly/sage-adebayo"
          />
          <Box
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
              {...register("image")}
              id="file-upload"
              type="file"
              display="none"
            />
          </Box>
        </Box>
        <Heading size="md" textAlign="center" mt={3}>
          {name}
        </Heading>
      </CardBody>
      <Divider borderColor="gray.200" />
      <CardFooter>
        <form
          style={{ width: "100%" }}
          onSubmit={handleSubmit(data => updateWorker({ data, id }))}
        >
          <Stack spacing={3} width="100%">
            <Input
              defaultValue={name}
              fontSize={13}
              focusBorderColor="blue.500"
              borderColor="gray.300"
              size="sm"
              {...register("name")}
            />
            <Flex justifyContent="flex-start" gap={3}>
              <Button variant="outline" type="submit" borderRadius="md">
                Izmeni
              </Button>
              <Button
                onClick={() => deleteWorker(id)}
                colorScheme="red"
                borderRadius="md"
              >
                Izbriši
              </Button>
            </Flex>
          </Stack>
        </form>
      </CardFooter>
    </Card>
  );
}
