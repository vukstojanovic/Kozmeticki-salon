import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Grid,
  GridItem,
  Text,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import apiServices, { AppointmentsData } from "../../../../services";
import { useQuery } from "@tanstack/react-query";

interface SelectDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onAddEvent: (title: string, start: Date, end: Date) => void;
  appointments?: AppointmentsData[];
}

const generateTimeSlots = (date: Date) => {
  const slots = [];
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  for (let i = 0; i < 48; i++) {
    const slotTime = new Date(start);
    slotTime.setMinutes(slotTime.getMinutes() + i * 30);
    slots.push(slotTime);
  }

  return slots;
};

const SelectDayModal: React.FC<SelectDayModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  onAddEvent,
  appointments = [],
}) => {
  const { data: workers } = useQuery(["workers"], apiServices.getWorkers);
  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];

  const handleAddEvent = (slot: Date) => {
    const title = prompt("Please enter a new title for your event");
    if (title) {
      const end = new Date(slot);
      end.setMinutes(slot.getMinutes() + 30);
      onAddEvent(title, slot, end);
    }
  };

  console.log(appointments);

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      blockScrollOnMount={false}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent display="flex" justifyContent="center" alignItems="center">
        <ModalHeader textAlign="center">
          Termini za {selectedDate?.toLocaleDateString()}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          pt={0}
          pb={5}
          px={0}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box width="100%">
            <Tabs>
              <TabList>
                {workers?.data.map(worker => (
                  <Tab key={worker.id}>{worker.name}</Tab>
                ))}
              </TabList>

              <TabPanels>
                {workers?.data.map(worker => (
                  <TabPanel key={worker.id}>
                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                      Slobodni termini
                    </Text>
                    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                      {timeSlots.map((slot, index) => (
                        <GridItem key={index}>
                          <Button
                            width="100%"
                            onClick={() => handleAddEvent(slot)}
                          >
                            {slot.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Button>
                        </GridItem>
                      ))}
                    </Grid>
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SelectDayModal;
