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
  Stack,
  Divider,
} from "@chakra-ui/react";
import apiServices, { Appointment } from "../../../../services";
import { useQuery } from "@tanstack/react-query";

interface SelectDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onAddEvent: (title: string, start: Date, end: Date) => void;
  appointments?: Appointment[];
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

const getServiceTimeRange = (
  startMillis: number,
  durationMinutes: number
): { startTime: string; endTime: string } => {
  const serviceDurationInMillis = durationMinutes * 60 * 1000;
  const endTimeInMillis = serviceDurationInMillis + startMillis;

  const convertMillisToTime = (millis: number): string => {
    const date = new Date(millis);
    return date.toLocaleTimeString("sr-RS", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const startTime = convertMillisToTime(startMillis);
  const endTime = convertMillisToTime(endTimeInMillis);

  return { startTime, endTime };
};

const SelectDayModal: React.FC<SelectDayModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  onAddEvent,
  appointments,
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

  const getWorkerNameById = (workerId: string) => {
    const worker = workers?.data.find(worker => worker.id === workerId);
    return worker ? worker.name : "Nepoznato ime radnice";
  };

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
                {appointments?.map(appointment => (
                  <TabPanel key={appointment.worker_id}>
                    <Stack>
                      <Text fontSize="xl" fontWeight="bold" mb={4}>
                        Slobodni termini
                      </Text>

                      <Grid templateColumns="repeat(6, 1fr)" gap={4}>
                        {timeSlots.map((slot, index) => (
                          <GridItem key={index}>
                            <Button
                              width="100%"
                              onClick={() => handleAddEvent(slot)}
                            >
                              {slot.toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })}
                            </Button>
                          </GridItem>
                        ))}
                      </Grid>
                    </Stack>
                    <Stack>
                      <Text fontSize="xl" fontWeight="bold" mb={4}>
                        Zauzeti termini
                      </Text>
                      <Box>
                        {appointments.map(appointment => {
                          const { startTime, endTime } = getServiceTimeRange(
                            appointment.date,
                            appointment.service_duration
                          );
                          const workerName = getWorkerNameById(
                            appointment.worker_id
                          );

                          return (
                            <Stack key={appointment.id}>
                              <Text>Početak termina: {startTime}</Text>
                              <Text>Kraj termina: {endTime}</Text>
                              <Text>Ime Radnice: {workerName}</Text>
                              <Divider />
                              <Text>
                                Ime Kupca: {appointment.customer_name}
                              </Text>
                              <Text>
                                Broj Kupca: {appointment.customer_number}
                              </Text>
                            </Stack>
                          );
                        })}
                      </Box>
                    </Stack>
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
