"use client";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Form() {
  const router = useRouter();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    // validate inputs
    const response = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    console.log(response)
    if (!response.ok) {
      setError(true)
    }
    if (response.ok) {
      router.replace("/dashboard");
    }
    if (!response.error) {
      router.push("/");
      router.refresh();
    }
  };
  return (
    <main className="min-h-screen flex-col items-center p-24 bg-base">
      <h1 className="text-2xl font-semibold">Welcome Back!</h1>
      <Link className="link link-primary" href="/register">
        Don&apos;t have an account yet? Sign Up Now!
      </Link>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mx-auto max-w-sm mt-10 pb-16 rounded-xl bg-white"
      >
        <h1 className="text-2xl font-semibold my-4 mx-4">Login</h1>
        {error && (
          <div className="alert alert-error w-1/2 mx-auto">
            <p className="error" >Either email or password was incorrect</p>
          </div>
        )}
        <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
          Email
          <input type="email" name="email" id="email" required />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
          Password
          <input type="password" name="password" id="password" required />
        </label>
        <button className="btn btn-active btn-neutral flex mx-auto" type="submit">
          Login
        </button>
      </form>
    </main>
  );
}
