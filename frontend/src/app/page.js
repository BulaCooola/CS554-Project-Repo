"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
const Home = () => {
  const data = useSession();
  console.log(data);
  return (
    <div>
      {data.status === "unauthenticated" ? (
        <Link href="/login">Login</Link>
      ) : (
        <button onClick={() => signOut()}>signOut</button>
      )}
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
