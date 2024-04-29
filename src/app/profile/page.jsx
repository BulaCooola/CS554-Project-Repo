"use client";
import { useSession, signOut } from 'next-auth/react';
export default function playerProfile(props) {
  
  const { data: session, status, update } = useSession()
  console.log(session)
  if (session) {console.log("session on page");console.log(session)}
  return (
    <div>
      Personal Profile Page
    </div>
  );
}