"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Form() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    let confirmPassword = e.target.confirmPassword.value;
    let username = e.target.username.value;
    let firstName = e.target.firstName.value;
    let lastName = e.target.lastName.value;
    let phoneNumber = e.target.phoneNumber.value;
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        username: username,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      }),
    });
    if (response.ok) {
      router.replace("/login");
    }
  };
  return (
    <main className="min-h-screen flex-col items-center p-24 bg-base">
      <h1 className="text-2xl font-semibold">Welcome to TourneyPro!</h1>
      <Link className="link link-primary" href="/login">Already have an account? Login Here!</Link>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-sm mt-10 pb-16 rounded-xl bg-white">
        <h1 className="text-2xl font-semibold my-4 mx-4">Register</h1>
        <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
          Email
          <input
            type="email"
            name="email"
            id="email"
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
          First Name
          <input
            type="text"
            name="firstName"
            id="firstName"
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
          Last Name
          <input
            type="text"
            name="lastName"
            id="lastName"
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
          Username
          <input
            type="text"
            name="username"
            id="username"
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
          Phone Number
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
          Password
          <input
            type="password"
            name="password"
            id="password"
            required
          />
          </label>
        <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
          />
        </label>
        <button className="btn btn-active btn-neutral flex mx-auto" type="submit">Register</button>
      </form>
    </main>
  );
}
