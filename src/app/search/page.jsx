"use client";
import { useFormState as useFormState } from "react-dom";
import { useState, useEffect } from "react";
import { search } from "@/app/actions";
import Link from "next/link";
const initialState = {
  message: null,
};

function SearchPage(props) {
  const [state, formAction] = useFormState(search, initialState);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-base">
      <form action={formAction} className="w-1/2 mx-auto my-20">
        <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
          Search:
          <input name="search" id="search" type="text" placeholder="Search" required />
        </label>
        <div className="form-group">
          <button className="btn btn-active btn-neutral flex mx-auto" type="submit">
            Search
          </button>
        </div>
        {console.log(state)}
        {state && state.message && (
          <div>
            <h3>Results: </h3>
            <ul>
              {state.message.map((result, index) => {
                if (result.type) {
                  return (
                    <li key={index}>
                      <Link href={`/${result.type}s/${result.data.id}`}>
                        {result.type.charAt(0).toUpperCase() + result.type.slice(1)}:{" "}
                        {result.data.name}
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        )}
      </form>
    </main>
  );
}

export default SearchPage;
