import { teamData } from "@/data/index.js";
import { NextResponse } from "next/server";
import validation from "@/data/validation";

export async function GET(req, { params }) {
  try {
    params.sport = validation.checkSport(params.sport);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
  try {
    const teams = await teamData.getTeamsBySport(params.sport);
    return NextResponse.json(teams);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 404 });
  }
}
