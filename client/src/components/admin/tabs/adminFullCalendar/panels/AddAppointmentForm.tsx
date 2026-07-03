import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Textarea,
  Stack,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import apiServices, { Service } from "../../../../../services";

interface AddAppointmentFormProps {
  workerId: string | undefined;
  selectedSlot: Date | null;
}

const AddAppointmentForm: React.FC<AddAppointmentFormProps> = ({
  workerId,
  selectedSlot,
}) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm();
  const [selectedService, setSelectedService] = useState("");

  const { data: services }: { data: any } = useQuery(
    ["services"],
    apiServices.getServices
  );

  const filteredServices = services?.data.filter((service: Service) =>
    service.workers_ids.includes(workerId!)
  );

  const selectedServiceData = filteredServices?.find(
    (service: { id: string }) => service.id === selectedService
  );

  const mutation = useMutation(apiServices.addAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["appointments"]);
      reset();
    },
    onError: error => {
      console.error("Greška prilikom dodavanja termina:", error);
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    console.log(selectedSlot);

    const formattedData = {
      ...data,
      service_duration: Number(data.service_duration),
      date: selectedSlot
        ? Math.floor(new Date(selectedSlot).getTime() / 1000)
        : null,
      worker_id: workerId,
    };

    console.log(formattedData);

    mutation.mutate(formattedData);
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      bg="white"
      display="flex"
      flexDirection="column"
      alignItems="start"
      gap={6}
    >
      <Stack spacing={4} direction="column" w="full">
        <FormControl>
          <FormLabel mb={0}>Izaberi uslugu</FormLabel>
          <Controller
            control={control}
            name="service_id"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Izaberite uslugu"
                cursor="pointer"
                onChange={e => {
                  onChange(e);
                  setSelectedService(e.target.value);
                }}
                value={value}
                required
              >
                {filteredServices?.map((service: Service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel mb={0}>Trajanje usluge (min)</FormLabel>
          <Controller
            control={control}
            name="service_duration"
            render={({ field }) => (
              <Input
                type="number"
                placeholder={
                  selectedServiceData?.time_in_minutes !== undefined
                    ? `Trajanje usluge (${selectedServiceData.time_in_minutes} min)`
                    : ""
                }
                {...field}
                defaultValue={selectedServiceData?.time_in_minutes || undefined}
                required
              />
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel mb={0}>Ime i prezime klijenta</FormLabel>
          <Controller
            control={control}
            name="customerName"
            render={({ field }) => <Input type="text" {...field} required />}
          />
        </FormControl>

        <FormControl>
          <FormLabel mb={0}>Broj telefona klijenta</FormLabel>
          <Controller
            control={control}
            name="customerNumber"
            render={({ field }) => <Input type="text" {...field} required />}
          />
        </FormControl>

        <FormControl>
          <FormLabel mb={0}>Napomena</FormLabel>
          <Controller
            control={control}
            name="note"
            render={({ field }) => (
              <Textarea {...field} placeholder="Unesite napomenu" />
            )}
          />
        </FormControl>
      </Stack>

      <Button type="submit" variant="blue" isLoading={mutation.isLoading}>
        Dodaj Termin
      </Button>
    </Box>
  );
};

export default AddAppointmentForm;
