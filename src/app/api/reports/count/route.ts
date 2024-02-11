import { ReportService } from "@/services/backend";
import { filterSchema } from "@/validation/schemas";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const { error, value } = filterSchema.validate({
    start_time: searchParams.get("start_time"),
    end_time: searchParams.get("end_time"),
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const count = await ReportService.getReportCount(
    value.start_time,
    value.end_time
  );
  if (!count) {
    return NextResponse.json(
      { error: "Error getting report count" },
      { status: 500 }
    );
  }

  return NextResponse.json(count);
}
