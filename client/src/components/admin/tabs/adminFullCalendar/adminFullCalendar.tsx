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

interface AdminFullCalendarState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
}

const AdminFullCalendar: React.FC = () => {
  const { data: appointments } = useQuery(
    ["appointments"],
    apiServices.getAppointments
  );
  const [weekendsVisible, setWeekendsVisible] = useState<boolean>(true);
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const fullCalendarRef = useRef<FullCalendar>(null); // Dodaj useRef

  const {
    isOpen: isSelectDayModalOpen,
    onOpen: onSelectDayModalOpen,
    onClose: onSelectDayModalClose,
  } = useDisclosure();

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
      <>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </>
    );
  };

  const addEvent = (title: string, start: Date, end: Date) => {
    const calendarApi = fullCalendarRef.current?.getApi(); // Koristi useRef za pristup API-ju
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

  const getBusySlots = (date: Date) => {
    if (!currentEvents || currentEvents.length === 0) {
      return [];
    }
    return currentEvents.filter(
      event =>
        event.start &&
        event.end &&
        event.start.toDateString() === date.toDateString()
    );
  };

  return (
    <>
      <FullCalendar
        ref={fullCalendarRef} // Poveži useRef sa FullCalendar komponentom
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={weekendsVisible}
        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        eventsSet={handleEvents} // called after events are initialized/added/changed/removed
      />
      <SelectDayModal
        isOpen={isSelectDayModalOpen}
        onClose={onSelectDayModalClose}
        selectedDate={selectedDate}
        onAddEvent={addEvent}
        appointments={appointments ? [appointments] : []}
      />
    </>
  );
};

export default AdminFullCalendar;
