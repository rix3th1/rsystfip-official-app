import type { IPayload } from "@/interfaces";
import { decode as jwtDecode } from "next-auth/jwt";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const headersList = headers();
  const jwt = headersList.get("Authorization");

  if (!jwt) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  try {
    const payload = (await jwtDecode({
      secret: process.env.SECRET_KEY || "secretkey",
      token: jwt,
    })) as unknown as IPayload;

    return NextResponse.json({ tokenIsValid: true, email: payload.email });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
