"use client";
import { useFormState as useFormState } from "react-dom";
import { useState, useEffect } from "react";
import { addTournament } from "@/app/actions";
import Select from "react-select";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
const initialState = {
  message: null,
};

function CreateTournament(props) {
  const { data: session, status, update } = useSession();

  const [state, formAction] = useFormState(addTournament, initialState);
  const [teams, setTeams] = useState(undefined);
  const [sports, setSports] = useState(undefined);
  const [selectedSport, setSelected] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/sports");
      const sports = await response.json();
      setSports(sports.sports);
      setLoading(false);
    }
    fetchData();
  }, []);
  if (status === "unauthenticated") {
    redirect("/login");
  }

  async function handleOnChange(e) {
    setSelected(e.target.value);
  }

  useEffect(() => {
    async function fetchData() {
      if (!selectedSport) {
        setTeams([]);
        setLoading(false);
      } else {
        console.log("State", selectedSport);
        const response = await fetch(`/api/teams/sport/${selectedSport}`);
        console.log(response);
        const teamsData = await response.json();
        console.log(teamsData);
        const teamOptions = [];
        for (let team of teamsData) {
          teamOptions.push({
            value: team._id,
            label: team.name,
          });
        }
        setTeams(teamOptions);
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedSport]);

  if (loading) {
    return (
      <div>
        Loading
        <p className="loading loading-dots loading-lg">Loading...</p>
      </div>
    );
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
          <div>
            <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
              Name:
              <input name="name" id="name" type="text" placeholder="Tournament Name" required />
            </label>
          </div>
          <div>
            <label className="textarea textarea-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
              Description:
              <textarea
                className="resize-none"
                name="description"
                id="description"
                placeholder="Tell us about your tournament!"
              />
            </label>
          </div>
          <div>
            <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
              Start Date:
              <input name="startDate" id="startDate" type="date" required />
            </label>
          </div>
          <div>
            <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
              End Date:
              <input name="endDate" id="endDate" type="date" required />
            </label>
          </div>
          <div>
            <select
              className="select select-bordered flex w-full max-w-xs mx-auto my-2"
              name="sport"
              id="sport"
              required
              onChange={handleOnChange}
            >
              <option defaultValue value="">
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
          <div>
            <select
              className="select select-bordered flex w-full max-w-xs mx-auto my-2"
              name="bracketSize"
              id="bracketSize"
              required
            >
              <option defaultValue value="">
                Number of teams....
              </option>
              <option key="4" value="4">
                4
              </option>
              <option key="8" value="8">
                8
              </option>
              <option key="16" value="16">
                16
              </option>
              <option key="32" value="32">
                32
              </option>
            </select>
          </div>
          <div className="flex max-w-xs mx-auto my-2">
            {teams && (
              <Select
                placeholder="Select teams for your new tournament..."
                isMulti
                options={teams}
                name="teams"
                id="teams"
                className="text-black"
              />
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-active btn-neutral flex mx-auto" type="submit">
              Create Tournament
            </button>
          </div>
        </form>
      </main>
    );
  }
}

export default CreateTournament;
