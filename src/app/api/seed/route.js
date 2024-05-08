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
    {
      name: "Team9",
      sport: "Lacrosse",
      country: "United States of America",
      coachId: paddy._id.toString(),
      memberIds: [paddy._id.toString()],
    },
    {
      name: "Team10",
      sport: "Lacrosse",
      country: "United States of America",
      coachId: paddy._id.toString(),
      memberIds: [paddy._id.toString()],
    },
    {
      name: "Team11",
      sport: "Lacrosse",
      country: "United States of America",
      coachId: paddy._id.toString(),
      memberIds: [paddy._id.toString()],
    },
    {
      name: "Team12",
      sport: "Lacrosse",
      country: "United States of America",
      coachId: paddy._id.toString(),
      memberIds: [paddy._id.toString()],
    },
    {
      name: "Team13",
      sport: "Lacrosse",
      country: "United States of America",
      coachId: paddy._id.toString(),
      memberIds: [paddy._id.toString()],
    },
    {
      name: "Team14",
      sport: "Lacrosse",
      country: "United States of America",
      coachId: paddy._id.toString(),
      memberIds: [paddy._id.toString()],
    },
    {
      name: "Team15",
      sport: "Lacrosse",
      country: "United States of America",
      coachId: paddy._id.toString(),
      memberIds: [paddy._id.toString()],
    },
    {
      name: "Team166",
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
    console.log("Added team:", teamObject.name);
  }

  const generateTeamName = async () => {
    const adjectives = [
      "Awesome",
      "Fantastic",
      "Amazing",
      "Great",
      "Super",
      "Alpha",
      "Smelly",
      "Spectacular",
      "Immaculate",
      "Punctual",
      "Smelly",
      "Hygienic",
      "Professional",
      "Stinky",
      "Pungent",
      "Putrid",
      "Noisome",
      "Musty",
      "Fusty",
      "Foul",
    ];
    const nouns = [
      "Bears",
      "Oilers",
      "Ducks",
      "Corgis",
      "Blobfish",
      "Sharks",
      "Monkeys",
      "Tuna",
      "Vegetables",
      "Burgers",
      "Cookies",
      "Ice Creamers",
      "Sticks",
      "Stones",
      "Psychologists",
      "Chickens",
      "BizTechies",
      "Chemies",
      "Mechies",
      "CS Majors",
    ];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adjective} ${noun}`;
  };

  const generateFirstName = async () => {
    const firstNames = [
      "John",
      "Michael",
      "Robert",
      "William",
      "David",
      "Richard",
      "Joseph",
      "Charles",
      "Thomas",
      "Christopher",
      "Daniel",
      "Matthew",
      "Anthony",
      "Mark",
      "Donald",
      "Paul",
      "Steven",
      "Andrew",
      "Kenneth",
      "Joshua",
      "George",
      "Kevin",
      "Brian",
      "Edward",
      "Ronald",
      "Timothy",
      "Jason",
      "Jeffrey",
      "Ryan",
      "Gary",
      "Nicholas",
      "Eric",
      "Stephen",
      "Jacob",
      "Larry",
      "Frank",
      "Jonathan",
      "Scott",
      "Justin",
      "Brandon",
      "Raymond",
      "Gregory",
      "Samuel",
      "Benjamin",
      "Patrick",
      "Jack",
      "Dennis",
      "Jerry",
      "Alexander",
      "Patrick",
    ];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    return `${firstName}`;
  };

  const generateLastName = async () => {
    const lastNames = [
      "Doe",
      "Smith",
      "Williams",
      "Brown",
      "Jones",
      "Miller",
      "Davis",
      "Garcia",
      "Rodriguez",
      "Martinez",
      "Hernandez",
      "Lopez",
      "Gonzalez",
      "Wilson",
      "Anderson",
      "Thomas",
      "Taylor",
      "Moore",
      "Jackson",
      "Martin",
      "Lee",
      "Perez",
      "Thompson",
      "White",
      "Harris",
      "Sanchez",
      "Clark",
      "Ramirez",
      "Lewis",
      "Robinson",
      "Walker",
      "Young",
      "Allen",
      "King",
      "Wright",
      "Scott",
      "Torres",
      "Nguyen",
      "Hill",
      "Flores",
      "Green",
      "Adams",
      "Nelson",
      "Baker",
      "Hall",
      "Rivera",
      "Campbell",
      "Mitchell",
    ];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${lastName}`;
  };

  const generateUsername = async (firstName, lastName) => {
    const sanitizedFirstName = firstName.toLowerCase().trim();
    const sanitizedLastName = lastName.toLowerCase().trim();

    const username = sanitizedFirstName.charAt(0) + sanitizedLastName;

    return username;
  };

  const sportsCategories = [
    "Baseball",
    "Basketball",
    "Cross Country",
    "Fencing",
    "Football",
    "Golf",
    "Gymnastics",
    "Ice Hockey",
    "Lacrosse",
    "Soccer",
    "Swimming and Diving",
    "Tennis",
    "Track and Field",
    "Volleyball",
    "Water Polo",
    "Wrestling",
    "Bowling",
    "Field Hockey",
    "Softball",
    "Other",
  ];

  const createTeams = async () => {
    try {
      for (const sport of sportsCategories) {
        let numberOfTeamsPerSport = 8;
        let teamIdList = [];
        if (
          sport === "Golf" ||
          sport === "Bowling" ||
          sport === "Other" ||
          sport === "Gymnastics" ||
          sport === "Tennis" ||
          sport === "Soccer" ||
          sport === "Hockey"
        ) {
          numberOfTeamsPerSport = 4;
        }
        if (sport === "Basketball") {
          numberOfTeamsPerSport = 32;
        }
        if (
          sport === "Baseball" ||
          sport === "Water Polo" ||
          sport === "Volleyball" ||
          sport === "Football"
        ) {
          numberOfTeamsPerSport = 16;
        }
        for (let i = 0; i < numberOfTeamsPerSport; i++) {
          const teamName = await generateTeamName();
          const team = {
            name: teamName,
            sport: sport,
            country: "United States of America",
            coachId: undefined,
            memberIds: [],
          };

          for (let j = 0; j < 5; j++) {
            const playerFirstName = await generateFirstName();
            const playerLastName = await generateLastName();
            const playerUsername = await generateUsername(playerFirstName, playerLastName);
            const playerEmail = `${playerUsername}@stevens.edu`;
            const playerPhoneNumber = "1234567890";

            // Create player object
            const playerObject = await userData.addUser(
              playerUsername,
              playerFirstName,
              playerLastName,
              playerEmail,
              playerPhoneNumber,
              hashedPassword
            );

            // push first person as coach
            team.coachId = playerObject._id.toString();
            // push into members list
            team.memberIds.push(playerObject._id.toString());

            console.log("Added player:", playerObject.username);
          }
          const teamObject = await teamData.createTeam(
            team.name,
            team.sport,
            team.country,
            team.coachId,
            team.memberIds
          );
          teamIdList.push(teamObject._id.toString());
          console.log(`Added team: ${teamObject.name} ${teamObject.sport}`);
        }

        const bracket = await bracketData.createBracket(
          `${sport} Bracket`,
          "The quick brown fox jumps over the lazy dog.",
          "5/30/2024",
          "6/03/2024",
          paddy._id.toString(),
          sport,
          numberOfTeamsPerSport,
          teamIdList
        );
        console.log(`Added ${sport} Bracket`);
      }
      console.log("Generic Teams/Players/Brackets created successfully");
    } catch (error) {
      console.error("Error creating teams:", error);
    }
  };

  // Call createTeams
  await createTeams();
  await closeConnection();
  console.log("Done seeding database");
  return NextResponse.json({ done: true }, { status: 200 });
}
