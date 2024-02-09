import type { IAppointment } from "@/interfaces";
import { ScheduleService } from "@/services/backend";
import { scheduleSchema } from "@/validation/schemas";
import { NextResponse } from "next/server";

export async function GET() {
  const schedules = await ScheduleService.getSchedules();
  if (!schedules) {
    return NextResponse.json(
      { error: "Error getting schedules" },
      { status: 500 }
    );
  }

  return NextResponse.json(schedules);
}

export async function POST(request: Request) {
  const body = await request.json();

  const { error, value } = scheduleSchema.validate(body);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const scheduleCreated = await ScheduleService.createSchedule(
    value as IAppointment
  );
  if (!scheduleCreated) {
    return NextResponse.json(
      { error: "Error creating schedule" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: "Appointment created successfully",
    scheduleCreated,
  });
}
