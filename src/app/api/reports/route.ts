import { ReportService } from "@/services/backend";
import { filterSchema } from "@/validation/schemas";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const { error, value } = filterSchema.validate(searchParams);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const reports = await ReportService.getReports(
    value.start_time,
    value.end_time
  );
  if (!reports) {
    return NextResponse.json(
      { error: "Error getting reports" },
      { status: 500 }
    );
  }

  return NextResponse.json(reports);
}
