import React from "react";
import { Stack, Text, Divider } from "@chakra-ui/react";
import { Appointment } from "../../../../../services/index";

interface AppointmentDetailsProps {
  appointment: Appointment;
  workerName: string;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  appointment,
  workerName,
}) => {
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

  const { startTime, endTime } = getServiceTimeRange(
    appointment.date,
    appointment.service_duration
  );

  return (
    <Stack>
      <Text>Početak termina: {startTime}</Text>
      <Text>Kraj termina: {endTime}</Text>
      <Text>Ime Radnice: {workerName}</Text>
      <Divider />
      <Text>Ime Kupca: {appointment.customer_name}</Text>
      <Text>Broj Kupca: {appointment.customer_number}</Text>
    </Stack>
  );
};

export default AppointmentDetails;
