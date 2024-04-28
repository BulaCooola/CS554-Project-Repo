'use client';
import { signOut } from "next-auth/react";

export default function Logout() {
    return (
        <span onClick={(e) => {
            e.preventDefault();
            signOut();
        }}>
            Logout
        </span>
    );
}