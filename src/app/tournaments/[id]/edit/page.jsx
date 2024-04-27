'use client'
import {useFormState as useFormState} from 'react-dom';
import {useState, useEffect} from 'react';
import {editTournament} from '@/app/actions';
const initialState = {
  message: null
};
function editTournamentPage({params}) {
  const editTournamentById = editTournament.bind(null, params.id);
  const [state, formAction] = useFormState(editTournamentById, initialState);
  const [prevData, setPrevData] = useState(undefined)
  const [sports, setSports] = useState(undefined);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const response1 = await fetch(`/api/tournaments/${params.id}`)
      const tournament = await response1.json()
      setPrevData(tournament)
      const response2 = await fetch('/api/sports')
      const sports = await response2.json();
      setSports(sports.sports)
      setLoading(false)
    }
    fetchData()
  }, []);
  if (loading) {
    return <div>Loading</div>
  } else {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-base">
        <form action={formAction} className="w-1/2 mx-auto my-20">
          {state && state.message && (
            <div className='alert alert-error w-1/2 mx-auto'>
              <ul>
                {state.message.map((msg, index) => {
                  return (
                    <li className='error' key={index}>
                      {msg}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          {prevData&&<div>
            <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
              Name:
              <input name='name' id='name' type='text' placeholder="Tournament Name" defaultValue={prevData.name} required/>
            </label>
          </div>}
          {prevData&&<div>
            <label className="textarea textarea-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
              Description:
              <textarea className="resize-none" name="description" id="description"  defaultValue={prevData.description} placeholder="Tell us about your tournament!" />
           </label>
          </div>}
          {prevData&&<div>
            <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
              Start Date:
              <input name='startDate' id='startDate' type='date' defaultValue={new Date(prevData.startDate).toISOString().substring(0, 10)} required />
            </label>
          </div>}
          <div>
            <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
              End Date:
              <input name='endDate' id='endDate' type='date' defaultValue={new Date(prevData.endDate).toISOString().substring(0, 10)} required />
            </label>
          </div>
          {prevData&&<div>
            <select className="select select-bordered flex w-full max-w-xs mx-auto my-2" name='sport' id='sport' required>
              <option key="current" value={prevData.sport} defaultValue>{prevData.sport}</option>
              {sports && sports.map((sport) => {
                return (
                  <option key={sport} value={sport}>{sport}</option>
                )
              })}
            </select>
          </div>}
          <div className='form-group'>
            <button className="btn btn-active btn-neutral flex mx-auto" type='submit'>
              Edit Tournament
            </button>
          </div>
        </form>
      </main>
    )
  }
}

export default editTournamentPage;