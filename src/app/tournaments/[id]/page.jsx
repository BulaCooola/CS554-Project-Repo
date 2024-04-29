"use client";
import { useState, useEffect } from "react";
import { SingleEliminationBracket, Match } from "@g-loot/react-tournament-brackets";
import Link from "next/link";
import { inputMatch } from "@/app/actions";
import { useFormState as useFormState } from "react-dom";
const initialState = {
  message: null,
};
function SingleTournament({ params }) {
  const inputMatchbyId = inputMatch.bind(null, params.id);
  const [state, formAction] = useFormState(inputMatchbyId, initialState);
  const [tournament, setTournament] = useState(undefined);
  const [teams, setTeams] = useState(undefined);
  const [pendingMatches, setPendingMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response1 = await fetch(`/api/tournaments/${params.id}`);
      const tournament = await response1.json();
      setTournament(tournament);
      const response2 = await fetch(`/api/tournaments/${params.id}/teams`);
      const teamsList = await response2.json();
      setTeams(teamsList);
      const pending = [];
      for (let match of tournament.matches) {
        if (match.state !== "complete" && match.participants.length === 2) {
          pending.push(match);
        }
      }
      setPendingMatches(pending);
      setLoading(false);
    }
    fetchData();
  }, []);
  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <main className="min-h-screen justify-between p-24 bg-base">
        <h1>{tournament.name}</h1>
        <h3>{tournament.description}</h3>
        <h3>Start Date: {tournament.startDate}</h3>
        <h3>End Date: {tournament.endDate}</h3>
        <h3>Event: {tournament.sport}</h3>
        <SingleEliminationBracket matches={tournament.matches} matchComponent={Match} />
        <h3>Teams</h3>
        <ul>
          {teams &&
            teams.map((team) => {
              return (
                <li key={team._id}>
                  <Link href={`/teams/${team._id}`}>{team.name}</Link>
                </li>
              );
            })}
        </ul>
        <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
              Enter match results
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {pendingMatches &&
                pendingMatches.map((match, index) => {
                  console.log(pendingMatches);
                  return (
                    <div key={index + 1}>
                      <details className="dropdown">
                        <summary className="m-1 btn">{match.name}</summary>
                        <form
                          action={formAction}
                          className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
                        >
                          <label>
                            {match.participants[0].name}
                            <input
                              type="radio"
                              name="winner"
                              id="first"
                              value={match.participants[0].id}
                              className="radio"
                              required
                            />
                          </label>
                          <label>
                            {match.participants[1].name}
                            <input
                              type="radio"
                              name="winner"
                              id="second"
                              value={match.participants[1].id}
                              className="radio"
                            />
                          </label>
                          <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
                            Winner Score:
                            <input
                              name="winnerScore"
                              id="winnerScore"
                              type="text"
                              placeholder="Score"
                              required
                            />
                          </label>
                          <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
                            Loser Score:
                            <input
                              name="loserScore"
                              id="loserScore"
                              type="text"
                              placeholder="Score"
                              required
                            />
                          </label>
                          <input type="hidden" id="matchId" name="matchId" value={match.id} />
                          <input
                            type="hidden"
                            id="team1"
                            name="team1"
                            value={match.participants[0].id}
                          />
                          <input
                            type="hidden"
                            id="team2"
                            name="team2"
                            value={match.participants[1].id}
                          />
                          <div className="form-group">
                            <button
                              className="btn btn-active btn-neutral flex mx-auto"
                              type="submit"
                            >
                              Finish Match
                            </button>
                          </div>
                        </form>
                      </details>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default SingleTournament;
