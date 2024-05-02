import { bracketData } from "@/data/index.js";
import { NextResponse } from "next/server";
import { URL } from "url";

export async function GET(req) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const searchParams = url.searchParams;
    const organizerId = searchParams.get("playerId");
    const response = await bracketData.getBracketsByOrganizer(organizerId);
    if (response) {
      const allBrackets = response;
      return NextResponse.json({ allBrackets }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
