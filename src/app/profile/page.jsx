"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { fetchBrackets } from "./api";
import Link from "next/link";

function PlayerProfile(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [brackets, setBrackets] = useState([]);

  const { data: session, status, update } = useSession();
  console.log("session on page");
  console.log(session);

  useEffect(() => {
    async function fetchData() {
      if (session && session.user && session.user.id && session.user.email) {
        try {
          console.log(session.user.id);
          const brackets = await fetchBrackets(session.user.id);
          if (brackets) {
            setBrackets(brackets.allBrackets);
          }
        } catch (e) {
          console.error(`Error fetching tournament brackets: ${e}`);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchData();
    // if (session && session.user && session.user.email) {
    //   setIsLoading(false);
    // }
  }, [session]);

  if (status === "unauthenticated") {
    redirect("/login");
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>
        {session.user.firstName} {session.user.lastName}
      </h1>
      {session.user.profilePicture && (
        <Image src={session.user.profilePicture} priority height="256" width="256" alt="userPfp" />
      )}
      <p>Email: {session.user.email}</p>
      <p>Phone: {session.user.phone}</p>
      <br></br>
      <div>
        <h2 className="flex flex-col justify-center items-center">My Hosted Tournaments</h2>
        <ul className="m-4">
          {brackets &&
            brackets.map((bracket) => (
              <li key={bracket._id}>
                <Link href={`/tournaments/${bracket._id}`}>{bracket.name}</Link>
                <p className="text-sm text-gray-400">{bracket.description}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default PlayerProfile;
