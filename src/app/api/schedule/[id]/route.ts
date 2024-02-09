import { AppointmentStatus, type IAppointment } from "@/interfaces";
import { ScheduleService } from "@/services/backend";
import { idSchema } from "@/validation/schemas";
import { NextResponse } from "next/server";

export async function PATCH(
  _: Request,
  { params }: { params: { id: string } }
) {
  const { error, value } = idSchema.validate(params);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const scheduleFound = await ScheduleService.getSchedule(value.id);
  if (!scheduleFound) {
    return NextResponse.json({ error: "Schedule not found" }, { status: 404 });
  }

  if (scheduleFound.status === AppointmentStatus.cancelled) {
    return NextResponse.json(
      { error: "Schedule already cancelled" },
      { status: 400 }
    );
  }

  const newScheduleCancelled: Partial<IAppointment> = {
    status: AppointmentStatus.cancelled,
  };
  const scheduleCancelled = await ScheduleService.updateSchedule(
    newScheduleCancelled,
    scheduleFound.person_id,
    scheduleFound.start_time
  );
  if (!scheduleCancelled) {
    return NextResponse.json(
      { error: "Schedule not cancelled" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: "Cancellation schedule pending...",
    scheduleCancelled: { ...scheduleFound, ...scheduleCancelled },
  });
}
