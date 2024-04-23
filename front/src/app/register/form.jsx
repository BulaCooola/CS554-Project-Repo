'use client';
import { signIn, useSession } from "next-auth/react";


export default function Form() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target.email.value)
        let email = e.target.email.value;
        let password = e.target.password.value;
        let confirmPassword = e.target.confirmPassword.value;
        let firstName = e.target.firstName.value;
        let lastName = e.target.lastName.value;
        let phoneNumber = e.target.phoneNumber.value;
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber
            })
        })
        // const response = await signIn("Credentials", {
        //   redirect: false,
        //   email,
        //   password,
        // });
        if (response.ok) {
          router.replace("/");
        }
      };
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
            <input className="border border-black text-black" type="email" name="email"/>
            <input className="border border-black text-black" type="text" name="firstName"/>
            <input className="border border-black text-black" type="text" name="lastName"/>
            <input className="border border-black text-black" type="text" name="phoneNumber"/>
            <input className="border border-black text-black" type="password" name="password"/>
            <input className="border border-black text-black" type="password" name="confirmPassword"/>
            <button type="submit">Register</button>
        </form>
    );
}