"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {useFormState as useFormState} from 'react-dom'
import Image from "next/image";
import {imageToPfp, updateProfile} from './actions.js'
const initialState = {message: "", newImg: null}
const initialStateTwo = {message: "", updatedData: null}

export default function PlayerProfile(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [state, formAction] = useFormState(imageToPfp,initialState)
  const [stateTwo, formActionTwo] = useFormState(updateProfile, initialStateTwo)

  const { data: session, status, update } = useSession();
  //console.log("session on page");
  //console.log(session);
  //console.log(status);

  useEffect(() => {
    // Check if all necessary data is available
    if (session && session.user && session.user.email) {
      // All necessary data is available, set isLoading to false
      console.log("Session")
      console.log(session)
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (session && session.user && state && state.newImg) {
      const updateProfilePicture = async () => {
        const newSession = {
          ...session,
          user: {
            ...session?.user,
            profilePicture: state.newImg
          },
        };
        console.log("Session to update")
        console.log(newSession)
        console.log("Updated session")
        console.log(await update(newSession));
      };
      updateProfilePicture()
    }
  }, [state]);

  useEffect(() => {
    if (session && session.user && stateTwo && stateTwo.updatedData) {
      const updateUserData = async () => {
        const newSession = {
          ...session,
          user: {
            ...session?.user,
            firstName: stateTwo.updatedData.firstName,
            lastName: stateTwo.updatedData.lastName,
            phone: stateTwo.updatedData.phone,
            email: stateTwo.updatedData.email
          },
        };
        console.log("Session to update")
        console.log(newSession)
        console.log("Updated session")
        console.log(await update(newSession));
      };
      updateUserData()
    }
  }, [stateTwo]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>
        My Profile
      </h1>
      {session.user.profilePicture && (<>
        <Image src={session.user.profilePicture} priority height="150" width="150" alt="userPfp" />
        <form action={formAction}>
          <label>
            Upload New Profile Picture:
            <input className="border border-black" type="file" name="file"/>
          </label>
            <input hidden name="userId" readOnly value={session.user.id}/>
            <button>Submit</button>
        </form>
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
        <form action={formActionTwo}>
          <label>
            First Name:
            <br/>
            <input
              defaultValue={session.user.firstName}
              name='firstName'
            />
          </label>
          <br />
          <label>
            Last Name:
            <br/>
            <input
              defaultValue={session.user.lastName}
              name='lastName'
            />
          </label>
          <br />
          <label>
            Email:
            <br/>
            <input
              defaultValue={session.user.email}
              name='email'
            />
          </label>
          <br />
          <label>
            Phone Number:
            <br/>
            <input
              defaultValue={session.user.phone}
              name='phone'
            />
          </label>
          <br/>
          <input hidden name="userId" readOnly value={session.user.id}/>
          <button>Submit</button>
        </form>
        {stateTwo && stateTwo.message && (
        <ul>
          {stateTwo.message.map((msg, index) => {
            return (
              <li key={`two${index}`}>
                {msg}
              </li>
            )
          })}
        </ul>
        )}
      </>)}
      <p>Email: {session.user.email}</p>
      <p>Phone: {session.user.phone}</p>
    </div>
  );
}
