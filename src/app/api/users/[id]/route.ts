import { UserService } from "@/services/backend";
import { idSchema } from "@/validation/schemas";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { error, value } = idSchema.validate(params);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const userFound = await UserService.getUser(value.id);
  if (!userFound) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(userFound);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const { error, value } = idSchema.validate(params);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const userDeleted = await UserService.deleteUser(value.id);
  if (!userDeleted) {
    return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
  }

  return NextResponse.json({ ok: "User deleted successfully", userDeleted });
}
