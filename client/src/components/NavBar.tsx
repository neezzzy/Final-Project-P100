import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <div>
      <nav>
        <ul>
          <li>
            <strong>Campus Connect</strong>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/profiler">Profiler</Link>
              </li>
              <li>
                <Link to="/authorize">Authorize</Link>
              </li>
              <li>
                <Link to="#" onClick={() => logoutWithRedirect()}>
                  Log out
                </Link>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <li>
              <button
                id="qsLoginBtn"
                color="primary"
                onClick={() => loginWithRedirect()}
              >
                Log in
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
