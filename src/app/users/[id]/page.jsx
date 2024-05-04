"use client";
import React, { useState , useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import {getUserIdAction} from "./actions"

function publicUser(props) {
  const [ loading, setLoading ] = useState(true);
  const [ user, setUser ] = useState(undefined);
  const [ error, setError ] = useState(false)
  const [ errorMess, setErrorMess] = useState("")
  let params = useParams();
  let userId = params.id;
  useEffect(() => {
    const getById = async () => {
      let result = await getUserIdAction(userId)
      setUser(result.user)
      setError(result.error)
      setErrorMess(result.errorMess)
      setLoading(false)
    }
    getById()
  }, [userId]);
  if (loading) return <div>Loading...</div>
  else if (error) return <div>{errorMess}</div>
  else {
    return (
      <div>
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      {user.profilePicture && (<>
        <Image src={user.profilePicture} priority height="150" width="150" alt="userPfp" />
      </>)}
      <p>Email: {user.email}</p>
      <p>Phone: {user.phoneNumber}</p>
    </div>
    );
  }
}

export default publicUser;