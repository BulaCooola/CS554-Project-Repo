"use client";
import React from "react";
import { useEffect, useState } from "react";
import { fetchTeam } from "./api";

function singleTeam(props) {
  const [team, setTeam] = useState({});
  const [teamLoading, setTeamLoading] = useState(true);
  const [players, setPlayers] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        const teamsData = await fetchTeam(props.params.id);
        if (teamsData !== null) {
          setTeam(teamsData);
        } else {
          console.error("Invalid teams data:", teamsData);
          setTeamLoading(false);
        }
        // const response2 = await fetch(`/api/teams/${props.params.id}/players`);
        // const playersList = await response2.json();
        // setPlayers(playersList);
        // console.log(playersList);
        // setTeamLoading(false);
      } catch (e) {
        console.error("Error fetching teams:", e);
        setTeamLoading(false);
      }
    }

    fetchData();
  }, []);

  if (teamLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p>Loading team</p>
        <p className="loading loading-dots loading-lg">Loading...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center">
      {console.log(team)}
      <h1 className="text-2xl font-bold m-4">{team.name}</h1>
      <p>{team.location}</p>
      <p>{team.sport}</p>
      <div className="glass rounded-lg p-4 m-4">
        <h2 className="text-lg font-bold">Statistics</h2>
        <table className="table table-md">
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
      </div>
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
  );
}

export default singleTeam;
