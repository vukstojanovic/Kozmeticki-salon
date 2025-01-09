import React from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { Appointment } from "../../../../../services";

interface FreeAppointmentsProps {
  appointments?: Appointment[];
  timeSlots: Date[];
  setSelectedSlot: (slot: Date | null) => void;
}

const FreeAppointments: React.FC<FreeAppointmentsProps> = ({
  timeSlots,
  setSelectedSlot,
  appointments,
}) => {
  const isSlotBooked = (slot: Date) => {
    if (!appointments) return false;

    return appointments.some(appointment => {
      const start = new Date(appointment.date);
      const end = new Date(start.getTime() + appointment.service_duration);

      const roundToMinute = (date: Date) =>
        new Date(Math.floor(date.getTime() / 60000) * 60000);

      const roundedStart = roundToMinute(start);
      const roundedEnd = roundToMinute(end);
      const roundedSlot = roundToMinute(slot);

      return (
        roundedSlot.getTime() >= roundedStart.getTime() &&
        roundedSlot.getTime() < roundedEnd.getTime()
      );
    });
  };

  const availableSlots = timeSlots.filter(slot => {
    if (!(slot instanceof Date)) return false;
    const isBooked = isSlotBooked(slot);
    return !isBooked;
  });

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mt={4} mb={2}>
        Slobodni termini
      </Text>
      {availableSlots.length === 0 ? (
        <Text color="black">Nema slobodnih termina</Text>
      ) : (
        <SimpleGrid columns={6} spacing={3}>
          {availableSlots.map(slot => (
            <Box
              key={slot.toISOString()}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              p={4}
              cursor="pointer"
              onClick={() => setSelectedSlot(slot)}
            >
              <Text>
                {slot.toLocaleTimeString("sr-RS", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default FreeAppointments;
