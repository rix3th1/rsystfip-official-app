import { FacultyService } from "@/services/backend";
import { NextResponse } from "next/server";

export async function GET() {
  const faculties = await FacultyService.getFaculties();
  if (!faculties) {
    return NextResponse.json(
      { error: "Error getting faculties" },
      { status: 500 }
    );
  }

  return NextResponse.json(faculties);
}
