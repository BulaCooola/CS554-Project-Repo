"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchUsers } from "./api";
import Link from "next/link";

function AllUsers(props) {
  const { data: session, status } = useSession();
  const [usersLoading, setUsersLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const usersData = await fetchUsers();
        if (usersData !== null) {
          setUsers(usersData);
          setUsersLoading(false);
        } else {
          console.error("Invalid users data:", usersData);
          setUsersLoading(false);
        }
      } catch (e) {
        console.error("Error fetching users:", e);
        setUsersLoading(false);
      }
    }
    fetchData();
  }, []);

  if (usersLoading) {
    return (
      <div className="min-h-screen justify-between p-24 bg-base">
        <h1 className="text-2xl font-semibold">List of Users</h1>
        <p>Loading users...</p>
        <p className="loading loading-dots loading-lg">Loading...</p>
      </div>
    );
  } else {
  return (
    <main className="min-h-screen justify-between p-24 bg-base">
      <div>
        <h1 className="text-2xl font-semibold">List of Users</h1>
        {users &&
          users.map((user) => (
            <div key={user._id} className="card bg-base-100 shadow-lg m-4 p-4 max-w-96 mx-auto">
              <Link className="text-lg font-semibold link link-primary" href={`/users/${user._id}`}>
                {user.firstName} {user.lastName}
              </Link>
              <p>{user.hometown ? user.hometown : ""}</p>
            </div>
          ))}
      </div>
    </main>
  );}
}

export default AllUsers;