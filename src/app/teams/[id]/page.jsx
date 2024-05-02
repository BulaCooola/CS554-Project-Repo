"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

function singleTeam({ params }) {
  const [team, setTeam] = useState(undefined);
  const [players, setPlayers] = useState(undefined)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/teams/${params.id}`);
      const team = await response.json();
      setTeam(team);
      const response2 = await fetch(`/api/teams/${params.id}/players`)
      const playersList = await response2.json()
      setPlayers(playersList)
      console.log(playersList)
      setLoading(false)
    }
    fetchData()
  },[])
 if (loading) {
    return <div>Loading</div>;
 } else {
   return (
     <main className="min-h-screen justify-between p-24 bg-base">
       <h1>{team.name}</h1>
       <h3>{team.sport}</h3>
       <h3>{team.location}</h3>
       <h3>Record: {team.numWins}-{team.numLosses}</h3>
       {players && players.length>0 && 
         <div>
           <h3>Players:</h3>
            <ul>
             {players.map((player) => {
               return (
                 <li key={player._id}><Link className="link link-primary" href={`/users/${player._id}`}>{player.firstName} {player.lastName}</Link></li>
                )
              })}
            </ul>
        </div>
       }
     </main>
   )
  }
}

export default singleTeam;
