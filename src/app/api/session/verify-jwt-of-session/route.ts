import { SECRET_KEY } from "@/config";
import type { IPayload } from "@/interfaces";
import Jwt from "jsonwebtoken";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const headersList = headers();
  const jwt = headersList.get("Authorization") || "";

  if (!jwt) {
    return NextResponse.json("Not session provided", { status: 401 });
  }

  try {
    const payload = Jwt.verify(jwt, SECRET_KEY || "secretkey") as IPayload;
    return NextResponse.json({ ok: { isValid: true, decoded: payload } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
