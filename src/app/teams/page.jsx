"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { useEffect, useState } from "react";
import { fetchTeams } from "./api";
import Link from "next/link";

function Teams(props) {
  const { data: session, status } = useSession();
  const [teamsLoading, setTeamsLoading] = useState(true);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const teamsData = await fetchTeams();
        if (teamsData !== null) {
          setTeams(teamsData);
          setTeamsLoading(false);
        } else {
          console.error("Invalid teams data:", teamsData);
          setTeamsLoading(false);
        }
      } catch (e) {
        console.error("Error fetching teams:", e);
        setTeamsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Render loading state if teams is still undefined
  if (teams === undefined) {
    return <div>Loading...</div>;
  }

  if (teamsLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1>List of teams</h1>
        <p>Loading teams...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold m-4">List of teams</h1>
      {teams &&
        teams.map((team) => (
          <div key={team._id} className="m-4 ">
            <Link href={`/teams/${team._id}`} className="text-lg font-bold">
              {team.name}
            </Link>
            <p className="text-sm">{team.sport}</p>
            <p className="text-sm">{team.location}</p>
          </div>
        ))}
    </div>
  );
}

export default Teams;
