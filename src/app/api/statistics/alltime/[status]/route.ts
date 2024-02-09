import { StatisticService } from "@/services/backend";
import { statusSchema } from "@/validation/schemas";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { status: string } }
) {
  const { error, value } = statusSchema.validate(params);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const statistics = await StatisticService.getMostAgendatedAllTime(
    value.status
  );
  if (!statistics) {
    return NextResponse.json(
      { error: "Error getting statistics" },
      { status: 500 }
    );
  }

  return NextResponse.json(statistics);
}
