import ReactCalendar from "react-calendar";
import "./Calendar.scss";
import { useQuery } from "@tanstack/react-query";
import apiServices from "../../../services";
import { useEffect } from "react";

// gets all the appointments that the worker has on the selected day
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

function generateTimeSlots(startHour: any, endHour: any, durationMs: any) {
  const durationMinutes = durationMs / (1000 * 60); // Convert duration from milliseconds to minutes

  // Convert startHour and endHour to total minutes from midnight
  const startTotalMinutes = startHour * 60;
  const endTotalMinutes = endHour * 60;

  let currentMinutes = startTotalMinutes;
  const timeSlots = [];

  while (currentMinutes < endTotalMinutes) {
    const hh = Math.floor(currentMinutes / 60);
    const mm = currentMinutes % 60;
    const formattedTime = `${hh.toString().padStart(2, "0")}:${mm
      .toString()
      .padStart(2, "0")}`;

    // Ensure we do not exceed endHour
    if (currentMinutes + durationMinutes <= endTotalMinutes) {
      timeSlots.push(formattedTime);
    } else {
      break; // Stop adding slots if next slot exceeds endHour
    }

    // Move to the next time slot
    currentMinutes += durationMinutes;
  }

  return timeSlots;
}

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

  // return !appointments.some((appointment: any) => {
  //   const appointmentStart = new Date(appointment.date);
  //   const appointmentEnd = new Date(
  //     appointmentStart.getTime() + appointment.service_duration * 60000
  //   );

  //   return slotStart < appointmentEnd && slotEnd > appointmentStart;
  // });

  // This was the part the was causing problem. Previously, it was not checking the time slots and available times correctly.
  //  loop through all the appointments that the worker has on that day
  for (let i = 0; i < appointments.length; i++) {
    // get a specific appointment
    const appointment = appointments[i];

    const appointmentStart = new Date(appointment.date);
    const appointmentEnd = new Date(
      appointmentStart.getTime() + appointment.service_duration
    );

    //  logic for handling appointments
    if (
      (slotEnd >= appointmentStart && slotEnd <= appointmentEnd) ||
      (slotStart >= appointmentStart && slotStart < appointmentEnd)
    ) {
      return false;
    }
  }
  return true;
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
  return allSlots
    .filter((slot) =>
      isTimeSlotAvailable(
        slot,
        serviceDurationMs,
        workerAppointments,
        selectedDate
      )
    )
    .map((slot) => {
      const currentDate = new Date(selectedDate);
      const [hours, minutes] = slot.split(":");
      currentDate.setHours(parseInt(hours, 10));
      currentDate.setMinutes(parseInt(minutes, 10));
      currentDate.setSeconds(0);
      const currentDateInMs = currentDate.getTime();
      return { name: slot, value: currentDateInMs.toString() };
    });

  // return allSlots.reduce((acc, current) => {
  //   if (
  //     isTimeSlotAvailable(
  //       current,
  //       serviceDurationMs,
  //       workerAppointments,
  //       selectedDate
  //     )
  //   ) {
  //     const currentDate = new Date(selectedDate);
  //     const [hours, minutes] = current.split(":");
  //     currentDate.setHours(parseInt(hours, 10));
  //     currentDate.setMinutes(parseInt(minutes, 10));
  //     currentDate.setSeconds(0);
  //     console.log(typeof current, "current");
  //     const currentDateInMs = currentDate.getTime();
  //     acc.push({ name: current, value: currentDateInMs.toString() });
  //     return acc;
  //   }
  // }, []);
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

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (
      view === "month" &&
      (date < minDate || date > maxDate || date.getDay() === 0)
    ) {
      return "unavailable-date";
    }
    return null;
  };

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
      tileClassName={tileClassName}
    />
  );
}
