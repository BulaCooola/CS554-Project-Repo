"use client";
import { useState, useEffect } from "react";
import { SingleEliminationBracket, Match } from "@g-loot/react-tournament-brackets";
import Link from "next/link";
import { inputMatch, addMessage } from "@/app/actions";
import { useFormState as useFormState } from "react-dom";
import { useSession } from "next-auth/react";

const initialState = {
  message: null,
};
function SingleTournament({ params }) {
  const { data: session, status, update } = useSession();

  const inputMatchbyId = inputMatch.bind(null, params.id);
  const inputMessage = addMessage.bind(null, params.id, session.user._id);
  const [state, formAction] = useFormState(inputMatchbyId, initialState);
  const [messageState, messageAction] = useFormState(inputMessage, initialState);
  const [tournament, setTournament] = useState(undefined);
  const [teams, setTeams] = useState(undefined);
  const [pendingMatches, setPendingMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [winner, setWinner] = useState("TBD");
  const [selectedSection, setSelectedSection] = useState("info");

  useEffect(() => {
    async function fetchBroadcast() {
      const res = await fetch(`/api/tournaments/${params.id}/broadcast`, {
        method: "GET",
      });
      const chat = await res.json();
      console.log(chat);
    }

    fetchBroadcast();
  }, []);

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
      if (tournament.winner !== "TBD") {
        const response3 = await fetch(`/api/teams/${tournament.winner}`);
        const { team } = await response3.json();
        setWinner(team);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  useEffect(() => {
    if (state.success === "success") {
      state.message = null;
      window.location.reload();
    }
  }, [state.message]);

  // useEffect(() => {
  //   if (messageState.success === "success") {
  //     messageState.message = null;
  //     window.location.reload();
  //   }
  // }, [messageState.message]);

  if (loading) {
    return (
      <div className="min-h-screen justify-between p-24 bg-base">
        <p>Loading Tournament</p>
        <p className="loading loading-dots loading-lg">Loading...</p>
      </div>
    );
  } else {
    return (
      <main className="min-h-screen justify-between p-24 bg-base">
        <h1 className="flex flex-col justify-center items-center text-4xl m-4">
          {tournament.name}
        </h1>

        <div className="glass rounded-lg p-4 flex justify-around mb-4">
          <button className="btn btn-primary" onClick={() => handleSectionChange("info")}>
            Info
          </button>
          <button className="btn btn-primary" onClick={() => handleSectionChange("bracket")}>
            Bracket
          </button>
          <button className="btn btn-primary" onClick={() => handleSectionChange("teams")}>
            Teams
          </button>
          <button className="btn btn-primary" onClick={() => handleSectionChange("broadcast")}>
            Broadcast
          </button>
        </div>

        {selectedSection === "info" && (
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">Tournament Information</h1>
            <h3>{tournament.description}</h3>
            <h3>Start Date: {tournament.startDate}</h3>
            <h3>End Date: {tournament.endDate}</h3>
            <h3>Event: {tournament.sport}</h3>
            <h3>
              Winner:{" "}
              {winner === "TBD" ? (
                winner
              ) : (
                <Link className="link link-primary" href={`/teams/${winner._id}`}>
                  {winner.name}
                </Link>
              )}
            </h3>
          </div>
        )}
        {selectedSection === "bracket" && (
          <div>
            <div className="glass rounded-lg overflow-x-auto">
              <SingleEliminationBracket matches={tournament.matches} matchComponent={Match} />
            </div>
            {session?.user._id === tournament.organizerId ? (
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
                        return (
                          <div key={index + 1}>
                            <details className="dropdown">
                              <summary className="m-1 btn">{match.name}</summary>
                              <form
                                action={formAction}
                                className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
                              >
                                {state && state.message && (
                                  <div className="alert alert-error w-1/2 mx-auto">
                                    <ul>
                                      {state.message.map((msg, index) => {
                                        return (
                                          <li className="error" key={index}>
                                            {msg}
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                )}
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
                    {pendingMatches.length == 0 && <div>No matches to complete currently.</div>}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
        {selectedSection === "teams" && (
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-2xl m-2">Teams</h3>
            <ul>
              {teams &&
                teams.map((team) => {
                  return (
                    <div
                      key={team._id}
                      className="card bg-base-100 shadow-lg m-4 p-4 min-w-80 max-w-96 mx-auto"
                    >
                      <Link
                        href={`/teams/${team._id}`}
                        className="text-lg font-semibold link link-primary"
                      >
                        {team.name}
                      </Link>
                      <p className="text-sm">{team.sport}</p>
                      <p className="text-sm">{team.location}</p>
                    </div>
                  );
                })}
            </ul>
          </div>
        )}
        {selectedSection === "broadcast" && (
          <div>
            <form action={messageAction}>
              {state && state.message && (
                <div className="alert alert-error w-1/2 mx-auto">
                  <ul>
                    {state.message.map((msg, index) => {
                      return (
                        <li className="error" key={index}>
                          {msg}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              <label>
                <input
                  type="hidden"
                  id="username"
                  name="username"
                  value={session?.user?.username}
                />
              </label>
              <label>
                <input name="message" id="message" type="text" placeholder="message" required />
              </label>
              <div className="form-group">
                <button className="btn btn-active btn-neutral flex mx-auto" type="submit">
                  Send Broadcast
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    );
  }
}

export default SingleTournament;
