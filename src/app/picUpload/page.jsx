'use client'
import {useFormState as useFormState} from 'react-dom'
import {imageToPfp} from './actions.js'
const initialState = null
export default function TestPage() {
    const [state, formAction] = useFormState(imageToPfp,initialState)
    return (
        <>
        <form action={formAction}>
            <input className="border border-black" type="file" name="file"/>
            <button>Submit</button>
        </form>
        </>
    )
}