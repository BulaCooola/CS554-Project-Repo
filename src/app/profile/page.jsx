"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PlayerProfile(props) {
  const [isLoading, setIsLoading] = useState(true);

  const { data: session, status, update } = useSession();
  console.log("session on page");
  console.log(session);
  console.log(status);

  useEffect(() => {
    // Check if all necessary data is available
    if (session && session.user && session.user.email) {
      // All necessary data is available, set isLoading to false
      setIsLoading(false);
    }
  }, [session]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>
        {session.user.firstName} {session.user.lastName}
      </h1>
      {session.user.profilePicture && (
        <Image src={session.user.profilePicture} priority height="256" width="256" alt="userPfp" />
      )}
      <p>Email: {session.user.email}</p>
      <p>Phone: {session.user.phone}</p>
    </div>
  );
}
