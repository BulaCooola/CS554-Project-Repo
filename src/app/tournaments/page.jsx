"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchTournaments } from "./api";
import Link from "next/link";

function AllTournaments(props) {
  const { data: session, status } = useSession();
  const [tournamentsLoading, setTournamentsLoading] = useState(true);
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const tourneyData = await fetchTournaments();
        if (tourneyData !== null) {
          setTournaments(tourneyData);
          setTournamentsLoading(false);
        } else {
          console.error("Invalid tournaments data:", tourneyData);
          setTournamentsLoading(false);
        }
      } catch (e) {
        console.error("Error fetching tournaments:", e);
        setTournamentsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (tournamentsLoading) {
    return (
      <div className="min-h-screen justify-between p-24 bg-base">
        <h1 className="text-2xl font-semibold">List of tournaments</h1>
        <p>Loading tournaments...</p>
        <p className="loading loading-dots loading-lg">Loading...</p>
      </div>
    );
  } else {
  return (
    <main className="min-h-screen justify-between p-24 bg-base">
      <div>
        <h1 className="text-2xl font-semibold">List of tournaments</h1>
        {session && (
          <div className="card-actions justify-end">
            <button className="btn btn-primary">
              <Link href={`/tournaments/create`}>Create Bracket</Link>
            </button>
          </div>
        )}
        {tournaments &&
          tournaments.map((tournament) => (
            <div key={tournament._id} className="card bg-base-100 shadow-lg m-4 p-4 max-w-96 mx-auto">
              <Link className="text-lg font-semibold link link-primary" href={`/tournaments/${tournament._id}`}>{tournament.name}</Link>
              <p className="text-sm">{tournament.description}</p>
              <p className="text-sm">Start Date: {tournament.startDate}</p>
              <p className="text-sm">End Date: {tournament.endDate} </p>
            </div>
          ))}
      </div>
    </main>
  );}
}

export default AllTournaments;
