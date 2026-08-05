import { NextRequest, NextResponse } from "next/server";
import { getProjects } from "@/features/project/api/getProjects";

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get("page") ?? "1");

  const limit = 10;
  const offset = (page - 1) * limit;

  const result = await getProjects(limit, offset);

  return NextResponse.json(result);
}
