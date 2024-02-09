import type { ICanceledAppointment } from "@/interfaces";
import { CancellationService } from "@/services/backend";
import { cancellSchema } from "@/validation/schemas";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { error, value } = cancellSchema.validate(body);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const cancellationCreated = await CancellationService.createCancellation(
    value as ICanceledAppointment
  );
  if (!cancellationCreated) {
    return NextResponse.json(
      { error: "Error creating cancellation" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: "Cancellation in progress. Sending email...",
    cancellationCreated,
  });
}
