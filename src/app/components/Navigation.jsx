"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

function Navigation(props) {
  let loggedIn = true;
  const { data: session } = useSession();
  if (!session) {
    loggedIn = false;
  }
  return (
    <div className="navbar bg-primary">
      <div className="navbar-start flex-1">
        <Link href="/" className="btn btn-ghost text-xl text-white">
          TourneyPro
        </Link>
      </div>
      <div className="navbar-center">
        <button
          onClick={async () => {
            const response = await fetch("/api/flushcache", {
              method: "GET",
            });
            console.log(response);
          }}
          className="btn btn-ghost text-xs"
        >
          Flush Cache
          (If switching from different databases)
        </button>
      </div>
      <div className="flex-none">
        <ul className="menu menu-center menu-horizontal px-1 mx-auto">
          <li>
            <Link href="/" className="btn btn-ghost text-white">
              Home
            </Link>
          </li>
          <li>
            <Link href="/tournaments" className="btn btn-ghost text-white">
              Tournaments
            </Link>
          </li>
          <li>
            <Link href="/teams" className="btn btn-ghost text-white">
              Teams
            </Link>
          </li>
          <li>
            <Link href="/users" className="btn btn-ghost text-white">
              Players
            </Link>
          </li>
          <li>
            <Link href="/search" className="btn btn-ghost text-white">
              Search
            </Link>
          </li>
          {!loggedIn ? (
            <>
              <li>
                <Link href="/login" className="btn btn-ghost text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="btn btn-ghost text-white">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-9 rounded-full text-white">
                  <img alt="Profile Picture" src={session.user.profilePicture} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      signOut({ redirect: false });
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
