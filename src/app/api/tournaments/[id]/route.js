import { bracketData } from "@/data/index.js";
import validation from "@/data/validation";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    params.id = validation.checkId(params.id);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }

  try {
    const tournament = await bracketData.getBracketById(params.id);
    return NextResponse.json(tournament);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 404 });
  }
}
