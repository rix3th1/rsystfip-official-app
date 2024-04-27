import * as nmHelper from "@/helpers/nodemailer.helper";
import { sendEmailSchema } from "@/validation/schemas";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { error, value } = sendEmailSchema.validate(body);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const { email: to, subject, html } = value;

  const msgSended = await nmHelper.sendEmail(to, subject, html);
  if (msgSended?.error) {
    return NextResponse.json(
      { error: `Error sending email to ${to}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: `Email sended to ${to}` });
}
