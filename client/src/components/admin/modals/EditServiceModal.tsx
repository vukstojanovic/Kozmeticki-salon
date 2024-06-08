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
import { Service } from "../../../services";
import apiServices from "../../../services";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import { useEffect } from "react";

type WorkerWithLabel = {
  value: string;
  label: string;
};

type ServiceWithWorkersWithLabel = Omit<Service, "workers_ids"> & {
  workers_ids: WorkerWithLabel[];
};

type EditServiceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedService: Service | null;
};

export default function EditServiceModal({
  isOpen,
  onClose,
  selectedService,
}: EditServiceModalProps) {
  const { data: workersData } = useQuery(["workers"], apiServices.getWorkers);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
  } = useForm<ServiceWithWorkersWithLabel>();

  useEffect(() => {
    if (selectedService) {
      setValue("name", selectedService.name);
      setValue("time_in_minutes", selectedService.time_in_minutes);
      setValue("price", selectedService.price);
      setValue("category_id", selectedService.category_id);
      const workersWithLabels = workersData?.data
        .filter((worker) => selectedService.workers_ids.includes(worker.id))
        .map((worker) => ({ value: worker.id, label: worker.name }));
      // @ts-ignore
      setValue("workers_ids", workersWithLabels);
      console.log(selectedService.workers_ids, "selectedService");
    }
  }, [isOpen, selectedService, setValue, workersData?.data]);

  const activeWorker = watch("workers_ids");

  // FETCH ///////////////////////
  const { refetch: refetchServices, data: servicesData } = useQuery(
    ["services"],
    apiServices.getServices
  );
  const { data: categoriesData } = useQuery(
    ["categories"],
    apiServices.getCategories
  );

  // UPDATE MUTATION ///////////////////////
  const updateServiceMutation = useMutation(apiServices.updateService, {
    onSuccess: () => {
      refetchServices();
      onClose();
    },
  });

  // UPDATE FUNCTION ///////////////////////
  function updateService(data: ServiceWithWorkersWithLabel) {
    const dataToSend = {
      ...data,
      workers_ids: data.workers_ids.map((worker) => worker.value),
    };
    updateServiceMutation.mutate({ data: dataToSend, id: selectedService?.id });
  }

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
          <form onSubmit={handleSubmit((data) => updateService(data))}>
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
                Kategorija
              </Text>
              <Controller
                control={control}
                name="category_id"
                defaultValue={selectedService?.category_id} // Add this line
                render={({ field }) => {
                  return (
                    <SelectChakra
                      {...field}
                      mb="15px"
                      css={{
                        paddingInlineStart: "10px !important",
                      }}
                    >
                      {categoriesData?.data.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </SelectChakra>
                  );
                }}
              />

              <FormLabel htmlFor="time" fontSize="12" opacity="0.8" mb="0">
                Vreme u minutima
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
                name="workers_ids"
                render={({ field }) => {
                  return (
                    <Select
                      isMulti
                      {...field}
                      components={{
                        Option: CheckboxOption,
                      }}
                      //@ts-ignore
                      options={
                        workersData?.data?.map((worker) => ({
                          value: worker.id,
                          label: worker.name,
                        })) || []
                      }
                    />
                  );
                }}
              />
              {errors.workers_ids && (
                <Text color="red.500" mt={"7px"} ml="20px" mb="15px">
                  {errors.workers_ids.message}
                </Text>
              )}
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
