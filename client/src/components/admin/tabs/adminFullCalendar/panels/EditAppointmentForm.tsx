import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Stack,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Appointment } from "../../../../../services/index";
import apiServices from "../../../../../services";
import { useServiceName } from "../../../../../hooks/useServiceName";

interface EditAppointmentFormsProps {
  appointment: Appointment;
}

const EditAppointmentForms: React.FC<EditAppointmentFormsProps> = ({
  appointment,
}) => {
  console.log(appointment);
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      service_duration: appointment.service_duration / 60000,
    },
  });
  const { serviceName } = useServiceName(appointment.service_id);

  const updateMutation = useMutation(apiServices.updateAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["appointments"]);
      reset();
    },
    onError: error => {
      console.error("Greška prilikom editovanja termina:", error);
    },
  });

  const deleteMutation = useMutation(apiServices.deleteAppointment, {
    onSuccess: data => {
      console.log("Uspešno obrisan termin:", data);
      queryClient.invalidateQueries(["appointments"]);
      reset();
    },
    onError: error => {
      console.error("Greška prilikom brisanja termina:", error);
    },
  });

  const onSubmit = (data: any) => {
    updateMutation.mutate({
      data: {
        ...appointment,
        service_duration: Number(data.service_duration) * 60000,
      },
      id: appointment.id,
    });
  };

  const deleteAppointment = (id: string) => {
    deleteMutation.mutate(id);
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
      <Stack direction="column" spacing={3}>
        <FormControl>
          <FormLabel fontWeight="bold" mb={0}>
            Izabrana usluga
          </FormLabel>
          <Text>{serviceName}</Text>
        </FormControl>

        <FormControl>
          <FormLabel fontWeight="bold" mb={0}>
            Trajanje usluge (min)
          </FormLabel>
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

        <FormControl>
          <FormLabel fontWeight="bold" mb={0}>
            Ime i prezime klijenta
          </FormLabel>
          <Text>{appointment.customer_name}</Text>
        </FormControl>

        <FormControl>
          <FormLabel fontWeight="bold" mb={0}>
            Broj telefona klijenta
          </FormLabel>
          <Text>{appointment.customer_number}</Text>
        </FormControl>

        <FormControl>
          <FormLabel fontWeight="bold" mb={0}>
            Napomena
          </FormLabel>
          <Text>{appointment.notes || "Nema napomena"}</Text>
        </FormControl>
      </Stack>

      <Stack direction="row" spacing={4}>
        <Button type="submit" variant="blue">
          Sačuvaj Promene
        </Button>
        <Button
          type="button"
          variant="red"
          onClick={() => {
            if (appointment.id) {
              deleteAppointment(appointment.id);
            } else {
              console.error("ID termina nije definisan.");
            }
          }}
        >
          Obriši termin
        </Button>
      </Stack>
    </Box>
  );
};

export default EditAppointmentForms;
