import Link from "next/link";
import Logout from "./logout";

function Navigation(props) {
  const loggedIn = true;
  return (
    <div className="navbar bg-primary">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          TourneyPro
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-center menu-horizontal px-1 mx-auto">
          <li>
            <Link href="/tournaments" className="btn btn-ghost">
              Tournaments
            </Link>
          </li>
          <li>
            <Link href="/teams" className="btn btn-ghost">
              Teams
            </Link>
          </li>
          <li>
            <Link href="/users" className="btn btn-ghost">
              Players
            </Link>
          </li>
          {!loggedIn ? (
            <>
              <li>
                <Link href="/login" className="btn btn-ghost">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="btn btn-ghost">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-9 rounded-full">
                  <img
                    alt="Profile Picture"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
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
                  <Link href="/logout">
                    <Logout />
                  </Link>
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
