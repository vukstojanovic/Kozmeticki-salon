import React from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";

interface FreeAppointmentsProps {
  timeSlots: Date[];
  setSelectedSlot: (slot: Date | null) => void;
}

const FreeAppointments: React.FC<FreeAppointmentsProps> = ({
  timeSlots,
  setSelectedSlot,
}) => (
  <Box>
    <Text fontSize="xl" fontWeight="bold" mt={6} mb={4}>
      Slobodni termini
    </Text>
    <SimpleGrid columns={6} spacing={4}>
      {timeSlots.map(slot => (
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
  </Box>
);

export default FreeAppointments;
