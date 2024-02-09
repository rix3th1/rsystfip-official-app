import type { IDean } from "@/interfaces";
import { DeanService } from "@/services/backend";
import { deanSchema } from "@/validation/schemas";
import { NextResponse } from "next/server";

export async function GET() {
  const deans = await DeanService.getDeans();
  if (!deans) {
    return NextResponse.json({ error: "Error getting deans" }, { status: 500 });
  }

  return NextResponse.json(deans);
}

export async function POST(request: Request) {
  const body = await request.json();

  const { error, value } = deanSchema.validate(body);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const deanFound = await DeanService.getDean(value.id);
  if (deanFound) {
    return NextResponse.json({ error: "Dean already exists" }, { status: 409 });
  }

  const deanCreated = await DeanService.createDean(value as IDean);
  if (!deanCreated) {
    return NextResponse.json({ error: "Error creating dean" }, { status: 500 });
  }

  return NextResponse.json({ ok: "Dean created successfully", deanCreated });
}
