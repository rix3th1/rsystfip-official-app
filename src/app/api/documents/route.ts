import { DocumentService } from "@/services/backend";
import { NextResponse } from "next/server";

export async function GET() {
  const documents = await DocumentService.getDocuments();
  if (!documents) {
    return NextResponse.json(
      { error: "Error getting documents" },
      { status: 500 }
    );
  }

  return NextResponse.json(documents);
}
