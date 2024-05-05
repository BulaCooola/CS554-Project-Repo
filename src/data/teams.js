import { teams } from "@/config/mongoCollections.js";
import { ObjectId } from "mongodb";
import validation from "@/data/validation.js";
import userData from "@/data/users";

const exportedMethods = {
  async getAllTeams() {
    const teamCollection = await teams();
    const teamList = await teamCollection.find({}).toArray();
    return teamList;
  },
  async getTeamById(id) {
    id = validation.checkId(id);
    const teamCollection = await teams();
    const team = await teamCollection.findOne({ _id: new ObjectId(id) });
    if (!team) throw "Error: Team not found";
    return team;
  },
  async getTeamsByPlayer(playerId) {
    playerId = validation.checkId(playerId);
    const teamCollection = await teams();
    const teamList = await teamCollection // Find all teams that have playerId in their list of players
      .find({ playerIds: playerId })
      .toArray();
    return teamList;
  },
  async getTeamsByManager(managerId) {
    managerId = validation.checkId(managerId);
    const teamCollection = await teams();
    const teamList = await teamCollection // Find all teams that have playerId in their list of players
      .find({ managerId: managerId })
      .toArray();
    return teamList;
  },
  async createTeam(name, sport, location, managerId, playerIds) {
    try {
      name = validation.checkString(name, "Team name");
      sport = validation.checkSport(sport);
      location = validation.checkLocation(location);
      await userData.getUserById(managerId.toString()); // Will throw error if managerId does not return a user
      await userData.checkIdArray(playerIds); //Will throw error if any vals in playerIds do not return a user
    } catch (e) {
      throw `Error: ${e}`;
    }

    let newTeam = {
      profilePicture: undefined,
      name: name,
      sport: sport,
      location: location,
      managerId: managerId,
      numPlayers: playerIds.length,
      playerIds: playerIds,
      numGames: 0,
      numWins: 0,
      numLosses: 0,
      tournamentsWon: 0,
    };

    const teamCollection = await teams();
    const newInsertInformation = await teamCollection.insertOne(newTeam);
    if (!newInsertInformation.insertedId) throw "Insert failed!";
    const team = await this.getTeamById(
      newInsertInformation.insertedId.toString()
    );
    return team;
  },
  async editTeam(teamId, updatedTeam) {
    // PATCH style

    // Check if team exists
    teamId = validation.checkId(teamId);
    const teamCollection = await teams();
    const team = await teamCollection.findOne({ _id: new ObjectId(teamId) });
    if (!team) throw "Error: Team not found";

    // Validate provided fields
    const updatedTeamData = {};
    if (updatedTeam.name) {
      updatedTeamData.name = validation.checkString(
        updatedTeam.name,
        "Team name"
      );
    }
    if (updatedTeam.sport) {
      updatedTeamData.sport = validation.checkSport(updatedTeam.sport);
    }
    if (updatedTeam.location) {
      updatedTeamData.location = validation.checkLocation(updatedTeam.location);
    }
    if (updatedTeam.managerId) {
      updatedTeam.managerId = validation.checkId(updatedTeam.managerId);
      const newManager = await userData.getUserById(updatedTeam.managerId);
      if (!newManager) throw "Error: User for manager not found";
      updatedTeamData.managerId = newManager._id.toString();
    }
    if (updatedTeam.playerIds) {
      updatedTeamData.playerIds = await userData.checkIdArray(
        updatedTeam.playerIds
      );
      updatedTeamData.numPlayers = updatedTeam.playerIds.length;
    }

    let newTeam = await teamCollection.findOneAndUpdate(
      { _id: new ObjectId(teamId) },
      { $set: updatedTeamData },
      { returnDocument: "after" }
    );

    if (!newTeam) throw `Could not update the team with id ${teamId}`;
    return newTeam;
  },
  async deleteTeam(id) {
    id = validation.checkId(id);
    const teamCollection = await teams();
    const deletionInfo = await teamCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });
    if (!deletionInfo) throw `Could not delete team with id of ${id}`;
    // Find all users associated with the team and delete the id
    return { ...deletionInfo, deleted: true };
  },
  async checkIdArray(arr, bracketSize) {
    console.log(arr);
    console.log(bracketSize);
    if (arr.length !== bracketSize)
      throw "Error: Number of teams provided does not match bracket size";

    if (!arr || !Array.isArray(arr)) throw `You must provide an array of Ids`;
    for (let i in arr) {
      try {
        await this.getTeamById(arr[i].toString());
      } catch (error) {
        throw `Error: ${error}`;
      }
    }

    return arr;
  },
  async addPlayer(teamId, playerId) {
    playerId = validation.checkId(playerId);
    const player = userData.getUserById(playerId);
    if (!player) throw `Error: Could not find user with id of ${playerId}`;

    teamId = validation.checkId(teamId);
    const team = this.getTeamById(teamId);
    if (!team) throw `Error: Could not find team with id of ${teamId}`;

    team.playerIds.push(playerId);
    team.numPlayers = team.playerIds.length;

    let newTeam = await teamCollection.findOneAndUpdate(
      { _id: new ObjectId(teamId) },
      { $set: team },
      { returnDocument: "after" }
    );

    if (!newTeam) throw `Could not update the team with id ${teamId}`;
    return newTeam;
  },
  async addWin(id) {
    id = validation.checkId(id);
    const team = await this.getTeamById(id);
    if (!team) throw "Error: Could not find team";
    const teamCollection = await teams();
    team.numGames = team.numGames + 1;
    team.numWins = team.numWins + 1;
    let newTeam = await teamCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: team },
      { returnDocument: "after" }
    );
    if (!newTeam) throw `Could not update the team with id ${id}`;
    return newTeam;
  },
  async addLoss(id) {
    id = validation.checkId(id);
    const team = await this.getTeamById(id);
    if (!team) throw "Error: Could not find team";
    const teamCollection = await teams();
    team.numGames = team.numGames + 1;
    team.numLosses = team.numLosses + 1;
    let newTeam = await teamCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: team },
      { returnDocument: "after" }
    );
    if (!newTeam) throw `Could not update the team with id ${id}`;
    return newTeam;
  },
  async getTeamsPlayers(teamId) {
    const team = await this.getTeamById(teamId);
    if (!team) throw "Error: Could not get team.";
    const players = await userData.getListOfPlayers(team.playerIds);
    if (!players) throw `Error: Could not get team players.`;
    return players;
  },
  async getListofTeams(arr, size) {
    arr = await this.checkIdArray(arr, size);
    for (let i in arr) {
      arr[i] = new ObjectId(arr[i]);
    }
    const teamCollection = await teams();
    const teamList = await teamCollection.find({ _id: { $in: arr } }).toArray();
    return teamList;
  },
  async getTeamsBySport(sport) {
    sport = validation.checkSport(sport);
    const teamCollection = await teams();
    const teamList = await teamCollection.find({ sport: sport }).toArray();
    return teamList;
  },
  async teamsMatchSport(idArr, sport) {
    sport = validation.checkSport(sport);
    for (let teamId of idArr) {
      let team = await this.getTeamById(teamId);
      if (!team) throw "Error: Could not find team.";
      if (team.sport !== sport) {
        throw `Error: ${team.name} is a ${team.sport} team and cannot be added to a ${sport} tournament.`;
      }
    }
    return idArr;
  },
};

export default exportedMethods;
