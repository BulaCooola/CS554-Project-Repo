import { signIn, useSession } from "next-auth/react";
import Form from './form'
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth'

export default async function RegisterPage() {
    const session = await getServerSession();
    if (session) {
        redirect('/');
    }
    return (
        <Form />
    )
}