import { brackets } from "@/config/mongoCollections.js";
import { ObjectId } from "mongodb";
import validation from "@/data/validation.js";
import userData from "@/data/users";
import teamData from "@/data/teams";

async function createMatches(bracketSize, teams) {
  const matches = [];
  const teamNames = [];
  for (let i in teams) {
    let team = await teamData.getTeamById(teams[i]);
    teamNames.push(team.name);
  }
  for (let i = 1; i < bracketSize; i++) {
    let gameObj = [];
    let nextMatch =
      Math.ceil(i / 2) + bracketSize / 2 >= bracketSize
        ? null
        : Math.ceil(i / 2) + bracketSize / 2;
    let round = 1;
    if (i > bracketSize * 0.5) round = 2;
    if (i > bracketSize * 0.75) round = 3;
    if (i > bracketSize * 9) round = 4;
    if (i > bracketSize * 0.97) round = 5;
    if (i <= bracketSize / 2) {
      gameObj = {
        id: i,
        name: `Match ${i}`,
        participants: [
          {
            id: teams[i * 2 - 2],
            resultText: null,
            status: "SCHEDULED",
            name: teamNames[i * 2 - 2],
            isWinner: null,
            resultText: null,
          },
          {
            id: teams[i * 2 - 1],
            resultText: null,
            status: "SCHEDULED",
            name: teamNames[i * 2 - 1],
            isWinner: null,
            resultText: null,
          },
        ],
        nextMatchId: nextMatch,
        tournamentRoundText: round,
        state: "SCHEDULED",
      };
    } else {
      gameObj = {
        id: i,
        name: `Match ${i}`,
        participants: [],
        nextMatchId: nextMatch,
        tournamentRoundText: round,
        state: "SCHEDULED",
      };
    }
    matches.push(gameObj);
  }
  return matches;
}

const exportedMethods = {
  async getAllBrackets() {
    const bracketCollection = await brackets();
    const bracketList = await bracketCollection.find({}).toArray();
    return bracketList;
  },
  async getBracketById(id) {
    id = validation.checkId(id);
    const bracketCollection = await brackets();
    const bracket = await bracketCollection.findOne({ _id: new ObjectId(id) });
    if (!bracket) throw "Error: Bracket not found";
    return bracket;
  },
  async getBracketsByPlayer(playerId) {
    playerId = validation.checkId(playerId);
    const bracketCollection = await brackets();
    const bracketList = await bracketCollection
      .find({ allPlayers: new ObjectId(playerId) })
      .toArray();
    return bracketList;
  },
  async createBracket(
    name,
    description,
    startDate,
    endDate,
    organizerId,
    sport,
    bracketSize,
    teams
  ) {
    try {
      name = validation.checkString(name, "Bracket name");
      description = validation.checkLongText(
        description,
        "bracket description"
      );
      startDate = validation.checkDateString(startDate);
      endDate = validation.checkDateString(endDate);
      await userData.getUserById(organizerId.toString());
      sport = validation.checkSport(sport);
      bracketSize = validation.checkBracketSize(bracketSize);
      teams = await teamData.checkIdArray(teams, bracketSize);
    } catch (error) {
      console.error(`Server Error: ${error}`);
      throw `Server Error: ${error}`;
    }
    const allPlayers = [];
    for (let i in teams) {
      for (let j in teams[i].playerIds) {
        allPlayers.push(new ObjectId(teams[i].playerIds[j]));
      }
    }
    const matches = await createMatches(bracketSize, teams);
    let newBracket = {
      name: name,
      description: description,
      startDate: startDate,
      endDate: endDate,
      organizerId: organizerId,
      sport: sport,
      bracketSize: bracketSize,
      teams: teams,
      winner: "TBD",
      status: "scheduled",
      allPlayers: allPlayers,
      matches: matches,
    };

    const bracketCollection = await brackets();
    const newInsertInformation = await bracketCollection.insertOne(newBracket);
    if (!newInsertInformation.insertedId) throw "Insert failed!";
    return await this.getBracketById(
      newInsertInformation.insertedId.toString()
    );
  },
  async editBracket(bracketId, updatedBracket) {
    bracketId = validation.checkId(bracketId);
    const bracketCollection = await brackets();
    const bracket = await bracketCollection.findOne({
      _id: new ObjectId(bracketId),
    });
    if (!bracket) throw "Error: Bracket not found";

    const updatedBracketData = {};

    if (updatedBracket.name) {
      updatedBracketData.name = validation.checkString(
        updatedBracket.name,
        "Bracket name"
      );
    }
    if (updatedBracket.description) {
      updatedBracketData.description = validation.checkLongText(
        updatedBracket.description,
        "Bracket description"
      );
    }
    if (updatedBracket.startDate) {
      updatedBracketData.startDate = validation.checkDateString(
        updatedBracket.startDate
      );
    }
    if (updatedBracket.endDate) {
      updatedBracketData.endDate = validation.checkDateString(
        updatedBracket.endDate
      );
    }
    if (updatedBracket.organizerId) {
      updatedBracket.organizerId = validation.checkId(
        updatedBracket.organizerId
      );
      const newOrganizer = await userData.getUserById(
        updatedBracket.organizerId
      );
      if (!newOrganizer) throw "Error: User for organizer not found.";
      updatedBracketData.organizerId = newOrganizer._id.toString();
    }
    if (updatedBracket.sport) {
      updatedBracketData.sport = validation.checkSport(updatedBracket.sport);
    }

    let newBracket = await bracketCollection.findOneAndUpdate(
      { _id: new ObjectId(bracketId) },
      { $set: updatedBracketData },
      { returnDocument: "after" }
    );

    if (!newBracket) throw `Could not update the bracket with id ${bracket}`;
    return newBracket;
  },
  async deleteBracket(id) {
    id = validation.checkId(id);
    const bracketCollection = await brackets();
    const deletionInfo = await bracketCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });
    if (!deletionInfo) throw `Could not delete bracket with id of ${id}`;
    return { ...deletionInfo, deleted: true };
  },

  async setMatchWinner(
    bracketId,
    matchId,
    winnerId,
    loserId,
    winnerResult,
    loserResult
  ) {
    const bracket = await this.getBracketById(bracketId);
    if (!bracket) throw "Error: Bracket not found";

    matchId = parseInt(matchId);
    if (isNaN(matchId)) throw "Error: Invalid matchId";

    winnerId = validation.checkId(winnerId);
    const winner = await teamData.getTeamById(winnerId);
    if (!winner) throw "Error: Could not find winner";

    loserId = validation.checkId(loserId);
    const loser = await teamData.getTeamById(loserId);
    if (!loser) throw "Error: Could not find loser";

    await teamData.addWin(winnerId);
    await teamData.addLoss(loserId);
    const bracketCollection = await brackets();
    const index = matchId - 1;
    if (bracket.matches[index].nextMatchId) {
      // earlier game
      for (let i in bracket.matches[index].participants) {
        if (bracket.matches[index].participants[i].id === winnerId) {
          bracket.matches[index].participants[i].isWinner = true;
          bracket.matches[index].participants[i].resultText = winnerResult;
        } else {
          bracket.matches[index].participants[i].isWinner = false;
          bracket.matches[index].participants[i].resultText = loserResult;
        }
      }
      const participant = {
        id: winner._id.toString(),
        name: winner.name,
        resultText: null,
        status: "SCHEDULED",
        isWinner: null,
        resultText: null,
      };
      bracket.matches[bracket.matches[index].nextMatchId - 1].participants.push(
        participant
      );
      let newBracket = await bracketCollection.findOneAndUpdate(
        { _id: new ObjectId(bracketId) },
        { $set: bracket },
        { returnDocument: "after" }
      );

      if (!newBracket)
        throw `Could not update the bracket with id ${bracketId}`;
      return newBracket;
    } else {
      // championship game
      for (let i in bracket.matches[index].participants) {
        if (bracket.matches[index].participants[i].id === winnerId) {
          bracket.matches[index].participants[i].isWinner = true;
          bracket.matches[index].participants[i].resultText = winnerResult;
        } else {
          bracket.matches[index].participants[i].isWinner = false;
          bracket.matches[index].participants[i].resultText = loserResult;
        }
      }
      let newBracket1 = await bracketCollection.findOneAndUpdate(
        { _id: new ObjectId(bracketId) },
        { $set: bracket },
        { returnDocument: "after" }
      );
      if (!newBracket1)
        throw `Could not update the bracket with id ${bracketId}`;

      let newBracket = await this.setBracketWinner(bracketId, winnerId);
      return newBracket;
    }
  },

  async setBracketWinner(bracketId, winnerId) {
    bracketId = validation.checkId(bracketId);
    winnerId = validation.checkId(winnerId);

    const bracket = await this.getBracketById(bracketId);
    if (!bracket) throw "Error: Could not find bracket";

    const winner = await teamData.getTeamById(winnerId);
    if (!winner) throw "Error: Could not find winning team";

    if (!bracket.teams.includes(winner._id.toString()))
      throw "Error: Winner not found in this bracket";

    const bracketCollection = await brackets();
    bracket.winner = winner._id.toString();
    bracket.status = "completed";
    let newBracket = await bracketCollection.findOneAndUpdate(
      { _id: new ObjectId(bracketId) },
      { $set: bracket },
      { returnDocument: "after" }
    );

    if (!newBracket) throw `Could not update the bracket with id ${bracket}`;
    return newBracket;
  },
};

export default exportedMethods;
