import React, { useState, useRef } from "react";
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import "./customCalendarStyles.scss";
import apiServices from "../../../../services/index";
import { useQuery } from "@tanstack/react-query";
import { useDisclosure } from "@chakra-ui/react";
import SelectDayModal from "./selectDayModal";

const AdminFullCalendar: React.FC = () => {
  const { data: appointments } = useQuery(
    ["appointments"],
    apiServices.getAppointments
  );
  const [weekendsVisible, setWeekendsVisible] = useState<boolean>(true);
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const fullCalendarRef = useRef<FullCalendar>(null);

  const {
    isOpen: isSelectDayModalOpen,
    onOpen: onSelectDayModalOpen,
    onClose: onSelectDayModalClose,
  } = useDisclosure();

  function getItemsInDay(items: any = [], targetDayInMillis: any) {
    // Create a Date object for the target day
    const targetDate = new Date(targetDayInMillis);

    // Set the time to the start of the day (00:00:00)
    targetDate.setHours(0, 0, 0, 0);
    const startOfDay = targetDate.getTime();

    // Set the time to the end of the day (23:59:59.999)
    targetDate.setHours(23, 59, 59, 999);
    const endOfDay = targetDate.getTime();

    // Filter the array to get items within the start and end of the day
    return items?.filter(
      (item: any) => item.date >= startOfDay && item.date <= endOfDay
    );
  }

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectedDate(selectInfo.start);
    onSelectDayModalOpen();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
  };

  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <div className="fc-event-inner">
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </div>
    );
  };

  const addEvent = (title: string, start: Date, end: Date) => {
    // console.log(start);
    // console.log(end);
    const calendarApi = fullCalendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start,
        end,
        allDay: false,
      });
    }
    onSelectDayModalClose();
  };

  const dayCellClassNames = (date: Date) => {
    const day = date.getDay();
    const hour = date.getHours();
    let classes = [];

    if (day >= 1 && day <= 5) {
      classes.push("fc-day-working");
    } else if (day === 6 && hour >= 9 && hour < 16) {
      classes.push("fc-day-working");
    }

    return classes;
  };

  // Calculate valid range
  const now = new Date();
  const startDate = new Date(now.getFullYear(), 4, 1); // May 1st of the current year
  const endDate = new Date(now.getFullYear(), now.getMonth() + 4, 0); // 3 months ahead from the current month

  return (
    <>
      <FullCalendar
        ref={fullCalendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next",
          right: "title",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={weekendsVisible}
        initialEvents={INITIAL_EVENTS}
        select={handleDateSelect}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        eventsSet={handleEvents}
        dayCellClassNames={arg => dayCellClassNames(arg.date)}
        validRange={{
          start: startDate.toISOString().split("T")[0],
          end: endDate.toISOString().split("T")[0],
        }}
      />
      {appointments && (
        <SelectDayModal
          isOpen={isSelectDayModalOpen}
          onClose={onSelectDayModalClose}
          selectedDate={selectedDate}
          onAddEvent={addEvent}
          appointments={getItemsInDay(
            appointments?.data || [],
            selectedDate?.getTime()
          )}
        />
      )}
    </>
  );
};

export default AdminFullCalendar;
