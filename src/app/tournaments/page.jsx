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

  // Render loading state if teams is still undefined
  if (tournaments === undefined) {
    return <div>Loading...</div>;
  }

  if (tournamentsLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1>List of tournaments</h1>
        <p>Loading tournaments...</p>
      </div>
    );
  }
  return (
    <main className="min-h-screen justify-between p-24 bg-base">
    <div className="flex flex-col justify-center items-center">
      {session && (
        <button>
          <Link href={`/tournaments/create`}>Create Bracket</Link>
        </button>
      )}
      <h1>List of tournaments</h1>
      {tournaments &&
        tournaments.map((tournament) => (
          <div key={tournament._id} className="m-4 ">
            <Link href={`/tournaments/${tournament._id}`}>{tournament.name}</Link>
            <p className="text-sm">Start Date: {tournament.startDate}</p>
            <p className="text-sm">End Date: {tournament.endDate} </p>
          </div>
        ))}
      </div>
      </main>
  );
}

export default AllTournaments;
