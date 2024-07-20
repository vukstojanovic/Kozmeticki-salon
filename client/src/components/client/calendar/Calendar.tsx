import ReactCalendar from "react-calendar";
import "./Calendar.scss";
import { useQuery } from "@tanstack/react-query";
import apiServices from "../../../services";
import { useEffect } from "react";

const getAppointmentsForWorkerAndDate = (
  appointments: any = [],
  workerId: any,
  selectedDate: any
) => {
  return appointments?.filter((appointment: any) => {
    const appointmentDate = new Date(appointment.date);
    return (
      appointment.worker_id === workerId &&
      appointmentDate.toDateString() === selectedDate.toDateString()
    );
  });
};

const WORKING_HOURS = {
  weekday: { start: 9, end: 20 },
  saturday: { start: 9, end: 16 },
};

const isWeekend = (date: any) => date.getDay() === 6; // Saturday
const isSunday = (date: any) => date.getDay() === 0; // Sunday

// const generateTimeSlots = (startHour: any, endHour: any, durationMs: any) => {
//   const slots = [];
//   const durationMinutes = durationMs / 60000;

//   console.log(durationMinutes, "durationMinutes");

//   for (let hour = startHour; hour < endHour; hour++) {
//     for (let minute = 0; minute < 60; minute += durationMinutes) {
//       if (minute + durationMinutes <= 60) {
//         slots.push(
//           `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
//         );
//       }
//     }
//   }
//   return slots;
// };

const generateTimeSlots = (startHour: any, endHour: any, durationMs: any) => {
  const slots = [];
  const durationMinutes = durationMs / 60000;

  for (let hour = startHour; hour < endHour; hour++) {
    let minute = 0;
    while (minute < 60) {
      if (minute + durationMinutes <= 60) {
        slots.push(
          `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
        );
      }
      minute += durationMinutes;
    }
  }
  console.log(slots, "slots");
  return slots;
};

console.log(generateTimeSlots(9, 22, 540000), "hello");

const isTimeSlotAvailable = (
  slot: any,
  durationMs: any,
  appointments: any,
  selectedDate: any
) => {
  const slotStart = new Date(selectedDate);
  const hours = Number(slot.split(":")[0]);
  const minutes = Number(slot.split(":")[1]);
  slotStart.setHours(hours, minutes, 0, 0);
  const slotEnd = new Date(slotStart.getTime() + durationMs);

  return !appointments.some((appointment: any) => {
    const appointmentStart = new Date(appointment.date);
    const appointmentEnd = new Date(
      appointmentStart.getTime() + appointment.service_duration * 60000
    );

    return slotStart < appointmentEnd && slotEnd > appointmentStart;
    // return !(
    //   (appointmentStart >= slotStart && appointmentStart < slotEnd) ||
    //   (appointmentEnd > slotStart && appointmentEnd < slotEnd) ||
    //   (appointmentStart <= slotStart && appointmentEnd > slotEnd)
    // );
  });
};

const getAvailableTimeSlots = (
  appointments: any,
  selectedDate: any,
  workerId: any,
  serviceDurationMs: any
) => {
  if (isSunday(selectedDate)) return []; // No slots on Sunday

  const hours = isWeekend(selectedDate)
    ? WORKING_HOURS.saturday
    : WORKING_HOURS.weekday;
  const allSlots = generateTimeSlots(hours.start, hours.end, serviceDurationMs);
  const workerAppointments = getAppointmentsForWorkerAndDate(
    appointments,
    workerId,
    selectedDate
  );

  return allSlots.filter((slot) =>
    isTimeSlotAvailable(
      slot,
      serviceDurationMs,
      workerAppointments,
      selectedDate
    )
  );
};

export default function Calendar({
  onClickDay,
  value,
  selectedWorker,
  serviceDuration,
  setAvailableTimeSlots,
}: {
  onClickDay: (day: Date) => void;
  value: Date;
  selectedWorker: String | null;
  serviceDuration: Number;
  setAvailableTimeSlots: (slots: any) => void;
}) {
  const { data: appointments } = useQuery(
    ["appointments"],
    apiServices.getAppointments
  );

  const handleDayClick = (day: any) => {
    onClickDay(day);
    const availableSlots = getAvailableTimeSlots(
      appointments?.data,
      day,
      selectedWorker,
      serviceDuration
    );
    setAvailableTimeSlots(availableSlots);
  };

  const today = new Date();
  const minDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth() + 3,
    today.getDate()
  );

  useEffect(() => {
    const availableSlots = getAvailableTimeSlots(
      appointments?.data,
      value,
      selectedWorker,
      serviceDuration
    );
    setAvailableTimeSlots(availableSlots);
  }, [
    appointments?.data,
    selectedWorker,
    serviceDuration,
    setAvailableTimeSlots,
    value,
  ]);

  return (
    <ReactCalendar
      onClickDay={handleDayClick}
      value={value}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
}
