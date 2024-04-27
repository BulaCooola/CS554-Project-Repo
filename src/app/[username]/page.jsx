"use client";
import { useSession } from "next-auth/react";

function playerProfile(props) {
  const session = useSession();
  return (
    <div>
      Personal Profile Page
      <h2> Hi {session?.data.user.name}</h2>
    </div>
  );
}

export default playerProfile;
