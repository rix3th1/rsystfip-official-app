import { CategoryService } from "@/services/backend";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await CategoryService.getCategories();
  if (!categories) {
    return NextResponse.json(
      { error: "Error getting categories" },
      { status: 500 }
    );
  }

  return NextResponse.json(categories);
}
