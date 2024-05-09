import { userData, teamData, bracketData } from "@/data/index.js";
import { NextResponse } from "next/server";
import { dbConnection, closeConnection } from "@/config/mongoConnection.js";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import bcrypt from "bcrypt";

export async function GET(req) {
  const db = await dbConnection();
  await db.dropDatabase();
  // PASSWORD - Password!1
  const hashedPassword = await bcrypt.hash("Password!1", 10);
  const phill = await userData.addUser(
    "phill",
    "Patrick",
    "Hill",
    "phill@stevens.edu",
    "2401231234",
    hashedPassword
  );

  const user2 = await userData.addUser(
    "pphelps",
    "Paddy",
    "Phelps",
    "pphelps@stevens.edu",
    "2401231234",
    hashedPassword
  );

  const playersData = [
    {
      username: "bbulatao",
      firstName: "Branden",
      lastName: "Bulatao",
      email: "bbulatao@stevens.edu",
      phoneNumber: "1234567890",
    },
    {
      username: "lokun",
      firstName: "Lennon",
      lastName: "Okun",
      email: "lokun@stevens.edu",
      phoneNumber: "1234567890",
    },
    {
      username: "podre",
      firstName: "Paul",
      lastName: "Odre",
      email: "podre@stevens.edu",
      phoneNumber: "1234567890",
    },
  ];

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

  const generateUsername = async (firstName, lastName, userNumber) => {
    const sanitizedFirstName = firstName.toLowerCase().trim();
    const sanitizedLastName = lastName.toLowerCase().trim();

    const username =
      sanitizedFirstName.charAt(0) + sanitizedLastName + userNumber;

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
        let numberOfTeamsPerSport = 4;
        let teamIdList = [];
        if (sport === "Lacrosse") {
          numberOfTeamsPerSport = 8;
        }
        if (sport === "Basketball") {
          numberOfTeamsPerSport = 32;
        }
        if (sport === "Wrestling") {
          numberOfTeamsPerSport = 16;
        }
        if (sport === "Bowling") {
          numberOfTeamsPerSport = 4;
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
            let userNumber = Math.floor(Math.random() * 9000) + 1000;
            const playerFirstName = await generateFirstName();
            const playerLastName = await generateLastName();
            const playerUsername = await generateUsername(
              playerFirstName,
              playerLastName,
              userNumber
            );
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

        if (
          numberOfTeamsPerSport === 4 ||
          numberOfTeamsPerSport === 8 ||
          numberOfTeamsPerSport === 16 ||
          numberOfTeamsPerSport === 32
        ) {
          const bracket = await bracketData.createBracket(
            `${sport} Bracket - ${numberOfTeamsPerSport}-team`,
            "The quick brown fox jumps over the lazy dog.",
            "5/30/2024",
            "6/03/2024",
            phill._id.toString(),
            sport,
            numberOfTeamsPerSport,
            teamIdList
          );
          console.log(`Added ${sport} Bracket`);
        }
      }
      console.log("Generic Teams/Players/Brackets created successfully");
    } catch (error) {
      console.error("Error creating teams:", error);
    }
  };

  // Call createTeams
  await createTeams();
  noStore();
  await closeConnection();
  console.log("Done seeding database");
  return NextResponse.json({ done: true }, { status: 200 });
}
