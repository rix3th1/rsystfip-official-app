import type { IPayload } from "@/interfaces";
import Jwt from "jsonwebtoken";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const headersList = headers();
  const jwt = headersList.get("Authorization");

  if (!jwt) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  try {
    const payload = Jwt.verify(
      jwt,
      process.env.SECRET_KEY || "secretkey"
    ) as IPayload;
    return NextResponse.json({ tokenIsValid: true, email: payload.email });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
