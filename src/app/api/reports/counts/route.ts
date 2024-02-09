import { ReportService } from "@/services/backend";
import { NextResponse } from "next/server";

export async function GET() {
  const counts = await ReportService.getReportCounts();
  if (!counts) {
    return NextResponse.json(
      { error: "Error getting report counts" },
      { status: 500 }
    );
  }

  return NextResponse.json(counts);
}
