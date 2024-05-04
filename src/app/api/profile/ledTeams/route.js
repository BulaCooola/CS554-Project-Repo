import { teamData } from "@/data/index.js";
import { NextResponse } from "next/server";
import { URL } from "url";

export async function GET(req) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const searchParams = url.searchParams;
    const managerId = searchParams.get("playerId");
    const response = await teamData.getTeamsByManager(managerId);
    if (response) {
      const allTeams = response;
      return NextResponse.json({ allTeams }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
