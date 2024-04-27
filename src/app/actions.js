"use server";
import validation from "@/data/validation";
import { redirect } from "next/navigation";
import { userData, teamData, bracketData } from "@/data/index.js";
import { revalidatePath } from "next/cache";

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

export async function editTeam() {}

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
  console.log(formData);
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
    description = validation.checkLongText(description, "Tournament description");
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
    await userData.getUserById("66294cb0e6e1e265512381dc");
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
        "66294cb0e6e1e265512381dc", //OrganizerId
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
        revalidatePath("/tournaments");
        redirect(`/tournaments/${id}`);
      }
    }
  }
}

export async function editTournament() {}
