"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { useEffect, useState } from "react";
import { fetchTeams } from "./api";
import Link from "next/link";

function Teams(props) {
  const { data: session, status } = useSession();
  const [teamsLoading, setTeamsLoading] = useState(true);
  const [sports, setSports] = useState(undefined);
  const [teams, setTeams] = useState([]);
  const [selectedSport, setSelectedSport] = useState("All"); // Default to show all teams

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/sports");
      const sports = await response.json();
      console.log(sports.sports);
      setSports(sports.sports);
      setLoading(false);
    }
    fetchData();
  }, []);

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

  const filteredTeams =
    selectedSport === "All" ? teams : teams.filter((team) => team.sport === selectedSport);

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
    <main className="min-h-screen justify-between p-12 bg-base">
      <div>
        <h1 className="text-2xl font-bold m-4">List of teams</h1>
        {session && (
          <div className="card-actions justify-end">
            <button className="btn btn-primary">
              <Link href={`/teams/create`}>Create Team</Link>
            </button>
          </div>
        )}
        <div className="glass rounded-lg p-4 m-4">
          <p>Sort by:</p>
          <select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            className="mt-4 p-2 rounded-md border border-gray-300"
          >
            <option key="All" value="All">
              All
            </option>
            {sports.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {selectedSport === "All"
            ? teams.map((team) => (
                <div key={team._id} className="card bg-base-100 shadow-lg p-4">
                  <Link
                    href={`/teams/${team._id}`}
                    className="text-lg font-semibold link link-primary"
                  >
                    {team.name}
                  </Link>
                  <p className="text-sm">{team.sport}</p>
                  <p className="text-sm">{team.location}</p>
                </div>
              ))
            : teams
                .filter((team) => team.sport === selectedSport)
                .map((team) => (
                  <div key={team._id} className="card bg-base-100 shadow-lg p-4">
                    <Link
                      href={`/teams/${team._id}`}
                      className="text-lg font-semibold link link-primary"
                    >
                      {team.name}
                    </Link>
                    <p className="text-sm">{team.sport}</p>
                    <p className="text-sm">{team.location}</p>
                  </div>
                ))}
        </div>
      </div>
    </main>
  );
}

export default Teams;
