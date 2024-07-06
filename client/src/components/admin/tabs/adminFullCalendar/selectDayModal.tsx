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
} from "@chakra-ui/react";
import apiServices, { Appointment } from "../../../../services";
import { useQuery } from "@tanstack/react-query";

import FreeAppointments from "./panels/FreeAppointments";
import BusyAppointments from "./panels/BusyAppointments";
import AddAppointmentForm from "./panels/AddAppointmentForm";
import AppointmentDetails from "./panels/AppointmentDetails";

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
    service: string
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
    return slots; // No slots on Sunday
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

  const { data: workers } = useQuery(["workers"], apiServices.getWorkers);
  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];

  const handleAddEvent = () => {
    if (newEventTitle && selectedSlot) {
      const end = new Date(selectedSlot);
      end.setMinutes(selectedSlot.getMinutes() + 30);
      onAddEvent(
        newEventTitle,
        selectedSlot,
        end,
        newCustomerName,
        newCustomerNumber,
        newService
      );
      setSelectedSlot(null);
      setNewEventTitle("");
      setNewCustomerName("");
      setNewCustomerNumber("");
      setNewService("");
      setSelectedAppointment(null); // Reset selected appointment
    }
  };

  const handleSlotClick = (appointment: Appointment) => {
    setSelectedAppointment(
      selectedAppointment?.id === appointment.id ? null : appointment
    );
    setSelectedSlot(null); // Clear selected slot when clicking on existing appointment
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
        <ModalBody pt={0} pb={5} px={5} w="full">
          <Box width="100%">
            <Tabs>
              <TabList>
                {workers?.data.map(worker => (
                  <Tab fontSize="18px" lineHeight="20px" key={worker.id}>
                    {worker.name}
                  </Tab>
                ))}
              </TabList>

              <TabPanels>
                {workers?.data.map(worker => (
                  <TabPanel key={worker.id}>
                    <Stack>
                      {selectedSlot ? (
                        <AddAppointmentForm
                          newEventTitle={newEventTitle}
                          newCustomerName={newCustomerName}
                          newCustomerNumber={newCustomerNumber}
                          newService={newService}
                          setNewEventTitle={setNewEventTitle}
                          setNewCustomerName={setNewCustomerName}
                          setNewCustomerNumber={setNewCustomerNumber}
                          setNewService={setNewService}
                          handleAddEvent={handleAddEvent}
                        />
                      ) : selectedAppointment &&
                        selectedAppointment.worker_id === worker.id ? (
                        <AppointmentDetails
                          appointment={selectedAppointment}
                          workerName={worker.name}
                        />
                      ) : (
                        <>
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
                        </>
                      )}
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
