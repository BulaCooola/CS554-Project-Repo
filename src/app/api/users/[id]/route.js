import { userData } from "@/data/index.js";
import validation from "@/data/validation";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    params.id = validation.checkId(params.id);
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 400 });
  }

  try {
    const user = await userData.getUserById(params.id);
    return NextResponse.json(user);
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 404 });
  }
}
