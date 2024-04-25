import { teamData } from "@/data/index.js";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const allTeams = await teamData.getAllTeams();
    return NextResponse.json({ allTeams }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
