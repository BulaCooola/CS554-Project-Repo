import { userData } from "@/data/index.js";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const flushData = await userData.flushRedis();
  } catch (e) {
    return NextResponse.json({ error: "Did not flush cache" }, { status: 500 });
  }
  return NextResponse.json({ done: "Flushed Redis Cache Successfully" }, { status: 200 });
}
