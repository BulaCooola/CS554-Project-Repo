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
    const team = await teamData.getTeamById(params.id);
    return NextResponse.json(team);
  } catch (error) {
    return NextResponse.json({ error: e }, { status: 404 });
  }
}
