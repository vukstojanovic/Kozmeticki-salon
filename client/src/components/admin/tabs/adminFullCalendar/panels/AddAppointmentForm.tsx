import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import apiServices, { Service } from "../../../../../services";

interface AddAppointmentFormProps {
  workerId: string | undefined;
}

const AddAppointmentForm: React.FC<AddAppointmentFormProps> = ({
  workerId,
}) => {
  const { control, handleSubmit } = useForm();
  const [selectedService, setSelectedService] = useState("");

  const { data: services }: { data: any } = useQuery(
    ["services"],
    apiServices.getServices
  );

  const filteredServices = services?.data.filter((service: Service) =>
    service.workers_ids.includes(workerId!)
  );

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      service_duration: Number(data.service_duration),
    };

    console.log(formattedData);
  };

  const selectedServiceData = filteredServices?.find(
    (service: { id: string }) => service.id === selectedService
  );

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
        <FormLabel>Izaberi uslugu</FormLabel>
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

      <FormControl mb={4}>
        <FormLabel>Trajanje usluge</FormLabel>
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

      <FormControl mb={4}>
        <FormLabel>Ime i prezime klijenta</FormLabel>
        <Controller
          control={control}
          name="customerName"
          render={({ field }) => <Input type="text" {...field} required />}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Broj telefona klijenta</FormLabel>
        <Controller
          control={control}
          name="customerNumber"
          render={({ field }) => <Input type="text" {...field} required />}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Napomena</FormLabel>
        <Controller
          control={control}
          name="note"
          render={({ field }) => (
            <Textarea {...field} placeholder="Unesite napomenu" />
          )}
        />
      </FormControl>

      <Button type="submit" variant="blue">
        Dodaj Termin
      </Button>
    </Box>
  );
};

export default AddAppointmentForm;
