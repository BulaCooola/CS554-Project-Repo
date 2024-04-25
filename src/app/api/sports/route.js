import { NextResponse } from "next/server";
import { sports } from "@/data/validation";
export async function GET(req) {
  return NextResponse.json({ sports }, { status: 200 });
}
