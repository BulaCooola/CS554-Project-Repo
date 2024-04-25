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

export async function addBracket(prevState, formData) {}

export async function editBracket() {}
