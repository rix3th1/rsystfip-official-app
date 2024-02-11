"use client";

import { notify } from "@/libs/notify";
import {
  AppointmentStatus,
  setFormData,
  type FormDataState,
} from "@/redux/features/appointments/appointmentsSlice";
import {
  setCalendarEvents,
  type ICalendarState,
} from "@/redux/features/calendar/calendarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { scheduleService } from "@/services";
import { propsAction } from "@/types/propsAction";
import type { EventSourceInput, PluginDef } from "@fullcalendar/core";
import esLocale from "@fullcalendar/core/locales/es";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { TableContainer } from "@mui/material";
import { format } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import ModalCancellPersonConfirmation from "./ModalCancellPersonConfirmation";
import ModalSchedulePeopleForm from "./ModalSchedulePeopleForm";
import { LoadCalendar } from "./ui";

interface IProps {
  right: string;
  initialView: string;
  plugins: PluginDef[];
}

const action = propsAction.schedule;

function FullCalendarScheduling({
  right,
  initialView,
  plugins,
}: IProps): React.ReactNode {
  const dispatch = useAppDispatch();
  const formDataState: FormDataState = useAppSelector(
    ({ appointments }) => appointments.formData.schedule
  );
  const calendarEventsState: ICalendarState = useAppSelector(
    ({ calendar }) => calendar
  );

  // Modal states
  const [stateModalCancell, setStateModalCancell] = useState(false);
  const [stateModalScheduling, setStateModalScheduling] = useState(false);

  // Modal methods
  const closeModalCancell = useCallback(() => setStateModalCancell(false), []);
  const showModalCancell = () => setStateModalCancell(true);
  const closeModalScheduling = useCallback(
    () => setStateModalScheduling(false),
    []
  );
  const showModalScheduling = () => setStateModalScheduling(true);

  const loadEventsRef = useRef<HTMLDivElement>(null);

  const { data, error } = useQuery<[], any>(
    [propsAction.schedule, calendarEventsState.changes],
    scheduleService.getEvents
  );

  useEffect(() => {
    if (data) dispatch(setCalendarEvents(data));
    if (error) notify(error.response.data.error, { type: "error" });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <TableContainer>
      <LoadCalendar loadEventsRef={loadEventsRef} />

      <ModalSchedulePeopleForm
        stateModalScheduling={stateModalScheduling}
        closeModalScheduling={closeModalScheduling}
      />

      <ModalCancellPersonConfirmation
        stateModalCancell={stateModalCancell}
        closeModalCancell={closeModalCancell}
      />

      <div className="schg-sm">
        <FullCalendar
          initialView={initialView}
          plugins={[...plugins, interactionPlugin]}
          height="auto"
          locale="es-us"
          locales={[esLocale]}
          navLinks
          editable
          nowIndicator
          dayHeaders
          dayMaxEvents
          weekends
          weekNumbers
          weekNumberCalculation="ISO"
          selectable
          selectMirror
          headerToolbar={{
            left: "prevYear prev,next nextYear today",
            center: "title",
            right,
          }}
          dayHeaderFormat={{
            weekday: "long",
            day: "numeric",
          }}
          businessHours={{
            daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
            startTime: "06:00",
            endTime: "22:00",
          }}
          select={({ view, start, end }) => {
            if ("dayGridMonth" === view.type) return;

            const now = new Date();
            if (start < now) {
              view.calendar.unselect();
              notify("No se puede agendar en una fecha que ya ha pasado.", {
                type: "warning",
              });
              return;
            }

            if (
              start.getHours() < 6 ||
              end.getHours() > 21 ||
              end.getHours() === 0
            ) {
              // The selection is out of allow range, cancel
              view.calendar.unselect();
              notify("Agendamientos no disponible en ese horario.", {
                type: "warning",
              });
              return;
            }

            showModalScheduling();

            dispatch(
              setFormData([
                action,
                {
                  ...formDataState,
                  start_time: format(start, "yyyy-MM-dd HH:mm:ss"),
                  end_time: format(end, "yyyy-MM-dd HH:mm:ss"),
                  status: AppointmentStatus.scheduled,
                },
              ])
            );
          }}
          eventClick={({ event }) => {
            showModalCancell();

            dispatch(
              setFormData([
                action,
                {
                  ...formDataState,
                  id: event.id,
                },
              ])
            );
          }}
          events={calendarEventsState.calendarEvents as EventSourceInput}
          eventOrder="-start"
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
          }}
          loading={(state: boolean) => {
            if (loadEventsRef.current)
              loadEventsRef.current.style.display = state ? "block" : "none";
          }}
        />
      </div>
    </TableContainer>
  );
}

export default FullCalendarScheduling;
