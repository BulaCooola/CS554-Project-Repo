"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useFormState as useFormState } from "react-dom";
import Image from "next/image";
import { redirect } from "next/navigation";
import { fetchBrackets, fetchCompetitions, fetchLedTeams, fetchAffiliatedTeams } from "./api";
import Link from "next/link";
import { imageToPfp, updateProfile } from "./actions.js";
const initialState = { message: "", newImg: null };
const initialStateTwo = { message: "", updatedData: null };

function PlayerProfile(props) {
  console.log(props);
  const [isLoading, setIsLoading] = useState(true);
  const [hostedBrackets, setHostedBrackets] = useState([]);
  const [attendedBrackets, setAttendedBrackets] = useState([]);
  const [ledTeams, setLedTeams] = useState([]);
  const [affiliatedTeams, setAffiliatedTeams] = useState([]);

  const [state, formAction] = useFormState(imageToPfp, initialState);
  const [stateTwo, formActionTwo] = useFormState(updateProfile, initialStateTwo);

  const { data: session, status, update } = useSession();
  //console.log("session on page");
  //console.log(session);
  //console.log(status);

  useEffect(() => {
    async function fetchData() {
      if (session && session.user && session.user._id && session.user.email) {
        try {
          const brackets = await fetchBrackets(session.user._id);
          if (brackets) {
            setHostedBrackets(brackets.allBrackets);
          }
          const competitions = await fetchCompetitions(session.user._id);
          if (competitions) {
            setAttendedBrackets(competitions.allBrackets);
          }
          const lteams = await fetchLedTeams(session.user._id);
          if (lteams) {
            setLedTeams(lteams.allTeams);
          }
          const ateams = await fetchAffiliatedTeams(session.user._id);
          if (ateams) {
            setAffiliatedTeams(ateams.allTeams);
          }
        } catch (e) {
          console.error(`Error fetching tournament brackets: ${e}`);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (session && session.user && state && state.newImg) {
      const updateProfilePicture = async () => {
        const newSession = {
          ...session,
          user: {
            ...session?.user,
            profilePicture: state.newImg,
          },
        };
        console.log("Session to update");
        console.log(newSession);
        console.log("Updated session");
        console.log(await update(newSession));
      };
      updateProfilePicture();
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
            email: stateTwo.updatedData.email,
          },
        };
        console.log("Session to update");
        console.log(newSession);
        console.log("Updated session");
        console.log(await update(newSession));
      };
      updateUserData();
    }
  }, [stateTwo]);

  if (!session) {
    redirect("/login");
  }
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl m-4">
          Hi {session?.user?.firstName} {session?.user?.lastName}
        </h1>
        <div className="flex flex-col justify-center items-center">
          <h2 className="flex flex-col justify-center items-center text-xl">
            My Hosted Tournaments
          </h2>
          <p className="loading loading-dots loading-lg">Loading...</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="flex flex-col justify-center items-center text-xl">
            Attended Tournaments
          </h2>
          <p className="loading loading-dots loading-lg">Loading...</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="flex flex-col justify-center items-center text-xl">Managed Teams</h2>
          <p className="loading loading-dots loading-lg">Loading...</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="flex flex-col justify-center items-center text-xl">Affiliate Teams</h2>
          <p className="loading loading-dots loading-lg">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl m-4">
        Hi {session.user.firstName} {session.user.lastName}
      </h1>
      {session.user.profilePicture && (
        <>
          <Image
            src={session.user.profilePicture}
            priority
            height="150"
            width="150"
            alt="userPfp"
          />
          <form action={formAction}>
            <label>
              Upload New Profile Picture:
              <input className="border border-black" type="file" name="file" />
            </label>
            <input hidden name="userId" readOnly value={session.user.id} />
            <button>Submit</button>
          </form>
          {state && state.message && (
            <ul>
              {state.message.map((msg, index) => {
                return <li key={index}>{msg}</li>;
              })}
            </ul>
          )}
          <form action={formActionTwo}>
            <label>
              First Name:
              <br />
              <input defaultValue={session.user.firstName} name="firstName" />
            </label>
            <br />
            <label>
              Last Name:
              <br />
              <input defaultValue={session.user.lastName} name="lastName" />
            </label>
            <br />
            <label>
              Email:
              <br />
              <input defaultValue={session.user.email} name="email" />
            </label>
            <br />
            <label>
              Phone Number:
              <br />
              <input defaultValue={session.user.phone} name="phone" />
            </label>
            <br />
            <input hidden name="userId" readOnly value={session.user.id} />
            <button>Submit</button>
          </form>
          {stateTwo && stateTwo.message && (
            <ul>
              {stateTwo.message.map((msg, index) => {
                return <li key={`two${index}`}>{msg}</li>;
              })}
            </ul>
          )}
        </>
      )}
      <div className="text-md">
        Contact Information
        <p className="text-sm text-gray-400">{session.user.email}</p>
        <p className="text-sm text-gray-400">{session.user.phone}</p>
      </div>
      <br></br>
      <div>
        <h2 className="flex flex-col justify-center items-center text-xl">My Hosted Tournaments</h2>
        <ul className="m-4">
          {hostedBrackets &&
            hostedBrackets.map((bracket) => (
              <li key={bracket._id}>
                <Link href={`/tournaments/${bracket._id}`}>{bracket.name}</Link>
                <p className="text-sm text-gray-400">{bracket.description}</p>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <h2 className="flex flex-col justify-center items-center text-xl">Attended Tournaments</h2>
        <ul className="m-4">
          {attendedBrackets &&
            attendedBrackets.map((bracket) => (
              <li key={bracket._id}>
                <Link href={`/tournaments/${bracket._id}`}>{bracket.name}</Link>
                <p className="text-sm text-gray-400">{bracket.description}</p>
              </li>
            ))}
        </ul>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="flex flex-col justify-center items-center text-xl">Managed Teams</h2>
        <ul className="m-4">
          {ledTeams &&
            ledTeams.map((team) => (
              <li key={team._id}>
                <Link href={`/teams/${team._id}`}>{team.name}</Link>
                {/* <p className="text-sm text-gray-400">{team.description}</p> */}
              </li>
            ))}
        </ul>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="flex flex-col justify-center items-center text-xl">Affiliate Teams</h2>
        <ul className="m-4">
          {affiliatedTeams &&
            affiliatedTeams.map((team) => (
              <li key={team._id}>
                <Link href={`/teams/${team._id}`}>{team.name}</Link>
                {/* <p className="text-sm text-gray-400">{team.description}</p> */}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default PlayerProfile;

// <div>
//     <h1>
//       My Profile
//     </h1>
//     {session.user.profilePicture && (<>
//       <Image src={session.user.profilePicture} priority height="150" width="150" alt="userPfp" />
//       <form action={formAction}>
//         <label>
//           Upload New Profile Picture:
//           <input className="border border-black" type="file" name="file"/>
//         </label>
//           <input hidden name="userId" readOnly value={session.user.id}/>
//           <button>Submit</button>
//       </form>
//       {state && state.message && (
//       <ul>
//         {state.message.map((msg, index) => {
//           return (
//             <li key={index}>
//               {msg}
//             </li>
//           )
//         })}
//       </ul>
//       )}
//       <form action={formActionTwo}>
//         <label>
//           First Name:
//           <br/>
//           <input
//             defaultValue={session.user.firstName}
//             name='firstName'
//           />
//         </label>
//         <br />
//         <label>
//           Last Name:
//           <br/>
//           <input
//             defaultValue={session.user.lastName}
//             name='lastName'
//           />
//         </label>
//         <br />
//         <label>
//           Email:
//           <br/>
//           <input
//             defaultValue={session.user.email}
//             name='email'
//           />
//         </label>
//         <br />
//         <label>
//           Phone Number:
//           <br/>
//           <input
//             defaultValue={session.user.phone}
//             name='phone'
//           />
//         </label>
//         <br/>
//         <input hidden name="userId" readOnly value={session.user.id}/>
//         <button>Submit</button>
//       </form>
//       {stateTwo && stateTwo.message && (
//       <ul>
//         {stateTwo.message.map((msg, index) => {
//           return (
//             <li key={`two${index}`}>
//               {msg}
//             </li>
//           )
//         })}
//       </ul>
//       )}
//     </>)}
//     <p>Email: {session.user.email}</p>
//     <p>Phone: {session.user.phone}</p>
//   </div>
