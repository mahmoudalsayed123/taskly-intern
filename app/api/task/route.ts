import { NextRequest, NextResponse } from "next/server";
import { getTasksList } from "@/features/tasks/api/getTasksList";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const projectId = searchParams.get("projectId") ?? "";
  const search = searchParams.get("search") ?? "";

  const limit = 10;

  const offset = Number(searchParams.get("offset") ?? "0");

  const result = await getTasksList(projectId, limit, offset, search);

  return NextResponse.json(result);
}
