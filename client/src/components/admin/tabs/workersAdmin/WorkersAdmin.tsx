import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import apiServices from "../../../../services";
import {
  Input,
  Button,
  Text,
  Spinner,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { WorkersType } from "../../../../services";
import EditDeleteWorkers from "../../EditDeleteWorkers";

export default function WorkersAdmin() {
  const {
    data: workersData,
    isLoading: workersLoading,
    isError: workersError,
  } = useQuery(["workers"], apiServices.getWorkers);
  const { register, handleSubmit } = useForm<WorkersType>();

  const { refetch: refetchWorkers } = useQuery(
    ["workers"],
    apiServices.getWorkers
  );

  const addWorkersMutation = useMutation(apiServices.addWorker, {
    onSuccess: () => {
      refetchWorkers();
    },
  });

  function addWorker(data: WorkersType) {
    const formData = new FormData();
    //@ts-ignore
    formData.append("image", data?.image[0]);
    //@ts-ignore

    console.log(data?.image[0]);
    console.log(data, "data");
    //@ts-ignore
    addWorkersMutation.mutate({ ...data, image: data?.image[0] });
  }

  if (workersLoading) {
    return (
      <Flex
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"50vh"}
      >
        <Spinner />
      </Flex>
    );
  }

  if (workersError) {
    return <Text>Error</Text>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(addWorker)}>
        <Input
          fontSize={13}
          focusBorderColor="none"
          border="none"
          p={0}
          m={0}
          size="xs"
          color="black"
          placeholder="Enter worker..."
          {...register("name")}
        />
        <input {...register("image")} type="file" />

        <Button bgColor="#EAA89F" color="white" type="submit">
          Add Worker
        </Button>
      </form>
      <SimpleGrid minChildWidth="120px" spacing="10px">
        {workersData?.data.map(worker => {
          return <EditDeleteWorkers key={worker.id} {...worker} />;
        })}
      </SimpleGrid>
    </div>
  );
}
