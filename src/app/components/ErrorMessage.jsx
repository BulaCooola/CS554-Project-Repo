"use client";

import { useEffect } from "react";

export default function ErrorMessage({error}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log("From error page", error);
  }, [error]);

  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center ">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Error</h1>
          <p className="mb-5">{error.status}: {error.statusText}</p>
        </div>
      </div>
    </div>
  );
}
