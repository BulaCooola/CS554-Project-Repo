import { teamData } from "@/data/index.js";
import validation from "@/data/validation";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    params.id = validation.checkId(params.id);
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 400 });
  }

  try {
    const teams = await teamData.getTeamsByPlayer(params.id);
    return NextResponse.json(teams);
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 404 });
  }
}
