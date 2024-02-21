import type { IUser } from "@/interfaces";
import { UserService } from "@/services/backend";
import { userSchema } from "@/validation/schemas";
import { NextResponse } from "next/server";
import * as bcryptHelper from "@/helpers/bcrypt.helper";

export async function GET() {
  const usersFound = await UserService.getUsers();
  if (!usersFound) {
    return NextResponse.json({ error: "Error getting users" }, { status: 500 });
  }

  return NextResponse.json(usersFound);
}

export async function POST(request: Request) {
  const body = await request.json();

  const { error, value } = userSchema.validate(body);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const userExists = await UserService.getUser(
    `${+value.role_id - 1}`,
    value.email
  );
  if (!userExists) {
    const newUser: Partial<IUser> = {
      id: `${+value.role_id - 1}`,
      document_id: value.document_id,
      document_number: value.document_number,
      first_name: value.first_name,
      last_name: value.last_name,
      role_id: value.role_id,
      phone_number: value.phone_number,
      email: value.email,
      password: await bcryptHelper.encryptPassword(value.password),
    };
    const userCreated = await UserService.createUser(newUser);
    if (!userCreated) {
      return NextResponse.json(
        { error: "Error creating user" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: "User created successfully", userCreated });
  }

  if (value.email === userExists.email) {
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 409 }
    );
  }

  return NextResponse.json({ error: "User already exists" }, { status: 409 });
}
