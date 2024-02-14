import * as bcryptHelper from "@/helpers/bcrypt.helper";
import type { IPayload, IUser } from "@/interfaces";
import { UserService } from "@/services/backend";
import { forgetPswSchema } from "@/validation/schemas";
import { decode as jwtDecode } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const body = await request.json();
  const { error, value } = forgetPswSchema.validate(body);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  try {
    const payload = (await jwtDecode({
      secret: process.env.SECRET_KEY || "secretkey",
      token: value.resetToken,
    })) as unknown as IPayload;

    const userFound = await UserService.getUser(payload.userId, payload.email);
    if (!userFound) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const auth = await bcryptHelper.verifyPassword(
      value.password,
      userFound.password!
    );
    if (auth) {
      return NextResponse.json(
        { error: "None password updated" },
        { status: 400 }
      );
    }

    const passwordChanged = await UserService.updateUser(userFound.id, {
      password: await bcryptHelper.encryptPassword(value.password),
    } as IUser);
    if (!passwordChanged) {
      return NextResponse.json(
        { error: "Error updating password" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: "Password updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
