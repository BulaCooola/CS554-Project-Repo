"use client";

import React from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const data = useSession();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    const resss = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (resss.ok) {
      router.replace("/");
    }
  };
  return (
    <div>
      <h1>Login page</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Email Address
            <input type="text" name="email" />
          </label>
          <label>
            Password
            <input type="password" name="password" />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
