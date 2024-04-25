import { userData } from "@/data/index.js";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const userList = await userData.getAllUsers();
    return NextResponse.json({ userList }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
