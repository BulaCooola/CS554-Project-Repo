"use client";
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
export default function playerProfile(props) {
  
  const { data: session, status, update } = useSession()
  console.log(session)
  if (session) {console.log("session on page");console.log(session)}
  return (
    <div>
      <h1>{session.user.firstName} {session.user.lastName}</h1>
      <Image src={session.user.profilePicture} priority height='256' width='256' alt='userPfp'/>
      <p>Email: {session.user.email}</p>
      <p>Phone: {session.user.phone}</p>
    </div>
  );
}