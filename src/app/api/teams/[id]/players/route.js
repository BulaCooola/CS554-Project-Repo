import { teamData } from "@/data/index.js";
import { NextResponse } from "next/server";
import validation from "@/data/validation";

export async function GET(req, { params }) {
  try {
    params.id = validation.checkId(params.id);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }

  try {
    const players = await teamData.getTeamsPlayers(params.id);
    return NextResponse.json(players);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 404 });
  }
}
