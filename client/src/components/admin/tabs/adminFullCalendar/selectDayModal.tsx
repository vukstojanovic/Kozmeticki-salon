import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  Button,
  IconButton,
} from "@chakra-ui/react";
import apiServices, { Appointment } from "../../../../services";
import { useQuery } from "@tanstack/react-query";

import FreeAppointments from "./panels/FreeAppointments";
import BusyAppointments from "./panels/BusyAppointments";
import AddAppointmentForm from "./panels/AddAppointmentForm";
import EditAppointmentForm from "./panels/EditAppointmentForm";
import { ChevronLeftIcon } from "@chakra-ui/icons";

interface SelectDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onAddEvent: (
    title: string,
    start: Date,
    end: Date,
    customerName: string,
    customerNumber: string,
    service: string,
    workerId: number
  ) => void;
  appointments?: Appointment[];
}

const generateTimeSlots = (date: Date) => {
  const slots: Date[] = [];
  const dayOfWeek = date.getDay();
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  let startHour, endHour;

  if (dayOfWeek === 0) {
    // Sunday
    return slots;
  } else if (dayOfWeek === 6) {
    // Saturday
    startHour = 9;
    endHour = 16;
  } else {
    // Weekdays
    startHour = 9;
    endHour = 20;
  }

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const slotTime = new Date(start);
      slotTime.setHours(hour, minute, 0, 0);
      slots.push(slotTime);
    }
  }

  return slots;
};

const SelectDayModal: React.FC<SelectDayModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  onAddEvent,
  appointments,
}) => {
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerNumber, setNewCustomerNumber] = useState("");
  const [newService, setNewService] = useState("");
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const { data: workers } = useQuery(["workers"], apiServices.getWorkers);
  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];

  const handleAddEvent = () => {
    // if (newEventTitle && selectedSlot) {
    //   const end = new Date(selectedSlot);
    //   end.setMinutes(selectedSlot.getMinutes() + 30);
    //   const workerId = workers?.data[activeTabIndex].id;
    //   onAddEvent(
    //     newEventTitle,
    //     selectedSlot,
    //     end,
    //     newCustomerName,
    //     newCustomerNumber,
    //     newService,
    //     workerId
    //   );
    //   setSelectedSlot(null);
    //   setNewEventTitle("");
    //   setNewCustomerName("");
    //   setNewCustomerNumber("");
    //   setNewService("");
    //   setSelectedAppointment(null);
    // }
    console.log("dodato");
  };

  const handleSlotClick = (appointment: Appointment) => {
    setSelectedAppointment(
      selectedAppointment?.id === appointment.id ? null : appointment
    );
    setSelectedSlot(null); // Clear selected slot when clicking on existing appointment
  };

  const handleBack = () => {
    setSelectedAppointment(null);
    setSelectedSlot(null);
  };

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      blockScrollOnMount={false}
      onClose={() => {
        setSelectedAppointment(null);
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent display="flex" justifyContent="center" alignItems="center">
        <ModalHeader textAlign="center">
          Termini za {selectedDate?.toLocaleDateString()}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody w="full" pt={5} pb={5}>
          {selectedSlot || selectedAppointment ? (
            <Box>
              <IconButton
                onClick={handleBack}
                aria-label="Nazad"
                icon={<ChevronLeftIcon />}
                mb={4}
                variant="outline" // You can change this to "solid" or any other variant you prefer
              />
              {selectedSlot ? (
                <AddAppointmentForm
                  // handleAddEvent={handleAddEvent}
                  workerId={workers?.data[activeTabIndex].id}
                />
              ) : (
                selectedAppointment && (
                  <EditAppointmentForm
                    appointment={selectedAppointment}
                    workerId={
                      workers?.data.find(
                        worker => worker.id === selectedAppointment.worker_id
                      )?.name
                    }
                  />
                )
              )}
            </Box>
          ) : (
            <Box width="100%">
              <Tabs
                onChange={index => setActiveTabIndex(index)}
                display="flex"
                flexDirection="column"
                gap={5}
              >
                <TabList>
                  {workers?.data.map(worker => (
                    <Tab fontSize="18px" lineHeight="20px" key={worker.id}>
                      {worker.name}
                    </Tab>
                  ))}
                </TabList>

                <TabPanels
                  shadow="md"
                  borderWidth="1px"
                  borderRadius="md"
                  bg="white"
                >
                  {workers?.data.map(worker => (
                    <TabPanel key={worker.id}>
                      <Stack>
                        <BusyAppointments
                          appointments={appointments?.filter(
                            appointment => appointment.worker_id === worker.id
                          )}
                          selectedAppointment={selectedAppointment}
                          handleSlotClick={handleSlotClick}
                        />
                        <FreeAppointments
                          timeSlots={timeSlots}
                          setSelectedSlot={setSelectedSlot}
                        />
                      </Stack>
                    </TabPanel>
                  ))}
                </TabPanels>
              </Tabs>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SelectDayModal;
