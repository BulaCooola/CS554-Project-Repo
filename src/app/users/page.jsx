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

  // Render loading state if teams is still undefined
  if (users === undefined) {
    return <div>Loading...</div>;
  }

  if (usersLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1>List of teams</h1>
        <p>Loading teams...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>List of users</h1>
      {users &&
        users.map((user) => (
          <div key={user._id} className="m-4 ">
            <Link href={`/users/${user._id}`}>
              {user.firstName} {user.lastName}
            </Link>
            <p>{user.hometown ? user.hometown : ""}</p>
          </div>
        ))}
    </div>
  );
}

export default AllUsers;
