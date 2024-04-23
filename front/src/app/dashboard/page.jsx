'use client';

import { useSession } from "next-auth/react"

export default function DashboardPage() {
    const session = useSession();
    return (
    <div>
        Private Dashboard = you need to be logged in
        <h2> Hi {session?.data.user.name}</h2>
    </div>)
}