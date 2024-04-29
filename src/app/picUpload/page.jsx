'use client'
import Image from 'next/image'
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
        <Image src='https://i.imgur.com/tgeISUG.jpeg' priority height='256' width='256' alt='trophy'/>
        </>
    )
}