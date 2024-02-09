import { PeopleService } from "@/services/backend";
import { NextResponse } from "next/server";

export async function GET() {
  const peopleCancelled = await PeopleService.getCancelledPeople();
  if (!peopleCancelled) {
    return NextResponse.json(
      { error: "Error getting cancelled people" },
      { status: 500 }
    );
  }

  return NextResponse.json(peopleCancelled);
}
