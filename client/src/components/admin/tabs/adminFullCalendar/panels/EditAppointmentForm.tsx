import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Appointment, Service } from "../../../../../services/index";
import apiServices from "../../../../../services";

interface EditAppointmentFormsProps {
  appointment: Appointment;
  workerId: string | undefined;
}

const EditAppointmentForms: React.FC<EditAppointmentFormsProps> = ({
  appointment,
  workerId,
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      service_duration: appointment.service_duration,
    },
  });

  const { data: services }: { data: any } = useQuery(
    ["services"],
    apiServices.getServices
  );

  const filteredServices = services?.data.filter((service: Service) =>
    service.workers_ids.includes(workerId!)
  );

  const serviceName = filteredServices?.find(
    (service: { id: string }) => service.id === appointment.service_id
  )?.name;

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      service_duration: Number(data.service_duration),
    };
    console.log(formattedData);
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
    >
      <FormControl mb={4}>
        <FormLabel>Izabrana usluga</FormLabel>
        <Text>{serviceName}</Text>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Trajanje usluge</FormLabel>
        <Controller
          control={control}
          name="service_duration"
          render={({ field }) => (
            <Input
              type="number"
              placeholder={`Trajanje usluge`}
              {...field}
              defaultValue={appointment.service_duration || ""}
              required
            />
          )}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Ime i prezime klijenta</FormLabel>
        <Text>{appointment.customer_name}</Text>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Broj telefona klijenta</FormLabel>
        <Text>{appointment.customer_number}</Text>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Napomena</FormLabel>
        <Text>{appointment.notes || "Nema napomena"}</Text>
      </FormControl>

      <Button type="submit" variant="blue">
        Sačuvaj Promene
      </Button>
    </Box>
  );
};

export default EditAppointmentForms;
