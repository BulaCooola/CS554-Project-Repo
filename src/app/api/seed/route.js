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

  const playersData = [
    {
      username: "player3",
      firstName: "Player",
      lastName: "Three",
      email: "player3@stevens.edu",
      phoneNumber: "2401231234",
    },
    {
      username: "player4",
      firstName: "Player",
      lastName: "Four",
      email: "player4@stevens.edu",
      phoneNumber: "2401231234",
    },
    {
      username: "player5",
      firstName: "Player",
      lastName: "Five",
      email: "player5@stevens.edu",
      phoneNumber: "2401231234",
    },
    {
      username: "player6",
      firstName: "Player",
      lastName: "Six",
      email: "player6@stevens.edu",
      phoneNumber: "2401231234",
    },
    {
      username: "player7",
      firstName: "Player",
      lastName: "Seven",
      email: "player7@stevens.edu",
      phoneNumber: "2401231234",
    },
    {
      username: "player8",
      firstName: "Player",
      lastName: "Eight",
      email: "player8@stevens.edu",
      phoneNumber: "2401231234",
    },
    {
      username: "player9",
      firstName: "Player",
      lastName: "Nine",
      email: "player9@stevens.edu",
      phoneNumber: "2401231234",
    },
    {
      username: "player10",
      firstName: "Player",
      lastName: "Ten",
      email: "player10@stevens.edu",
      phoneNumber: "2401231234",
    },
    {
      username: "player11",
      firstName: "Player",
      lastName: "Eleven",
      email: "player11@stevens.edu",
      phoneNumber: "2401231234",
    },
    {
      username: "player12",
      firstName: "Player",
      lastName: "Twelve",
      email: "player12@stevens.edu",
      phoneNumber: "2401231234",
    },
    {
      username: "player13",
      firstName: "Player",
      lastName: "Thirteen",
      email: "player13@stevens.edu",
      phoneNumber: "2401231234",
    },
    {
      username: "player14",
      firstName: "Player",
      lastName: "Fourteen",
      email: "player14@stevens.edu",
      phoneNumber: "2401231234",
    },
    {
      username: "player15",
      firstName: "Player",
      lastName: "Fifteen",
      email: "player15@stevens.edu",
      phoneNumber: "2401231234",
    },
    {
      username: "player16",
      firstName: "Player",
      lastName: "Sixteen",
      email: "player16@stevens.edu",
      phoneNumber: "2401231234",
    },
  ];

  // Add 14 generic players
  for (let i = 0; i < playersData.length; i++) {
    const player = playersData[i];
    const playerObject = await userData.addUser(
      player.username,
      player.firstName,
      player.lastName,
      player.email,
      player.phoneNumber,
      hashedPassword
    );
    console.log("Added player:", playerObject);
  }

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

  const newTeams = [
    {
      name: "Team5",
      sport: "Lacrosse",
      country: "United States of America",
      coachId: paddy._id.toString(),
      memberIds: [paddy._id.toString()],
    },
    {
      name: "Team6",
      sport: "Lacrosse",
      country: "United States of America",
      coachId: paddy._id.toString(),
      memberIds: [paddy._id.toString()],
    },
    {
      name: "Team7",
      sport: "Lacrosse",
      country: "United States of America",
      coachId: paddy._id.toString(),
      memberIds: [paddy._id.toString()],
    },
    {
      name: "Team8",
      sport: "Lacrosse",
      country: "United States of America",
      coachId: paddy._id.toString(),
      memberIds: [paddy._id.toString()],
    },
  ];

  for (let i = 0; i < newTeams.length; i++) {
    const team = newTeams[i];
    const teamObject = await teamData.createTeam(
      team.name,
      team.sport,
      team.country,
      team.coachId,
      team.memberIds
    );
    console.log("Added team:", teamObject);
  }

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
