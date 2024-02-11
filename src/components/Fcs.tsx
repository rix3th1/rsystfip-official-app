"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { FullCalendarScheduling } from ".";

function Fcs() {
  const plugins = [dayGridPlugin, timeGridPlugin];

  return (
    <FullCalendarScheduling
      right="timeGridDay,timeGridWeek"
      initialView="timeGridDay"
      plugins={plugins}
    />
  );
}

export default Fcs;
