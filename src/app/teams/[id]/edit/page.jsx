"use client";
import { useFormState as useFormState } from "react-dom";
import { useState, useEffect } from "react";
import { editTeam, toggleActive } from "@/app/actions";
import Select from "react-select";
import { useSession } from "next-auth/react";
import Error from '@/app/components/ErrorMessage'
import { useRouter } from 'next/navigation'
const initialState = {
  message: null,
};

function EditTeamPage({ params }) {
  const { data: session, status, update } = useSession();
  const editTeamById = editTeam.bind(null, params.id);
  const [state, formAction] = useFormState(editTeamById, initialState);
  const toggleActiveById = toggleActive.bind(null, params.id);
  const [toggleState, toggleAction] = useFormState(toggleActiveById)
  const [prevData, setPrevData] = useState(undefined);
  const [roster, setRoster] = useState(undefined);
  const [sports, setSports] = useState(undefined);
  const [countries, setCountries] = useState(undefined);
  const [users, setUsers] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined)
  const router = useRouter()
  useEffect(() => {
    async function fetchData() {
      const response1 = await fetch(`/api/teams/${params.id}`);
      if (!response1.ok) {
        setError(response1)
        setLoading(false)
      } else {
      const {team} = await response1.json();
      setPrevData(team);
      const response2 = await fetch("/api/sports");
      const sports = await response2.json();
      setSports(sports.sports);
      const response3 = await fetch("/api/countries");
      const countries = await response3.json();
      setCountries(countries.countryListAlpha3);
      const response4 = await fetch(`/api/teams/${params.id}/players`);
      const players = await response4.json();
      const rosterOptions = [];
      for (let player of players) {
        rosterOptions.push({
          value: player._id,
          label: `${player.firstName} ${player.lastName}`,
        });
      }
      setRoster(rosterOptions);
      const response5 = await fetch("/api/users");
      const users = await response5.json();
      let { userList } = users;
      const userOptions = [];
      for (let user of userList) {
        userOptions.push({
          value: user._id,
          label: `${user.firstName} ${user.lastName}`,
        });
      }
      setUsers(userOptions);
      setLoading(false);}
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen justify-between p-24 bg-base">
        <p>Loading Team</p>
        <p className="loading loading-dots loading-lg">Loading...</p>
      </div>)
  } else {
    if (error) {
      return <Error error={error} />
    }
    if (prevData.managerId && prevData.managerId !== session.user._id) {
      router.push(`/teams/${prevData._id}`)
    } 
    return (
      <main className="min-h-screen flex-col items-center p-24 bg-base">
        <h1 className="text-2xl font-semibold">Edit Team</h1>
        {session && session.user._id === prevData.managerId && (
          <form action={toggleAction}>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" type="submit">{prevData.active ? "Set Inactive": "Set Active"}</button>
            </div>
          </form>
        )}
        <form action={formAction} className="w-1/2 mx-auto my-20">
          {state && state.message && (
            <div className="alert alert-error w-1/2 mx-auto">
              <ul>
                {state.message.map((msg, index) => {
                  return (
                    <li className="error" key={index}>
                      {msg}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {prevData && (
            <div>
              <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
                Name:
                <input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Team Name"
                  defaultValue={prevData.name}
                  required
                />
              </label>
            </div>
          )}
          {prevData && (
            <div>
              <select
                className="select select-bordered flex w-full max-w-xs mx-auto my-2"
                name="sport"
                id="sport"
                required
              >
                <option key="current" value={prevData.sport} defaultValue>
                  {prevData.sport}
                </option>
                {sports &&
                  sports.map((sport) => {
                    return (
                      <option key={sport} value={sport}>
                        {sport}
                      </option>
                    );
                  })}
              </select>
            </div>
          )}
          {prevData && (
            <div>
              <select
                className="select select-bordered flex w-full max-w-xs mx-auto my-2"
                name="location"
                id="location"
                required
              >
                <option key="current" value={prevData.location} defaultValue>
                  {prevData.location}
                </option>
                {countries &&
                  Object.keys(countries).map((country) => {
                    return (
                      <option key={countries[country] + country} value={countries[country]}>
                        {countries[country]}
                      </option>
                    );
                  })}
              </select>
            </div>
          )}
          {roster && (
            <div className="flex max-w-xs mx-auto my-2">
              <Select
                placeholder="Select players for your new team..."
                isMulti
                options={users}
                defaultValue={roster}
                name="playerIds"
                id="playerIds"
              />
            </div>
          )}
          <div className="form-group">
            <button className="btn btn-active btn-neutral flex mx-auto" type="submit">
              Edit Team
            </button>
          </div>
        </form>
      </main>
    );
  }
}

export default EditTeamPage;
