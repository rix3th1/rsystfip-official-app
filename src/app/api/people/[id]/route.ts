import type { IPeople } from "@/interfaces";
import { PeopleService } from "@/services/backend";
import { idSchema, peopleEditSchema } from "@/validation/schemas";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { error, value } = idSchema.validate(params);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const personFound = await PeopleService.getPerson(value.id);
  if (!personFound) {
    return NextResponse.json({ error: "Person not found" }, { status: 404 });
  }

  return NextResponse.json(personFound);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const { error, value } = peopleEditSchema.validate({
    ...params,
    ...body,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const personFound = await PeopleService.getPerson(value.id);
  if (!personFound) {
    return NextResponse.json({ error: "Person not found" }, { status: 404 });
  }

  const dataPerson: IPeople = {
    first_name: value.first_name,
    last_name: value.last_name,
    document_id: value.document_id,
    document_number: value.document_number,
    category_id: value.category_id,
    faculty_id: value.faculty_id,
    email: value.email,
    phone_number: value.phone_number,
  };
  const peopleEdited = await PeopleService.updatePerson(value.id, dataPerson);
  if (!peopleEdited) {
    return NextResponse.json({ error: "None person updated" }, { status: 500 });
  }

  return NextResponse.json({ ok: "Person updated successfully", peopleEdited });
}
