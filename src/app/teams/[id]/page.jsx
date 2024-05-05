"use client";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";

function singleTeam({params}) {
  const [team, setTeam] = useState(undefined);
  const [teamLoading, setTeamLoading] = useState(true);
  const [players, setPlayers] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      const response1 = await fetch(`/api/teams/${params.id}`);
      const teamData = await response1.json();
      setTeam(teamData.team)
      const response2 = await fetch(`/api/teams/${params.id}/players`)
      const playersList = await response2.json()
      setPlayers(playersList);
      setTeamLoading(false)
    }

    fetchData();
  }, []);

  if (teamLoading) {
    return (
      <div className="min-h-screen justify-between p-24 bg-base">
        <p>Loading Team</p>
        <p className="loading loading-dots loading-lg">Loading...</p>
      </div>
    );
  } else {
  return (
    <div className="min-h-screen justify-between p-24 bg-base">
      {team && (
        <div><h1 className="text-2xl font-bold">{team.name}</h1>
        <p>{team.location}</p>
        <p>{team.sport}</p>
      <div className="glass rounded-lg p-4 m-4 w-96">
        <h2 className="text-lg font-bold">Statistics</h2>
        <table className="table table-md ">
          <tbody>
            <tr>
              <td>Record:</td>
              <td>
                {team.numWins}-{team.numLosses}
              </td>
            </tr>
            <tr>
              <td>Total Games:</td>
              <td>{team.numGames}</td>
            </tr>
            <tr>
              <td>Number of Players:</td>
              <td>{team.numPlayers}</td>
            </tr>
          </tbody>
        </table>
      </div></div>)}
      {players && players.length > 0 && (
        <div>
          <h3>Players:</h3>
          <ul>
            {players.map((player) => {
              return (
                <li key={player._id}>
                  <Link className="link link-primary" href={`/users/${player._id}`}>
                    {player.firstName} {player.lastName}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div>
        <h2>Previous Competitions</h2>
      </div>
    </div>
  );}
}

export default singleTeam;
