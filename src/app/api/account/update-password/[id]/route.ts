import * as bcryptHelper from "@/helpers/bcrypt.helper";
import type { IUser } from "@/interfaces";
import { UserService } from "@/services/backend";
import { changePswSchema } from "@/validation/schemas";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const { error, value } = changePswSchema.validate({
    ...body,
    ...params,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const userFound = await UserService.getUser(value.id);
  if (!userFound) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const auth = await bcryptHelper.verifyPassword(
    value.current_password,
    userFound.password!
  );
  if (!auth) {
    return NextResponse.json(
      { error: "Current password incorrect" },
      { status: 401 }
    );
  }

  const passwordChanged = await UserService.updateUser(userFound.id, {
    password: await bcryptHelper.encryptPassword(value.new_password),
  } as IUser);
  if (!passwordChanged) {
    return NextResponse.json(
      { error: "Error updating password" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: "Password updated successfully" });
}
