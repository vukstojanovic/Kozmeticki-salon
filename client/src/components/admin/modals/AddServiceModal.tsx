import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Service, Category } from "../../../services";
import apiServices from "../../../services";
import {
  Input,
  Button,
  Text,
  Select as SelectChakra,
  Box,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import React, { useEffect, useState } from "react";

type AddServiceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: Category | null;
};

export default function AddServiceModal({
  isOpen,
  onClose,
  selectedCategory,
}: AddServiceModalProps) {
  const [selectedCategoryName, setSelectedCategoryName] = useState<
    string | null
  >(selectedCategory ? selectedCategory.name : null);

  useEffect(() => {
    if (isOpen && selectedCategory) {
      setSelectedCategoryName(selectedCategory.name);
    } else {
      setSelectedCategoryName(null);
    }
  }, [isOpen, selectedCategory]);

  function addService(data: Service) {
    // @ts-ignore
    const workersIds = data.workers_id.map(worker => worker.value);
    const categoryId = selectedCategory ? String(selectedCategory.id) : "";
    const dataToSend = {
      ...data,
      workers_id: workersIds,
      category_id: categoryId,
    };

    addServiceMutation.mutate(dataToSend);
  }

  const addServiceMutation = useMutation(apiServices.addService, {
    onSuccess: () => {
      refetchServices();
      onClose();
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Service>();

  const { refetch: refetchServices } = useQuery(
    ["services"],
    apiServices.getServices
  );

  const { data } = useQuery(["categories"], apiServices.getCategories);
  const { data: workersData } = useQuery(["workers"], apiServices.getWorkers);

  const changeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryName(event.target.value);
  };

  const CheckboxOption = ({ innerProps, label, isSelected }: any) => (
    <div {...innerProps}>
      <input type="checkbox" checked={isSelected} readOnly />
      {label}
    </div>
  );

  return (
    <Modal isOpen={isOpen} blockScrollOnMount={false} onClose={onClose}>
      <ModalOverlay />
      <ModalContent display="flex" justifyContent="center" alignItems="center">
        <ModalHeader textAlign="center">Dodaj novu uslugu</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          pt={0}
          pb={5}
          px={8}
          display="flex"
          flexDirection="column"
          w="full"
        >
          <form onSubmit={handleSubmit(addService)}>
            <Box alignItems="center">
              <FormLabel htmlFor="name" fontSize="12" opacity="0.8" mb="0">
                Ime
              </FormLabel>
              <Input
                {...register("name", { required: "Service name is required" })}
                id="name"
                bg="white"
                border="1px solid lightgray"
                borderRadius="6px"
                fontSize={16}
                h="40px"
                mb="15px"
                pl="10px"
                size="xs"
                color="black"
                placeholder="Unesi ime usluge..."
                _placeholder={{ opacity: 0.7 }}
              />
              {errors.name && (
                <Text color="red.500" mt={"-17px"} ml="20px" mb="15px">
                  {errors.name.message}
                </Text>
              )}

              <Text fontSize="12" opacity="0.8" mb="0">
                Izaberi kategoriju
              </Text>
              <SelectChakra
                {...register("category_id", {
                  valueAsNumber: true,
                })}
                mb="15px"
                onChange={changeSelect}
                value={selectedCategoryName || ""}
                css={{
                  paddingInlineStart: "10px !important",
                }}
              >
                {data?.data.map(option => {
                  return (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  );
                })}
              </SelectChakra>

              <FormLabel htmlFor="time" fontSize="12" opacity="0.8" mb="0">
                Unesi vreme
              </FormLabel>
              <Input
                id="time"
                fontSize={16}
                bg="white"
                border="1px solid lightgray"
                borderRadius="6px"
                h="40px"
                mb="15px"
                pl="10px"
                size="xs"
                color="black"
                placeholder="Unesi vreme u minutima..."
                _placeholder={{ opacity: 0.7 }}
                {...register("time_in_minutes", {
                  required: "Minutes are required",
                  valueAsNumber: true,
                })}
                defaultValue={0}
              />
              {errors.time_in_minutes && (
                <Text color="red.500" mt={"-17px"} ml="20px" mb="15px">
                  {errors.time_in_minutes.message}
                </Text>
              )}

              <Text fontSize="12" opacity="0.8" mb="0px">
                Izaberi radnika
              </Text>
              <Controller
                control={control}
                {...register("workers_ids", {
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
                    {errors.workers_ids && (
                      <Text color="red.500" mt={"7px"} ml="20px" mb="15px">
                        {errors.workers_ids.message}
                      </Text>
                    )}
                  </>
                )}
              />
              <FormLabel
                htmlFor="price"
                fontSize="12"
                marginTop="20px"
                marginBottom="0px"
                opacity="0.8"
              >
                Cena
              </FormLabel>
              <Input
                id="price"
                fontSize={16}
                bg="white"
                border="1px solid lightgray"
                borderRadius="6px"
                h="40px"
                mb="15px"
                pl="10px"
                size="xs"
                color="black"
                placeholder="Unesi cenu..."
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                })}
                defaultValue={0}
              />
              {errors.price && (
                <Text color="red.500" mt={"-17px"} ml="20px" mb="15px">
                  {errors.price.message}
                </Text>
              )}
              <Button
                w="full"
                variant="blue"
                type="submit"
                borderRadius="2xl"
                mt="20px"
              >
                Dodaj uslugu
              </Button>
            </Box>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
