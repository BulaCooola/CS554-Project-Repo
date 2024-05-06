"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchTournaments } from "./api";
import Link from "next/link";

function AllTournaments(props) {
  const { data: session, status } = useSession();
  const [tournamentsLoading, setTournamentsLoading] = useState(true);
  const [tournaments, setTournaments] = useState([]);
  const [filter, setFilter] = useState("All");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

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

  const getTournamentStatus = (startDate, endDate) => {
    const currentDate = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (currentDate < start) {
      return "Upcoming";
    } else if (currentDate >= start && currentDate <= end) {
      return "Live";
    } else {
      return "Ended";
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  const filteredTournaments = tournaments.filter((tournament) => {
    const status = getTournamentStatus(tournament.startDate, tournament.endDate);
    return filter === "All" || status === filter;
  });

  const indexOfLastTournaments = currentPage * pageSize;
  const indexOfFirstTournaments = indexOfLastTournaments - pageSize;
  const currentTournaments = filteredTournaments.slice(
    indexOfFirstTournaments,
    indexOfLastTournaments
  );
  const totalPages = Math.ceil(filteredTournaments.length / pageSize);

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when page size changes
  };

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
          <div className="mt-4 mb-2">
            <label htmlFor="filter">Filter by:</label>
            <select id="filter" className="ml-2" value={filter} onChange={handleFilterChange}>
              <option value="All">All</option>
              <option value="Ended">Ended</option>
              <option value="Live">Live</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>
          <div className="mt-4 mb-2">
            <label htmlFor="pageSize">Tournaments per page:</label>
            <select id="pageSize" className="ml-2" value={pageSize} onChange={handlePageSizeChange}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
          {/* If tournament is past start date but not end date, put under live */}
          {/* If tournament is before start date, put as upcoming */}
          {/* If tournament is past end date, put as ended */}
          {currentTournaments &&
            currentTournaments.map((tournament) => {
              // Apply filter based on selection
              const status = getTournamentStatus(tournament.startDate, tournament.endDate);
              if (filter !== "All" && status !== filter) {
                return null; // Skip rendering if not ended
              }
              return (
                <div key={tournament._id} className="card bg-base-100 shadow-lg m-4 p-4 mx-auto">
                  <Link
                    className="text-lg font-semibold link link-primary"
                    href={`/tournaments/${tournament._id}`}
                  >
                    {tournament.name}
                  </Link>
                  <p className="text-sm">{tournament.description}</p>
                  <p className="text-sm">Start Date: {tournament.startDate}</p>
                  <p className="text-sm">End Date: {tournament.endDate} </p>
                  <p className="text-sm">
                    Status: {getTournamentStatus(tournament.startDate, tournament.endDate)}
                  </p>
                  <p className="text-sm">Sport: {tournament.sport}</p>
                </div>
              );
            })}
          <div className="mt-4">
            <button
              className="btn btn-outline mr-2"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <button
              className="btn btn-outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    );
  }
}

export default AllTournaments;
