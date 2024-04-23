import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react';
import Form from './form'
import { redirect } from 'next/navigation';

export default async function LoginPage() {
    // const session = await getServerSession();
    const session = await getSession();
    if (session) {
        redirect('/dashboard');
    }
    return (
        <Form />
    )
}