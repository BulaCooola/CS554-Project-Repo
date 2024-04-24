'use client';
import {imageToPfp} from "../../../public/ImageMagickTesting/app.cjs"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Form() {
    const [img, setImg] = useState("")
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        let newPath = imageToPfp(e.target.file.value)
        setImg(newPath)
      };
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
            <input className="border border-black" type="file" name="file"/>
                <button type="submit">Submit</button>
            </form>
            {img != "" &&
            <img src={img}/>}
        </>
    );
}