"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getUserIdAction } from "./actions";
import Error from "@/app/components/ErrorMessage";

function PublicUser(props) {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState(true);
  const [user, setUser] = useState(undefined);
  const [error, setError] = useState(false);
  const [errorMess, setErrorMess] = useState("");

  let params = useParams();
  let userId = params.id;
  useEffect(() => {
    const getById = async () => {
      let result = await getUserIdAction(userId);
      setUser(result.user);
      setError(result.error);
      setErrorMess(result.package);
      setLoading(false);
    };
    getById();
  }, [userId]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users/${userId}/teams`);
      if (!response.ok) {
        setErrorMess(response);
      } else {
        const teamsList = await response.json();
        setTeams(teamsList);
      }
    }
    fetchData();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen justify-between p-24 bg-base">
        <p>Loading User</p>
        <p className="loading loading-dots loading-lg">Loading...</p>
      </div>
    );
  } else if (error) return <Error error={errorMess} />;
  else {
    return (
      <div className="min-h-screen justify-between p-24 bg-base">
        <div className="title my-4 ">
          <h1 className="text-4xl font-bold">
            {user.firstName} {user.lastName}
          </h1>
        </div>
        {user.profilePicture && (
          <>
            <Image src={user.profilePicture} priority height="150" width="150" alt="userPfp" />
          </>
        )}

        <p>Email: {user.email}</p>
        <p>Phone: {user.phoneNumber}</p>
        {teams && (
          <div>
            <h1 className="text-2xl font-semibold">{user.firstName}&apos;s Teams</h1>
            <ul>
              {teams?.map((team) => {
                return (
                  <li key={team._id}>
                    <Link className="link link-primary" href={`/teams/${team._id}`}>
                      {team.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default PublicUser;
