import { userData, teamData, bracketData } from "@/data/index.js";
import { NextResponse } from "next/server";
import { dbConnection, closeConnection } from "@/config/mongoConnection.js";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export async function GET(req) {
  const db = await dbConnection();
  await db.dropDatabase();

  // PASSWORD - Password!1
  const hashedPassword = await bcrypt.hash("Password!1", 10);
  const paddy = await userData.addUser(
    "pphelps",
    "Paddy",
    "Phelps",
    "pphelps@stevens.edu",
    "2401231234",
    hashedPassword
  );

  const user2 = await userData.addUser(
    "splayer",
    "Second",
    "Player",
    "player2@stevens.edu",
    "2401231234",
    hashedPassword
  );

  const ducks = await teamData.createTeam(
    "Ducks",
    "Lacrosse",
    "United States of America",
    paddy._id.toString(),
    [paddy._id.toString()]
  );

  const cadets = await teamData.createTeam(
    "Cadets",
    "Lacrosse",
    "United States of America",
    paddy._id.toString(),
    [paddy._id.toString()]
  );

  const team3 = await teamData.createTeam(
    "Team3",
    "Lacrosse",
    "United States of America",
    paddy._id.toString(),
    [paddy._id.toString()]
  );

  const team4 = await teamData.createTeam(
    "Team4",
    "Lacrosse",
    "United States of America",
    paddy._id.toString(),
    [paddy._id.toString()]
  );

  let teams = [
    ducks._id.toString(),
    cadets._id.toString(),
    team3._id.toString(),
    team4._id.toString(),
  ];
  const bracket = await bracketData.createBracket(
    "Bracket",
    "My first bracket ever made. How exciting!",
    "4/22/2024",
    "4/29/2024",
    paddy._id.toString(),
    "Lacrosse",
    4,
    teams
  );

  const winner = await bracketData.setMatchWinner(
    bracket._id.toString(),
    1,
    ducks._id.toString(),
    cadets._id.toString(),
    "30",
    "15"
  );

  const winner2 = await bracketData.setMatchWinner(
    bracket._id.toString(),
    2,
    team3._id.toString(),
    team4._id.toString(),
    "33",
    "17"
  );

  // const winner3 = await bracketData.setMatchWinner(
  //   bracket._id.toString(),
  //   3,
  //   ducks._id.toString(),
  //   team3._id.toString(),
  //   "60",
  //   "14"
  // );
  // console.dir(winner3.matches, { depth: null });

  await closeConnection();
  console.log("Done seeding database");
  return NextResponse.json({ done: true }, { status: 200 });
}
