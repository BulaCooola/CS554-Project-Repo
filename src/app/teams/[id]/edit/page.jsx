"use client";
import { useFormState as useFormState } from "react-dom";
import { useState, useEffect } from "react";
import { editTeam } from "@/app/actions";
import Select from "react-select";
const initialState = {
  message: null,
};

function EditTeamPage({ params }) {
  const editTeamById = editTeam.bind(null, params.id);
  const [state, formAction] = useFormState(editTeamById, initialState);
  const [prevData, setPrevData] = useState(undefined);
  const [roster, setRoster] = useState(undefined);
  const [sports, setSports] = useState(undefined);
  const [countries, setCountries] = useState(undefined);
  const [users, setUsers] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response1 = await fetch(`/api/teams/${params.id}`);
      const team = await response1.json();
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
        console.log(user);
        userOptions.push({
          value: user._id,
          label: `${user.firstName} ${user.lastName}`,
        });
      }
      setUsers(userOptions);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-base">
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
