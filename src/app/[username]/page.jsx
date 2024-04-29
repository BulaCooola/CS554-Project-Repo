"use client";
import { useSession } from "next-auth/react";

function PlayerProfile(props) {
  const session = useSession();
  console.log(session.data.user);
  return (
    <div>
      Personal Profile Page
      <h2> Hi {session?.data?.user.name}</h2>
    </div>
  );
}

export default PlayerProfile;
