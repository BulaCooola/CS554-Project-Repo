"use client";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

function singleTeam({ params }) {
  const { data: session, status, update } = useSession();

  const [team, setTeam] = useState(undefined);
  const [teamLoading, setTeamLoading] = useState(true);
  const [players, setPlayers] = useState(undefined);
  const [competitions, setCompetitions] = useState(undefined);
  const [selectedSection, setSelectedSection] = useState("home");

  useEffect(() => {
    async function fetchData() {
      try {
        const response1 = await fetch(`/api/teams/${params.id}`);
        const teamData = await response1.json();
        setTeam(teamData.team);

        const response2 = await fetch(`/api/teams/${params.id}/players`);
        const playersList = await response2.json();
        setPlayers(playersList);

        const response3 = await fetch(`/api/teams/${params.id}/competitions`, {
          method: "GET",
        });
        const competitionList = await response3.json();
        setCompetitions(competitionList);

        setTeamLoading(false);
      } catch (e) {}
    }

    fetchData();
  }, []);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

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
          <div className="title my-4 ">
            <h1 className="text-4xl font-bold">{team.name}</h1>
          </div>
        )}
        <nav className="flex justify-between items-center mb-8">
          <div className="navbar glass rounded-lg p-4 flex flex-row justify-around mb-4">
            <div className="navbar-center">
              <button className="btn btn-primary m-2" onClick={() => handleSectionChange("home")}>
                Home
              </button>
              <button className="btn btn-primary m-2" onClick={() => handleSectionChange("roster")}>
                Roster
              </button>
              <button
                className="btn btn-primary m-2"
                onClick={() => handleSectionChange("previous-competitions")}
              >
                Previous Competitions
              </button>
              {session.user._id && (
                <Link href={`/teams/${params.id}/edit`} className="btn btn-primary m-2">
                  Edit Team
                </Link>
              )}
            </div>
          </div>
        </nav>
        <div>
          {selectedSection === "home" && (
            <div>
              {team && (
                <div>
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
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {selectedSection === "roster" && players && players.length > 0 && (
          <div>
            <h3>Players:</h3>
            <table className="table table-lg">
              <thead>
                <tr>
                  <th>Profile Picture</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Position</th>
                  <th>Jersey Number</th>
                  <th>Stats</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => {
                  if (player._id === team.managerId) {
                    return (
                      <tr key={player._id} className="glass rounded-lg font-bold p-4">
                        <td>
                          <Image
                            src={player.profilePicture}
                            priority
                            height="150"
                            width="150"
                            alt="userPfp"
                          />
                        </td>
                        <td>
                          <Link className="link link-primary" href={`/users/${player._id}`}>
                            {player.firstName} {player.lastName}
                          </Link>
                        </td>
                        <td>Team Coach/Captain</td>
                        <td>{player.position}</td>
                        <td>{player.jerseyNumber}</td>
                        <td>
                          {player.statistics.wins}-{player.statistics.losses}
                        </td>
                      </tr>
                    );
                  }
                })}
                {players.map((player) => {
                  if (player._id !== team.managerId) {
                    return (
                      <tr key={player._id}>
                        <td>
                          <Image
                            src={player.profilePicture}
                            priority
                            height="150"
                            width="150"
                            alt="userPfp"
                          />
                        </td>
                        <td>
                          <Link className="link link-primary" href={`/users/${player._id}`}>
                            {player.firstName} {player.lastName}
                          </Link>
                        </td>
                        <td>Player/Member</td>
                        <td>{player.position}</td>
                        <td>{player.jerseyNumber}</td>
                        <td>
                          {player.statistics.wins}-{player.statistics.losses}
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        )}
        {selectedSection === "previous-competitions" && (
          <div>
            <h2>Previous Competitions</h2>
            {competitions.map((competition) => {
              return (
                <li key={competition._id}>
                  <Link className="link link-primary" href={`/tournaments/${competition._id}`}>
                    {competition.name}
                  </Link>
                </li>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default singleTeam;
