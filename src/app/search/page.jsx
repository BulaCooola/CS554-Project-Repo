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
    <main className="min-h-screen items-center justify-between p-24 bg-base">
      <h1 className="text-2xl font-semibold">Search Teams and Tournaments</h1>
      <form action={formAction} className="w-1/2 mx-auto my-20 flex">
        <div className="join mx-auto">
        <label className="join-item input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto my-2">
          Search:
          <input name="search" id="search" type="text" placeholder="Search" />
        </label>
        <button className="join-item btn btn-active btn-neutral flex mx-auto my-2" type="submit">
          Search
          </button>
          </div>
      </form>
      {state && state.message && (
          <div className="">
            <h1 className="text-2xl font-semibold">Results: </h1>
              {state.message.map((result, index) => {
                if (result.type) {
                  return (
                    <div key={index} className="card bg-base-100 shadow-lg m-4 p-4 max-w-96 mx-auto">
                      <div className="flex text-lg font-semibold">
                        <p>{`${result.type.charAt(0).toUpperCase() + result.type.slice(1)}:`}&nbsp;</p>
                        <Link className="text-lg font-semibold link link-primary" href={`/${result.type}s/${result.data.id}`}>
                        {`${result.data.name}`}
                        </Link>
                        
                      </div >
                      <p>
                          {result.type === "team" ? result.data.sport : result.data.description}
                        </p>
                    </div >
                  );
                }
              })}
          </div>
        )}
    </main>
  );
}

export default SearchPage;
