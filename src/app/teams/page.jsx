"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { useEffect, useState } from "react";
import { fetchTeams } from "./api";
import Link from "next/link";

function Teams(props) {
  const { data: session, status } = useSession();

  const [teamsLoading, setTeamsLoading] = useState(true);
  const [loading, setLoading] = useState(true)
  const [sports, setSports] = useState(undefined);
  const [teams, setTeams] = useState([]);
  // Filter useStates
  const [selectedSport, setSelectedSport] = useState("All");
  const [sortCriteria, setSortCriteria] = useState("");
  // Page useStates
  const [currentPage, setCurrentPage] = useState(1);
  const [teamsPerPage, setTeamsPerPage] = useState(9);

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

  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    if (newItemsPerPage >= 6 && newItemsPerPage <= 50) {
      setTeamsPerPage(newItemsPerPage);
      setCurrentPage(1);
    }
  };

  const handleSortChange = (value) => {
    switch (value) {
      case "mostGames":
        handleSortByGames("desc");
        break;
      case "leastGames":
        handleSortByGames("asc");
        break;
      case "mostWins":
        handleSortByWins("desc");
        break;
      case "leastWins":
        handleSortByWins("asc");
        break;
      case "mostLosses":
        handleSortByLosses("desc");
        break;
      case "leastLosses":
        handleSortByLosses("asc");
        break;
      default:
        break;
    }
  };

  const handleSortByGames = (order) => {
    const sortedTeams = [...teams].sort((a, b) => {
      return order === "asc" ? a.numGames - b.numGames : b.numGames - a.numGames;
    });
    setTeams(sortedTeams);
    setSortCriteria("Games");
  };

  const handleSortByWins = (order) => {
    const sortedTeams = [...teams].sort((a, b) => {
      return order === "asc" ? a.numWins - b.numWins : b.numWins - a.numWins;
    });
    setTeams(sortedTeams);
    setSortCriteria("Wins");
  };

  const handleSortByLosses = (order) => {
    const sortedTeams = [...teams].sort((a, b) => {
      return order === "asc" ? a.numLosses - b.numLosses : b.numLosses - a.numLosses;
    });
    setTeams(sortedTeams);
    setSortCriteria("Losses");
  };

  if (teamsLoading || loading) {
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
            
              <Link className="btn btn-primary" href={`/teams/create`}>Create Team</Link>
            
          </div>
        )}
        <div className="navbar glass rounded-2xl p-4 m-4 flex flex-col md:flex-row items-center">
          <div className="navbar-start">
            <p className="p-2">Sort by: </p>
            <select
              value={selectedSport}
              onChange={(e) => {
                setSelectedSport(e.target.value);
                setCurrentPage(1);
              }}
              className="p-2 md:mr-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 text-sm md:text-base"
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
          <div className="navbar-center">
            <h1 className="text-4xl font-bold m-4">List of teams</h1>
          </div>
          <div className="navbar-end">
            <p className="p-2">Items per page:</p>
            <select
              value={teamsPerPage}
              onChange={handleItemsPerPageChange}
              className="p-2 rounded-md border border-gray-300 items-center"
            >
              {[9, 10, 20, 30].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="navbar-end">
            <p className="p-2">Filters: </p>
            <select onChange={(e) => handleSortChange(e.target.value)}>
              <option value="">Select Option</option>
              <option value="mostGames">Most Games</option>
              <option value="leastGames">Least Games</option>
              <option value="mostWins">Most Wins</option>
              <option value="leastWins">Least Wins</option>
              <option value="mostLosses">Most Losses</option>
              <option value="leastLosses">Least Losses</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {selectedSport === "All"
            ? currentTeams.map((team) => (
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
            : currentTeams
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
            disabled={currentPage === Math.ceil(filteredTeams.length / teamsPerPage)}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
        <div className="flex flex-col items-center justify-center md:flex-row md:justify-center">
          <ul className="pagination flex flex-wrap">
            {Array.from({ length: Math.ceil(filteredTeams.length / teamsPerPage) }, (_, index) => (
              <li key={index} className="page-item m-2">
                <a
                  onClick={() => paginate(index + 1)}
                  href={`#${currentPage}`}
                  className={`page-link ${currentPage === index + 1 ? "text-primary" : ""}`}
                >
                  {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Teams;
