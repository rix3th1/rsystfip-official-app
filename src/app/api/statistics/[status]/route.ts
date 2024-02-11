import { StatisticService } from "@/services/backend";
import { statisticfilterSchema } from "@/validation/schemas";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { status: string } }
) {
  const searchParams = request.nextUrl.searchParams;

  const { error, value } = statisticfilterSchema.validate({
    ...params,
    start_time: searchParams.get("start_time"),
    end_time: searchParams.get("end_time"),
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const statistics = await StatisticService.getStatistics(
    value.status,
    value.start_time,
    value.end_time
  );
  if (!statistics) {
    return NextResponse.json(
      { error: "Error getting statistics" },
      { status: 500 }
    );
  }

  return NextResponse.json(statistics);
}
