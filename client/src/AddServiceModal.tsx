import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { ServiceType } from "./services";
import apiServices from "./services";
import {
    Input, Button, Text, Spinner, Flex, Select as SelectChakra, Box, FormLabel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Select from 'react-select';

type AddServiceModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function AddServiceModal({ isOpen, onClose }: AddServiceModalProps) {

    const {
        data: servicesData,
        isLoading: servicesLoading,
        isError: servicesError,
    } = useQuery(["services"], apiServices.getServices);
    const { register, handleSubmit, control, formState: { errors } } = useForm<ServiceType>();
    const { refetch: refetchServices } = useQuery(["services"], apiServices.getServices);
    const { data } = useQuery(["categories"], apiServices.getCategories);
    const { data: workersData } = useQuery(["workers"], apiServices.getWorkers);




    const addServiceMutation = useMutation(apiServices.addService, {
        onSuccess: () => {
            refetchServices()
            onClose()
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
        <Modal isOpen={isOpen} blockScrollOnMount={false} onClose={onClose} >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign='center'>Add New Service</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit(addService)}>
                        <Box alignItems='center' >
                            <FormLabel htmlFor="name" pl='20px' fontSize='12' opacity='0.8' mb='0'>Name</FormLabel>
                            <Input
                                {...register("name", { required: 'Service name is required' })}
                                id='name'
                                bg='gray.100'
                                fontSize={16}
                                borderRadius='3xl'
                                border="none"
                                pl='20px'
                                h='40px'
                                mb='20px'
                                size="xs"
                                color="black"
                                placeholder="Enter name..."
                                _placeholder={{ opacity: 0.7 }}
                            />
                            {errors.name && <Text color='red.500' mt={'-17px'} ml='20px' mb='15px'>{errors.name.message}</Text>}
                            <Text pl='20px' fontSize='12' opacity='0.8' mb='0'>Category</Text>
                            <SelectChakra {...register("category_id", { valueAsNumber: true })} mb='20px'>
                                {data?.data.map((option) => {
                                    return (
                                        <> <option key={option.id} value={Number(option.id)}>{option.name}</option></>

                                    )
                                })}
                            </SelectChakra>
                            <FormLabel htmlFor="time" pl='20px' fontSize='12' opacity='0.8' mb='0'>Time in minutes</FormLabel>
                            <Input
                                id="time"
                                fontSize={16}
                                bg='gray.100'
                                border="none"
                                borderRadius='3xl'
                                h='40px'
                                pl='20px'
                                mb='20px'
                                size="xs"
                                color="black"
                                placeholder="Enter time in minutes..."
                                _placeholder={{ opacity: 0.7 }}
                                {...register("time_in_minutes", { required: 'Minutes are required', valueAsNumber: true })}
                                defaultValue={0}
                            />
                            {errors.time_in_minutes && <Text color='red.500' mt={'-17px'} ml='20px' mb='15px'>{errors.time_in_minutes.message}</Text>}

                            <Text pl='20px' fontSize='12' opacity='0.8' mb='0px'>Workers</Text>
                            <Controller
                                control={control}
                                {...register("workers_id", { required: 'Select worker is required field' })}
                                render={({ field }) => (
                                    <>
                                        <Select
                                            isMulti
                                            {...field}
                                            components={{
                                                Option: CheckboxOption,
                                            }}
                                            //@ts-ignore
                                            options={workersData?.data?.map((worker) => ({
                                                value: worker.id,
                                                label: worker.name,
                                            })) || []}
                                        />
                                        {errors.workers_id && <Text color='red.500' mt={'7px'} ml='20px' mb='15px'>{errors.workers_id.message}</Text>}
                                    </>
                                )}
                            />
                            <FormLabel htmlFor="price" pl='20px' fontSize='12' marginTop='20px' marginBottom='0px' opacity='0.8'>Price</FormLabel>
                            <Input
                                id="price"
                                fontSize={16}
                                border="none"
                                borderRadius='3xl'
                                bg='gray.100'
                                h='40px'
                                pl='20px'

                                mb='20px'
                                size="xs"
                                color="black"
                                placeholder="Enter price..."
                                {...register("price", { required: 'Price is required', valueAsNumber: true })}
                                defaultValue={0}
                            />
                            {errors.price && <Text color='red.500' mt={'-17px'} ml='20px' mb='15px'>{errors.price.message}</Text>}
                            <Button w='full' bgColor="#2266EE" color="white" type="submit" borderRadius='3xl' mt={'10px'} opacity='0.8' _hover={{
                                opacity: '1',
                            }} >
                                Add Service
                            </Button>

                        </Box>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

