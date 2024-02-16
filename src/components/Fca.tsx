"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { FullCalendarScheduling } from ".";

function Fca(): React.ReactNode {
  const plugins = [dayGridPlugin, listPlugin];

  return (
    <FullCalendarScheduling
      right="listMonth,dayGridMonth"
      initialView="listMonth"
      plugins={plugins}
    />
  );
}

export default Fca;
