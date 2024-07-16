import React from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { Appointment } from "../../../../../services";

interface BusyAppointmentsProps {
  appointments?: Appointment[];
  selectedAppointment: Appointment | null;
  handleSlotClick: (appointment: Appointment) => void;
}

const BusyAppointments: React.FC<BusyAppointmentsProps> = ({
  appointments = [],
  selectedAppointment,
  handleSlotClick,
}) => {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Zauzeti termini
      </Text>
      {appointments.length === 0 ? (
        <Text color="black">Nema zauzetih termina</Text>
      ) : (
        <SimpleGrid columns={2} spacing={4}>
          {appointments.map(appointment => (
            <Box
              key={appointment.id}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              p={4}
              cursor="pointer"
              onClick={() => handleSlotClick(appointment)}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Text>
                  Početak termina:{" "}
                  {new Date(appointment.date).toLocaleTimeString("sr-RS", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </Text>
                <Text>Ime Kupca: {appointment.customer_name}</Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default BusyAppointments;
