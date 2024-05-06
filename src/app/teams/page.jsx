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

  if (teamsLoading) {
    return (
      <div className="min-h-screen justify-between p-24 bg-base">
        <h1 className="text-2xl font-semibold">List of teams</h1>
        <p>Loading teams...</p>
        <p className="loading loading-dots loading-lg">Loading...</p>
      </div>
    );
  }
  return (
    <main className="min-h-screen justify-between  p-24 bg-base">
      <div>
        <h1 className="text-2xl font-semibold">List of teams</h1>
        {session && (
          <div className="card-actions justify-end">
            <button className="btn btn-primary">
              <Link href={`/teams/create`}>Create Team</Link>
            </button>
          </div>
        )}
        {teams &&
          teams.map((team) => (
            <div key={team._id} className="card bg-base-100 shadow-lg m-4 p-4 max-w-96 mx-auto">
              <Link href={`/teams/${team._id}`} className="text-lg font-semibold link link-primary">
                {team.name}
              </Link>
              <p className="text-sm">{team.sport}</p>
              <p className="text-sm">{team.location}</p>
            </div>
          ))}
      </div>
    </main>
  );
}

export default Teams;
