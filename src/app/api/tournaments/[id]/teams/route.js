import { bracketData } from "@/data/index.js";
import { NextResponse } from "next/server";
import validation from "@/data/validation";

export async function GET(req, { params }) {
  try {
    params.id = validation.checkId(params.id);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
  try {
    const teams = await bracketData.getTournamentTeams(params.id);
    return NextResponse.json(teams);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 404 });
  }
}
