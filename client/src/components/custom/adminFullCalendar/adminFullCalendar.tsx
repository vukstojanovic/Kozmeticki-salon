import React, { useState } from "react";
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import "./customCalendarStyles.scss";

interface AdminFullCalendarState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
}

export default function AdminFullCalendar() {
  const state: AdminFullCalendarState = {
    weekendsVisible: true,
    currentEvents: [],
  };
  const [weekendsVisible, setWeekendsVisible] = useState<boolean>(true);
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title: string | null = prompt(
      "Please enter a new title for your event"
    );
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
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

  return (
    <FullCalendar
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
      /* you can update a remote database when these fire:
    eventAdd={function(){}}
    eventChange={function(){}}
    eventRemove={function(){}}
    */
    />
  );
}
