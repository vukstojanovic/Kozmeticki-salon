import {
  Input,
  Button,
  Text,
  Box,
  Select as SelectChakra,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormLabel,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { Service, Category } from "../../../services";
import apiServices from "../../../services";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import { useEffect, useState } from "react";

type EditServiceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedService: Service | null;
  selectedCategory: Category | null;
};

export default function EditServiceModal({
  isOpen,
  onClose,
  selectedService,
  selectedCategory,
}: EditServiceModalProps) {
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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<Service>();

  useEffect(() => {
    if (selectedService) {
      setValue("name", selectedService.name);
      setValue("time_in_minutes", selectedService.time_in_minutes);
      setValue("price", selectedService.price);
    }
  }, [isOpen, selectedService, setValue]);

  // FETCH ///////////////////////
  const { refetch: refetchServices, data: servicesData } = useQuery(
    ["services"],
    apiServices.getServices
  );
  const { data: categoriesData } = useQuery(
    ["categories"],
    apiServices.getCategories
  );
  const { data: workersData } = useQuery(["workers"], apiServices.getWorkers);

  // UPDATE MUTATION ///////////////////////
  const updateServiceMutation = useMutation(apiServices.updateService, {
    onSuccess: () => {
      refetchServices();
      onClose();
    },
  });

  // UPDATE FUNCTION ///////////////////////
  function updateService({ data, id }: any) {
    const workersIds = data.workers_id.map(
      (worker: { value: any }) => worker.value
    );
    const categoryId = selectedCategory ? String(selectedCategory.id) : "";

    const dataToSend = {
      ...data,
      workers_id: workersIds,
      category_id: categoryId,
    };
    updateServiceMutation.mutate({ data: dataToSend, id });
  }

  const CheckboxOption = ({ innerProps, label, isSelected }: any) => (
    <div {...innerProps}>
      <input type="checkbox" checked={isSelected} readOnly />
      {label}
    </div>
  );

  const changeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryName(event.target.value);
  };

  return (
    <Modal isOpen={isOpen} blockScrollOnMount={false} onClose={onClose}>
      <ModalOverlay />
      <ModalContent display="flex" justifyContent="center" alignItems="center">
        <ModalHeader textAlign="center">Izmeni uslugu</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          pt={0}
          pb={5}
          px={8}
          display="flex"
          flexDirection="column"
          w="full"
        >
          <form
            onSubmit={handleSubmit(data =>
              updateService({ data, id: selectedService?.id })
            )}
          >
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
                {...register("category_id", { valueAsNumber: true })}
                onChange={changeSelect}
                defaultValue={selectedService?.category_id}
                value={selectedCategoryName || ""}
                mb="15px"
                css={{
                  paddingInlineStart: "10px !important",
                }}
              >
                {categoriesData?.data.map(option => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </SelectChakra>

              <FormLabel htmlFor="time" fontSize="12" opacity="0.8" mb="0">
                Time in minutes
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
                Izmeni uslugu
              </Button>
            </Box>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
