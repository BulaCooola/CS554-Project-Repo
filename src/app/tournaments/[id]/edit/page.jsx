"use client";
import { useFormState as useFormState } from "react-dom";
import { useState, useEffect } from "react";
import { editTournament, deleteTournament } from "@/app/actions";
import Select from "react-select";
import { useSession } from "next-auth/react";
import Error from '@/app/components/ErrorMessage'
const initialState = {
  message: null,
};
function EditTournamentPage({ params }) {
  const { data: session, status, update } = useSession();
  const editTournamentById = editTournament.bind(null, params.id);
  const [state, formAction] = useFormState(editTournamentById, initialState);
  const deleteTournamentById = deleteTournament.bind(null, params.id);
  const [deleteState, deleteAction] = useFormState(deleteTournamentById)
  const [prevData, setPrevData] = useState(undefined);
  const [sports, setSports] = useState(undefined);
  const [selectedSport, setSelected] = useState();
  const [teams, setTeams] = useState(undefined);
  const [prevTeams, setPrevTeams] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined)

  useEffect(() => {
    async function fetchData() {
      const response1 = await fetch(`/api/tournaments/${params.id}`);
      if (!response1.ok) {
        setError(response1)
        setLoading(false)
      } else {
      const tournament = await response1.json();
      setPrevData(tournament);
      setSelected(tournament.sport)
      const response2 = await fetch("/api/sports");
      const sports = await response2.json();
      setSports(sports.sports);
      const response4 = await fetch(`/api/tournaments/${params.id}/teams`);
      const teamsList = await response4.json();
      const prevTeamList = [];
      for (let team of teamsList) {
        prevTeamList.push({
          value: team._id,
          label: team.name,
        });
      }
      setPrevTeams(prevTeamList);
      setLoading(false);}
    }
    fetchData();
  }, []);

  async function handleOnChange(e) {
    setSelected(e.target.value);
  }

  useEffect(() => {
    async function fetchData() {
      if (!selectedSport) {
        setTeams([]);
      } else {
        const response = await fetch(`/api/teams/sport/${selectedSport}`);
        const teamsData = await response.json();
        const teamOptions = [];
        for (let team of teamsData) {
          if (team.active){
          teamOptions.push({
            value: team._id,
            label: team.name,
          });}
        }
        setTeams(teamOptions);
      }
    }
    fetchData();
  }, [selectedSport]);

  if (loading) {
    return (
      <div className="min-h-screen justify-between p-24 bg-base">
        <p>Loading Tournament</p>
        <p className="loading loading-dots loading-lg">Loading...</p>
      </div>
    );
  } else {
    if (error) {
      return <Error error={error} />
    }
    return (
      <main className="min-h-screen flex-col items-center p-24 bg-base">
        <h1 className="text-2xl font-semibold">Edit Tournament</h1>
        {session && session.user._id === prevData.organizerId && (
          <form action={deleteAction}>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" type="submit"> Delete Tournament</button>
            </div>
          </form>
        )}
        <form action={formAction} className="w-1/2 mx-auto my-20">
          <div
            role="alert"
            className="alert alert-warning flex items-center gap-2 w-full max-w-xs mx-auto my-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Warning: Editing tournament will reset all current match data!</span>
          </div>
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
                  placeholder="Tournament Name"
                  defaultValue={prevData.name}
                  required
                />
              </label>
            </div>
          )}
          {prevData && (
            <div>
              <label className="textarea textarea-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
                Description:
                <textarea
                  className="resize-none"
                  name="description"
                  id="description"
                  defaultValue={prevData.description}
                  placeholder="Tell us about your tournament!"
                />
              </label>
            </div>
          )}
          {prevData && (
            <div>
              <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
                Start Date:
                <input
                  name="startDate"
                  id="startDate"
                  type="date"
                  defaultValue={new Date(prevData.startDate).toISOString().substring(0, 10)}
                  required
                />
              </label>
            </div>
          )}
          <div>
            <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
              End Date:
              <input
                name="endDate"
                id="endDate"
                type="date"
                defaultValue={new Date(prevData.endDate).toISOString().substring(0, 10)}
                required
              />
            </label>
          </div>
          {prevData && (
            <div>
              <select
                className="select select-bordered flex w-full max-w-xs mx-auto my-2"
                name="sport"
                id="sport"
                onChange={handleOnChange}
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
          )}
          <div className="flex max-w-xs mx-auto my-2">
            {teams && (
              <Select
                placeholder="Select teams for your new tournament..."
                isMulti
                options={teams}
                defaultValue={prevTeams}
                name="teams"
                id="teams"
                className="text-black"
              />
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-active btn-neutral flex mx-auto" type="submit">
              Edit Tournament
            </button>
          </div>
        </form>
      </main>
    );
  }
}

export default EditTournamentPage;
