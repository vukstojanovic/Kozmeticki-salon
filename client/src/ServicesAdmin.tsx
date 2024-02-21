import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { ServiceType } from "./services";
import apiServices from "./services";
import { Input, Button, Text, Spinner, Flex, Select as SelectChakra, Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Select from 'react-select';

export default function ServicesAdmin() {
    const {
        data: servicesData,
        isLoading: servicesLoading,
        isError: servicesError,
    } = useQuery(["services"], apiServices.getServices);
    const { register, handleSubmit, control } = useForm<ServiceType>();
    const { refetch: refetchServices } = useQuery(["services"], apiServices.getServices);
    const { data } = useQuery(["categories"], apiServices.getCategories);
    const { data: workersData } = useQuery(["workers"], apiServices.getWorkers);




    const addServiceMutation = useMutation(apiServices.addService, {
        onSuccess: () => {
            refetchServices()
        }
    });

    function addService(data: ServiceType) {
        // @ts-ignore
        const workersIds = data.workers_id.map(worker => worker.value);
        const dataToSend = {
            ...data,
            workers_id: workersIds,
        };
        addServiceMutation.mutate(dataToSend);
    }

    if (servicesLoading) {
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

    if (servicesError) {
        return <Text>Error</Text>;
    }

    const CheckboxOption = ({ innerProps, label, isSelected }: any) => (
        <div {...innerProps}>
            <input type="checkbox" checked={isSelected} readOnly />
            {label}
        </div>
    );
    return (
        <Box>
            <h3>Nova usluga</h3>
            <form onSubmit={handleSubmit(addService)}>
                <Box alignItems='center' >
                    <Input
                        {...register("name")}
                        fontSize={13}
                        focusBorderColor="none"
                        border="none"
                        p={0}
                        m={0}
                        size="xs"
                        color="black"
                        placeholder="Enter name..."
                    />
                    <SelectChakra {...register("category_id", { valueAsNumber: true })}>
                        {data?.data.map((option) => {
                            return (
                                <option key={option.id} value={Number(option.id)}>{option.name}</option>
                            )
                        })}
                    </SelectChakra>

                    <Input
                        fontSize={13}
                        focusBorderColor="none"
                        border="none"
                        p={0}
                        m={0}
                        size="xs"
                        color="black"
                        placeholder="Enter time in minutes..."
                        {...register("time_in_minutes", { valueAsNumber: true })}
                    />


                    <Controller
                        control={control}
                        name="workers_id"
                        render={({ field }) => (
                            <Select

                                isMulti
                                {...field}
                                components={{
                                    Option: CheckboxOption,
                                }}
                                // @ts-ignore
                                options={workersData?.data.map((worker) => ({
                                    value: worker.id,
                                    label: worker.name,
                                })) || []}

                            />
                        )}
                    />
                    <Input
                        w='50x'
                        fontSize={13}
                        focusBorderColor="none"
                        border="none"
                        p={0}
                        m={0}
                        size="xs"
                        color="black"
                        placeholder="Enter price..."
                        {...register("price", { valueAsNumber: true })}
                    />
                    <Button bgColor="#EAA89F" color="white" type="submit" display='block' w='375px'>
                        Add Service
                    </Button>
                </Box>
            </form>
        </Box>
    );
}


