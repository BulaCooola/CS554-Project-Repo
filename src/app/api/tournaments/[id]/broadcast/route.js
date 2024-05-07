import { bracketData } from "@/data/index.js";
import validation from "@/data/validation";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  // Get the messages current messages?
  try {
    const messages = await bracketData.getMessages(params.id);
    return NextResponse.json({ messages: messages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 404 });
  }
}

// export async function POST(req, { params }) {
//   // Post the messages
//   // Takes in id to check if it's the organizer
//   // Cleans the message
//   // send to database
//   try {
//     try {
//       params.id = validation.checkId(params.id);
//     } catch (e) {
//       return NextResponse.json({ error: error }, { status: 400 });
//     }

//     let tournament;
//     try {
//       tournament = await bracketData.getBracketsByOrganizer(params.id);
//     } catch (error) {
//       return NextResponse.json({ error: error }, { status: 403 });
//     }

//     const newMessage = await bracketData.createMessage(params.id, tournament.id);
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 404 });
//   }
// }
