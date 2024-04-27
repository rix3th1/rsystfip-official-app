import * as nmHelper from "@/helpers/nodemailer.helper";
import type { IPayload } from "@/interfaces";
import { UserService } from "@/services/backend";
import { emailItfipSchema, sendEmailSchema } from "@/validation/schemas";
import { encode as jwtEncode } from "next-auth/jwt";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const emailValidated = emailItfipSchema.validate(body);
  if (emailValidated.error) {
    return NextResponse.json(
      { error: emailValidated.error.message },
      { status: 400 }
    );
  }

  const userFound = await UserService.getUser(
    undefined,
    emailValidated.value.email
  );
  if (!userFound) {
    return NextResponse.json(
      { error: "Email isn't registered" },
      { status: 404 }
    );
  }

  const payload: Partial<IPayload> = {
    userId: userFound.id,
    email: userFound.email,
  };
  const token = await jwtEncode({
    secret: process.env.NEXTAUTH_SECRET || "secretkey",
    token: payload,
    maxAge: 3 * 60,
  });

  const headersList = headers();
  const origin = headersList.get("origin") || "";
  const resetPasswordLink = `${origin}/recover-password/change?token=${token}`;
  const msg = `Dear ${userFound.first_name} ${userFound.last_name}, we have received a request to change the password for your account. If it wasn't you, please ignore this email.<br>If it was you, please click on the following link to reset your password:<br>${resetPasswordLink}<br><strong>This link will expire in 3 minutes.</strong><br><br>Sincerely,<br>Team ITFIP - RSystfip`;

  const sgValidated = sendEmailSchema.validate({
    email: emailValidated.value.email,
    subject: "Request of change password",
    html: msg,
  });
  if (sgValidated.error) {
    return NextResponse.json(
      { error: sgValidated.error.message },
      { status: 400 }
    );
  }

  const { email: to, subject, html } = sgValidated.value;

  const msgSended = await nmHelper.sendEmail(to, subject, html);
  if (msgSended?.error) {
    return NextResponse.json(
      { error: `Error sending email to ${to}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: `Email sended to ${to}` });
}
