'use client';
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";


export default function Form() {
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await signIn("credentials", {
          email: e.target.email.value,
          password: e.target.password.value,
          redirect: false,
        });
        // if (response.ok) {
        //   router.replace("/");
        // }
        if (!response.error) {
            router.push('/');
            router.refresh();
        }
      };
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
            <input className="border border-black text-black" type="email" name="email"/>
            <input className="border border-black text-black" type="password" name="password"/>
            <button type="submit">Register</button>
        </form>
    );
}