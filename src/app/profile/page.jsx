"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {useFormState as useFormState} from 'react-dom'
import Image from "next/image";
import {imageToPfp} from './actions.js'
const initialState = {message: "", newImg: ""}

export default function PlayerProfile(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [state, formAction] = useFormState(imageToPfp,initialState)

  const { data: session, status, update } = useSession();
  //console.log("session on page");
  //console.log(session);
  //console.log(status);

  useEffect(() => {
    // Check if all necessary data is available
    if (session && session.user && session.user.email) {
      // All necessary data is available, set isLoading to false
      setIsLoading(false);
    }
  }, [session]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>
        {session.user.firstName} {session.user.lastName}
      </h1>
      {session.user.profilePicture && (<>
        <Image src={session.user.profilePicture} priority height="150" width="150" alt="userPfp" />
        <form action={formAction}>
            <input className="border border-black" type="file" name="file"/>
            <input hidden name="userId" readOnly value={session.user.id}/>
            <button>Submit</button>
        </form>
      </>)}
      {state && state.message && (
        <ul>
          {state.message.map((msg, index) => {
            return (
              <li key={index}>
                {msg}
              </li>
            )
          })}
        </ul>
      )}
      {state && state.newImg && (
        <Image src={state.newImg} priority height="150" width="150" alt="newUserPfp" />
      )}
      <p>Email: {session.user.email}</p>
      <p>Phone: {session.user.phone}</p>
    </div>
  );
}
