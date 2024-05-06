"use client";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

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

    if (response.ok) {
      router.replace("/dashboard");
    } else {
      setErrorMessage(response.error || "An error occurred. Please try again.");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mx-auto max-w-md mt-10"
    >
      <input
        className="border border-black text-black"
        type="email"
        name="email"
      />
      <input
        className="border border-black text-black"
        type="password"
        name="password"
      />
      {errorMessage && (
        <div role="alert" className="text-red-500">
          {errorMessage}
        </div>
      )}
      
      <button type="submit">Login</button>
    </form>
  );
}
