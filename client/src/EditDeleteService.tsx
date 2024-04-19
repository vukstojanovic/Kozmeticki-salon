import {
  Input,
  Button,
  Text,
  Flex,
  Box,
  Select as SelectChakra,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  IconButton,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { ServiceType } from "./services";
import apiServices from "./services";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";

import { IoTrash } from "react-icons/io5";
import { useState } from "react";

export default function EditDeleteService({
  name,
  id,
  category_id,
  time_in_minutes,
  price,
}: ServiceType) {
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
  const { data: categoriesData } = useQuery(
    ["categories"],
    apiServices.getCategories
  );
  const { data: workersData } = useQuery(["workers"], apiServices.getWorkers);

  const [isHovered, setIsHovered] = useState(false);

  const updateServiceMutation = useMutation(apiServices.updateService, {
    onSuccess: () => {
      refetchServices();
      onEditServiceClose();
    },
  });
  const deleteServiceMutation = useMutation(apiServices.deleteService, {
    onSuccess: () => {
      refetchServices();
    },
  });

  const {
    isOpen: isEditServiceOpen,
    onOpen: onEditServiceOpen,
    onClose: onEditServiceClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteServiceOpen,
    onOpen: onDeleteServiceOpen,
    onClose: onDeleteServiceClose,
  } = useDisclosure();

  function deleteService(id: number) {
    deleteServiceMutation.mutate(id);
  }

  function updateService({ data, id }: any) {
    console.log(data, id);
    // @ts-ignore
    const workersIds = data.workers_id.map(worker => worker.value);
    const dataToSend = {
      ...data,
      workers_id: workersIds,
    };
    console.log(dataToSend, id, "data,id");

    updateServiceMutation.mutate({ data: dataToSend, id });
  }

  const CheckboxOption = ({ innerProps, label, isSelected }: any) => (
    <div {...innerProps}>
      <input type="checkbox" checked={isSelected} readOnly />
      {label}
    </div>
  );

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      bg={isHovered ? "#ebedf0" : "white"}
    >
      <Text paddingLeft="15px">{name}</Text>
      <Box bg="white">
        {/* <Button
          onClick={onEditServiceOpen}
          bg={isHovered ? "#ebedf0" : "white"}
          color="black"
          borderRadius="unset"
          // _hover={{ transform: "scale(1.13)", filter: "brightness(140%)" }}
        >
          <FaRegEdit size={20} />
        </Button> */}
        <IconButton
          onClick={onEditServiceOpen}
          color="#343A59"
          aria-label="Search database"
          icon={<IoTrash />}
          bgColor={isHovered ? "#ebedf0" : "white"}
        />
        {/* <Button
          onClick={onDeleteServiceOpen}
          bg={isHovered ? "#ebedf0" : "white"}
          color="black"
          borderRadius="unset"
          // _hover={{ transform: "scale(1.13)", filter: "brightness(140%)" }}
        >
          <IoTrash size={20} />
        </Button> */}
      </Box>

      <Modal
        isOpen={isEditServiceOpen}
        blockScrollOnMount={false}
        onClose={onEditServiceClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Edit {name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(data => updateService({ data, id }))}>
              <Box>
                <FormLabel
                  htmlFor="name"
                  pl="20px"
                  fontSize="12"
                  opacity="0.8"
                  mb="0"
                >
                  Name
                </FormLabel>
                <Input
                  {...register("name", {
                    required: "Service name is required",
                  })}
                  id="name"
                  bg="gray.100"
                  fontSize={16}
                  borderRadius="3xl"
                  border="none"
                  pl="20px"
                  h="40px"
                  mb="20px"
                  size="xs"
                  color="black"
                  placeholder="Enter name..."
                  _placeholder={{ opacity: 1 }}
                  defaultValue={name}
                />
                {errors.name && (
                  <Text color="red.500" mt={"-17px"} ml="20px" mb="15px">
                    {errors.name.message}
                  </Text>
                )}
                <Text pl="20px" fontSize="12" opacity="0.8">
                  Category
                </Text>
                <SelectChakra
                  {...register("category_id", { valueAsNumber: true })}
                  mb="20px"
                  defaultValue={category_id}
                >
                  {categoriesData?.data.map(option => {
                    return (
                      <option key={option.id} value={Number(option.id)}>
                        {option.name}
                      </option>
                    );
                  })}
                </SelectChakra>
                <FormLabel
                  htmlFor="time"
                  pl="20px"
                  fontSize="12"
                  opacity="0.8"
                  mb="0"
                >
                  Time in minutes
                </FormLabel>
                <Input
                  id="time"
                  fontSize={16}
                  bg="gray.100"
                  border="none"
                  borderRadius="3xl"
                  h="40px"
                  pl="20px"
                  mb="20px"
                  size="xs"
                  color="black"
                  placeholder="Enter time in minutes..."
                  {...register("time_in_minutes", {
                    valueAsNumber: true,
                    required: "Minutes are required",
                  })}
                  defaultValue={time_in_minutes}
                />
                {errors.time_in_minutes && (
                  <Text color="red.500" mt={"-17px"} ml="20px" mb="15px">
                    {errors.time_in_minutes.message}
                  </Text>
                )}

                <Text pl="20px" fontSize="12" opacity="0.8">
                  Workers
                </Text>
                <Controller
                  control={control}
                  {...register("workers_id", {
                    required: "Select worker is required field",
                  })}
                  render={({ field }) => (
                    <>
                      <Select
                        isMulti
                        {...field}
                        components={{
                          Option: CheckboxOption,
                        }}
                        //@ts-ignore
                        options={
                          workersData?.data?.map(worker => ({
                            value: worker.id,
                            label: worker.name,
                          })) || []
                        }
                      />
                      {errors.workers_id && (
                        <Text color="red.500" mt={"7px"} ml="20px" mb="15px">
                          {errors.workers_id.message}
                        </Text>
                      )}
                    </>
                  )}
                  //@ts-ignore
                  defaultValue={
                    servicesData && servicesData.data
                      ? servicesData.data
                          .find(service => service.id === id)
                          ?.workers_id?.map(workerId => ({
                            value: workerId,
                            label:
                              workersData?.data?.find(
                                worker => worker.id === workerId
                              )?.name || `Worker ${workerId}`,
                          })) || []
                      : []
                  }
                />
                <FormLabel
                  htmlFor="price"
                  pl="20px"
                  fontSize="12"
                  marginTop="20px"
                  marginBottom="2px"
                  opacity="0.8"
                >
                  Price
                </FormLabel>
                <Input
                  id="price"
                  fontSize={16}
                  border="none"
                  borderRadius="3xl"
                  bg="gray.100"
                  h="40px"
                  pl="20px"
                  mb="20px"
                  size="xs"
                  color="black"
                  placeholder="Enter price..."
                  {...register("price", {
                    valueAsNumber: true,
                    required: "Minutes are required",
                  })}
                  defaultValue={price}
                />
                {errors.price && (
                  <Text color="red.500" mt={"-17px"} ml="20px" mb="15px">
                    {errors.price.message}
                  </Text>
                )}
                <Button
                  w="full"
                  bgColor="#2266EE"
                  color="white"
                  type="submit"
                  borderRadius="3xl"
                  mt={"10px"}
                  opacity="0.8"
                  _hover={{
                    opacity: "1",
                  }}
                >
                  Edit Service
                </Button>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isDeleteServiceOpen}
        blockScrollOnMount={false}
        onClose={onDeleteServiceClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Delete Service</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <p>
                Are you sure you want to{" "}
                <span style={{ fontWeight: "bold" }}>delete "{name}"</span>.
                This action cannot be undone.
              </p>
              <Flex justifyContent="flex-end" marginTop="20px">
                <Button onClick={onDeleteServiceClose} fontWeight="normal">
                  Cancel
                </Button>
                <Button
                  onClick={() => deleteService(id)}
                  bgColor="red.400"
                  color="white"
                  marginLeft="15px"
                  fontWeight="normal"
                  _hover={{ bgColor: "red.500" }}
                >
                  Delete
                </Button>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
