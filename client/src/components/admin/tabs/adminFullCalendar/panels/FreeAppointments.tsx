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
    <Text fontSize="xl" fontWeight="bold" mt={4} mb={2}>
      Slobodni termini
    </Text>
    {timeSlots.length === 0 ? (
      <Text color="black">Nema slobodnih termina</Text>
    ) : (
      <SimpleGrid columns={6} spacing={3}>
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
    )}
  </Box>
);

export default FreeAppointments;
