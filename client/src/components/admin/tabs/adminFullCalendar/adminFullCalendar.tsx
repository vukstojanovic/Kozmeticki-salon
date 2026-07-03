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
import { createEventId } from "./event-utils";
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
    const targetDate = new Date(targetDayInMillis);
    targetDate.setHours(0, 0, 0, 0);
    const startOfDay = targetDate.getTime();
    targetDate.setHours(23, 59, 59, 999);
    const endOfDay = targetDate.getTime();

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

  // Izračunaj opseg za 3 meseca unazad i 3 meseca unapred od trenutnog datuma
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  // 3 meseca unazad
  const startDate = new Date(currentYear, currentMonth - 3, 1);
  
  // 3 meseca unapred (poslednji dan trećeg meseca od sada)
  const endDate = new Date(currentYear, currentMonth + 4, 0); // +4 jer želimo kraj trećeg meseca unapred

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
        editable={false}
        droppable={false}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={weekendsVisible}
        select={handleDateSelect}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        eventsSet={handleEvents}
        dayCellClassNames={arg => dayCellClassNames(arg.date)}
        validRange={{
          start: startDate.toISOString().split("T")[0],
          end: endDate.toISOString().split("T")[0],
        }}
        longPressDelay={200}
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