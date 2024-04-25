import { bracketData } from "@/data/index.js";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const allTournaments = await bracketData.getAllBrackets();
    return NextResponse.json({ allTournaments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
