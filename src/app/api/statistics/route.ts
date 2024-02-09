import pkg from "@/../package.json";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
    contributors: pkg.contributors,
  });
}
