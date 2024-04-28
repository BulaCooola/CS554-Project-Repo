import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import Form from "./form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/profile");
  }
  return <Form />;
}
