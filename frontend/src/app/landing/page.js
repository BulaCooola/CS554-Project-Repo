"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Landing = () => {
  const data = useSession();
  const router = useRouter();
  console.log(data);
  if (data.status == "unauthenticated") {
    return (
      <div>
        <h1>Landing</h1>
        <Link href="/login">Login</Link>
      </div>
    );
  } else {
    router.replace("/");
  }
};

export default Landing;
