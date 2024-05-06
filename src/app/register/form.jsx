"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
      <input
        className="border border-black text-white"
        type="email"
        name="email"
        placeholder="Email"
      />
      <input
        className="border border-black text-white"
        type="text"
        name="firstName"
        placeholder="First Name"
      />
      <input
        className="border border-black text-white"
        type="text"
        name="lastName"
        placeholder="Last Name"
      />
      <input
        className="border border-black text-white"
        type="text"
        name="username"
        placeholder="Username"
      />
      <input
        className="border border-black text-white"
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
      />
      <input
        className="border border-black text-white"
        type="password"
        name="password"
        placeholder="Password"
      />
      <input
        className="border border-black text-white"
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
      />
      <button type="submit">Register</button>
    </form>
  );
}
