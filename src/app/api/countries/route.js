import { NextResponse } from "next/server";
import { countryListAlpha3 } from "@/data/validation";
export async function GET(req) {
  return NextResponse.json({ countryListAlpha3 }, { status: 200 });
}
