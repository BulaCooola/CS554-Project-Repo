"use server";
import validation from "@/data/validation";
import { redirect } from "next/navigation";
import { userData, teamData, bracketData } from "@/data/index.js";
import { revalidatePath } from "next/cache";
import { Client } from "@elastic/elasticsearch";
// CALLED BY CLIENT SIDE FORMS TO HANDLE SUBMISSION

export async function editUser() {}

export async function addTeam(prevState, formData) {
  let name,
    sport,
    location,
    managerId,
    playerIds = null;
  let success = false;
  let errors = [];
  let id = null;
  name = formData.get("name");
  sport = formData.get("sport");
  location = formData.get("location");
  playerIds = formData.getAll("playerIds");

  try {
    name = validation.checkString(name, "Team name");
  } catch (error) {
    errors.push(error);
  }

  try {
    sport = validation.checkSport(sport);
  } catch (error) {
    errors.push(error);
  }

  try {
    location = validation.checkLocation(location);
  } catch (error) {
    errors.push(error);
  }

  try {
    await userData.getUserById("66294cb0e6e1e265512381dc");
  } catch (error) {
    errors.push(error);
  }

  try {
    playerIds = await userData.checkIdArray(playerIds);
  } catch (error) {
    errors.push(error);
  }

  if (errors.length > 0) {
    return { message: errors };
  } else {
    try {
      let newTeam = await teamData.createTeam(
        name,
        sport,
        location,
        "66294cb0e6e1e265512381dc", //will need to get from session later
        playerIds
      );
      id = newTeam._id.toString();
      success = true;
    } catch (error) {
      errors.push(error);
      return { message: errors };
    } finally {
      if (success) {
        revalidatePath("/teams");
        redirect(`/teams/${id}`);
      }
    }
  }
}

export async function editTeam(teamId, prevState, formData) {
  let name,
    sport,
    location,
    playerIds = null;
  let success = false;
  let errors = [];
  let id = null;
  console.log(formData);
  name = formData.get("name");
  sport = formData.get("sport");
  location = formData.get("location");
  playerIds = formData.getAll("playerIds");
  try {
    name = validation.checkString(name, "Team name");
  } catch (error) {
    console.log("NAME:", error);
    errors.push(error);
  }

  try {
    sport = validation.checkSport(sport);
  } catch (error) {
    console.log("SPORT:", error);
    errors.push(error);
  }

  try {
    location = validation.checkLocation(location);
  } catch (error) {
    console.log("LOCATION:", error);
    errors.push(error);
  }

  try {
    playerIds = await userData.checkIdArray(playerIds);
  } catch (error) {
    errors.push(error);
  }

  try {
    await teamData.getTeamById(teamId);
  } catch (error) {
    console.log("ID:", error);
    errors.push(error);
  }

  if (errors.length > 0) {
    return { message: errors };
  } else {
    let updateData = {
      name: name,
      sport: sport,
      location: location,
      playerIds: playerIds,
    };
    try {
      let updatedTeam = await teamData.editTeam(teamId, updateData);
      id = updatedTeam._id.toString();
      success = true;
    } catch (error) {
      console.log("EDIT:", error);
      errors.push(error);
      return { message: errors };
    } finally {
      if (success) {
        revalidatePath("/teams");
        redirect(`/teams/${id}`);
      }
    }
  }
}

export async function addTournament(prevState, formData) {
  let name,
    description,
    startDate,
    endDate,
    organizerId,
    sport,
    bracketSize,
    teams = null;

  let success = false;
  let errors = [];
  let id = null;
  name = formData.get("name");
  description = formData.get("description");
  startDate = formData.get("startDate");
  endDate = formData.get("endDate");
  //organizerId = ID FROM SESSION
  sport = formData.get("sport");
  bracketSize = parseInt(formData.get("bracketSize"));
  teams = formData.getAll("teams");

  try {
    name = validation.checkString(name, "Tournament name");
  } catch (error) {
    errors.push(error);
  }
  try {
    description = validation.checkLongText(
      description,
      "Tournament description"
    );
  } catch (error) {
    errors.push(error);
  }
  try {
    startDate = startDate.replaceAll("-", "/").split("/");
    startDate = `${startDate[1]}/${startDate[2]}/${startDate[0]}`;
    startDate = validation.checkDateString(startDate);
  } catch (error) {
    errors.push(error);
  }
  try {
    endDate = endDate.replaceAll("-", "/").split("/");
    endDate = `${endDate[1]}/${endDate[2]}/${endDate[0]}`;
    endDate = validation.checkDateString(endDate);
  } catch (error) {
    errors.push(error);
  }
  try {
    //OrganizerId
    await userData.getUserById("662ff9cf9327d8e3828eeaba");
  } catch (error) {
    errors.push(error);
  }
  try {
    sport = validation.checkSport(sport);
  } catch (error) {
    errors.push(error);
  }
  try {
    bracketSize = validation.checkBracketSize(bracketSize);
  } catch (error) {
    errors.push(error);
  }
  try {
    teams = await teamData.checkIdArray(teams, bracketSize);
  } catch (error) {
    errors.push(error);
  }

  if (errors.length > 0) {
    return { message: errors };
  } else {
    try {
      let newBracket = await bracketData.createBracket(
        name,
        description,
        startDate,
        endDate,
        "662ff9cf9327d8e3828eeaba", //OrganizerId
        sport,
        bracketSize,
        teams
      );
      id = newBracket._id.toString();
      success = true;
    } catch (error) {
      errors.push(error);
      return { message: errors };
    } finally {
      if (success) {
        revalidatePath(`/tournaments/${id}`);
        redirect(`/tournaments/${id}`);
      }
    }
  }
}

export async function editTournament(tournamentId, prevState, formData) {
  let name,
    description,
    startDate,
    endDate,
    sport,
    bracketSize,
    teams = null;

  let success = false;
  let errors = [];
  let id = null;
  name = formData.get("name");
  description = formData.get("description");
  startDate = formData.get("startDate");
  endDate = formData.get("endDate");
  sport = formData.get("sport");
  bracketSize = parseInt(formData.get("bracketSize"));
  teams = formData.getAll("teams");
  try {
    name = validation.checkString(name, "Tournament name");
  } catch (error) {
    errors.push(error);
  }
  try {
    description = validation.checkLongText(
      description,
      "Tournament description"
    );
  } catch (error) {
    errors.push(error);
  }
  try {
    startDate = startDate.replaceAll("-", "/").split("/");
    startDate = `${startDate[1]}/${startDate[2]}/${startDate[0]}`;
    startDate = validation.checkDateString(startDate);
  } catch (error) {
    errors.push(error);
  }
  try {
    endDate = endDate.replaceAll("-", "/").split("/");
    endDate = `${endDate[1]}/${endDate[2]}/${endDate[0]}`;
    endDate = validation.checkDateString(endDate);
  } catch (error) {
    errors.push(error);
  }
  try {
    sport = validation.checkSport(sport);
  } catch (error) {
    errors.push(error);
  }
  try {
    teams = await teamData.checkIdArray(teams, bracketSize);
  } catch (error) {
    errors.push(error);
  }
  try {
    await bracketData.getBracketById(tournamentId);
  } catch (error) {
    errors.push(error);
  }

  if (errors.length > 0) {
    return { message: errors };
  } else {
    let updateData = {
      name: name,
      description: description,
      startDate: startDate,
      endDate: endDate,
      sport: sport,
      bracketSize: bracketSize,
      teams: teams,
    };
    try {
      let updatedBracket = await bracketData.editBracket(
        tournamentId,
        updateData
      );
      id = updatedBracket._id.toString();
      success = true;
    } catch (error) {
      errors.push(error);
      return { message: errors };
    } finally {
      if (success) {
        revalidatePath("/tournaments");
        redirect(`/tournaments/${id}`);
      }
    }
  }
}

export async function inputMatch(tournamentId, prevState, formData) {
  let matchId,
    winnerId,
    loserId,
    winnerResult,
    loserResult = null;

  let success = false;
  let errors = [];
  let id = null;
  matchId = formData.get("matchId");
  winnerId = formData.get("winner");
  winnerResult = parseInt(formData.get("winnerScore"));
  loserResult = parseInt(formData.get("loserScore"));
  let team1 = formData.get("team1");
  let team2 = formData.get("team2");
  loserId = winnerId === team1 ? team2 : team1;

  if (isNaN(winnerResult) || isNaN(loserResult)) {
    errors.push("Error: Result must be an integer");
  }
  try {
    await bracketData.getBracketById(tournamentId);
  } catch (error) {
    errors.push(error);
  }
  if (errors.length > 0) {
    return { message: errors };
  } else {
    try {
      const newBracket = await bracketData.setMatchWinner(
        tournamentId,
        matchId,
        winnerId,
        loserId,
        winnerResult,
        loserResult
      );
      id = newBracket._id.toString();
    } catch (error) {
      return { message: errors };
    } finally {
      if (success) {
        revalidatePath(`/tournaments/${id}`);
        redirect(`/tournaments/${id}`);
      }
    }
  }
}

export async function search(prevState, formData) {
  let text = formData.get("search");
  console.log(text);
  const client = new Client({
    cloud: {
      id: "5319e1eb9868466ba95f10fb82e23885:dXMtZWFzdC0xLmF3cy5mb3VuZC5pbyRlZTExNmQ0NjVmMDE0YTg0OWI2ZmFjNGVhOTQyZjA3ZSRlNmE3MzQ5YmRmZmM0YjJkYjNlNzQ3OWEwNmJkYjYwYw==",
    },
    auth: {
      username: "elastic",
      password: "aEwEWwaMzZeluHagQY9Gqo6R",
    },
  });
  let data = await client.search({
    query: {
      query_string: {
        default_field: "name",
        query: `*${text}*`,
      },
    },
  });
  let results = data.hits.hits.map((result) => {
    if (result._index !== ".elastic-connectors-v1") {
      if (result._index === "tourneypro") {
        return {
          type: "team",
          data: result._source,
        };
      } else {
        return {
          type: "tournament",
          data: result._source,
        };
      }
    } else {
      return {
        type: null,
      };
    }
  });
  console.log(results);
  return { message: results };
}
