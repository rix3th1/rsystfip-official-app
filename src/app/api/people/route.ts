import type { IPeople } from "@/interfaces";
import { PeopleService } from "@/services/backend";
import { schedulerSchema } from "@/validation/schemas";
import { NextResponse } from "next/server";

export async function GET() {
  const peopleFound = await PeopleService.getPeople();
  if (!peopleFound) {
    return NextResponse.json(
      { error: "Error getting people" },
      { status: 500 }
    );
  }

  return NextResponse.json(peopleFound);
}

export async function POST(request: Request) {
  const body = await request.json();

  const { error, value } = schedulerSchema.validate(body);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const newPerson: IPeople = {
    first_name: value.first_name,
    last_name: value.last_name,
    document_id: value.document_id,
    document_number: value.document_number,
    phone_number: value.phone_number,
    email: value.email,
    category_id: value.category_id,
    faculty_id: value.faculty_id,
  };
  const personCreated = await PeopleService.createPerson(newPerson);
  if (!personCreated) {
    return NextResponse.json(
      { error: "Error creating person" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: "Person created successfully",
    personCreated,
  });
}
