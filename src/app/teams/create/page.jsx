"use client";
import { useFormState as useFormState } from "react-dom";
import { useState, useEffect } from "react";
import { addTeam } from "@/app/actions";
const initialState = {
  message: null,
};

function CreateTeam(props) {
  const [state, formAction] = useFormState(addTeam, initialState);
  const [users, setUsers] = useState(undefined);
  const [sports, setSports] = useState(undefined);
  const [countries, setCountries] = useState(undefined);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const response1 = await fetch("/api/users");
      const users = await response1.json();
      let { userList } = users;
      setUsers(userList);

      const response2 = await fetch("/api/sports");
      const sports = await response2.json();
      setSports(sports.sports);

      const response3 = await fetch("/api/countries");
      const countries = await response3.json();
      setCountries(countries.countryListAlpha3);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const sport = event.target.sport.value;
    const location = event.target.location.value;
    const playerIds = event.target.playerIds.value;

    try {
      // Call your createTeam function here with form data
      const newTeam = await addTeam(name, sport, location, managerId, playerIds);
      // If successful, reset form state and show success message
      formAction(newTeam, { message: ["Team created successfully!"] });
    } catch (error) {
      // If an error occurs, set error message
      formAction(null, { message: [error.message] });
    }
  };

  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-base">
        <form action={formAction} onSubmit={handleSubmit} className="w-1/2 mx-auto my-20">
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

          <div>
            <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
              Name:
              <input name="name" id="name" type="text" placeholder="Team Name" required />
            </label>

            <div>
              <select
                className="select select-bordered flex w-full max-w-xs mx-auto my-2"
                name="sport"
                id="sport"
                required
              >
                <option disabled selected>
                  Select a sport....
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

            <select
              className="select select-bordered flex w-full max-w-xs mx-auto my-2"
              name="location"
              id="location"
              required
            >
              <option disabled selected>
                Select a location....
              </option>
              {countries &&
                Object.keys(countries).map((country) => {
                  console.log(country);
                  return (
                    <option key={countries[country]} value={countries[country]}>
                      {countries[country]}
                    </option>
                  );
                })}
            </select>

            <select
              className="select select-bordered flex w-full max-w-xs mx-auto my-2"
              name="playerIds"
              id="playerIds"
              multiple
              required
            >
              {users &&
                users.map((user) => {
                  return (
                    <option
                      key={user._id.toString()}
                      value={user._id.toString()}
                    >{`${user.firstName} ${user.lastName}`}</option>
                  );
                })}
            </select>
            <div className="form-group">
              <button className="btn btn-active btn-neutral flex mx-auto" type="submit">
                Create Team
              </button>
            </div>
          </div>
        </form>
      </main>
    );
  }
}

export default CreateTeam;
