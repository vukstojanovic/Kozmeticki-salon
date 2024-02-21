import { Input, Button, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { WorkersType } from "./services";
import apiServices from "./services";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";


export default function EditDeleteWorkers({ name, id }: WorkersType) {

    const { register, handleSubmit } = useForm<WorkersType>();

    const { refetch: refetchWorkers } = useQuery(["workers"], apiServices.getWorkers);


    const deleteWorkerMutation = useMutation(apiServices.deleteWorker, {
        onSuccess: () => {
            refetchWorkers()
        }
    });
    const updateWorkerMutation = useMutation(apiServices.updateWorker, {
        onSuccess: () => {
            refetchWorkers()
        }
    })

    function deleteWorker(id: number) {
        deleteWorkerMutation.mutate(id);
    }

    function updateWorker({ data, id }: any) {
        updateWorkerMutation.mutate({ data, id })
    }

    return (
        <Flex justifyContent='space-between'>
            <p>{name}</p>
            <form onSubmit={handleSubmit(data => updateWorker({ data, id }))}>
                <Flex justifyContent='space-between'>
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
                    <Button
                        bgColor="#EAA89F"
                        color='white'
                        type="submit"
                    >
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
        </Flex>
    )
}
