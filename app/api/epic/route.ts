import { NextRequest, NextResponse } from "next/server";
import { getProjectEpics } from "@/features/epic/api/getProjectEpics";

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get("page") ?? "1");
  const projectId = request.nextUrl.searchParams.get("project_id") ?? "";

  const limit = 10;
  const offset = (page - 1) * limit;

  const result = await getProjectEpics(projectId, limit, offset);

  return NextResponse.json(result);
}
