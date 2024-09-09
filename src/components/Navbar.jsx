import axios from "axios";
import { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../UserContext";

const Navbar = () => {
  const { user, login, logout } = useContext(UserContext);
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      axios
        .get("https://nice-brainy-ptarmigan.glitch.me/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          login(res.data.user);
        });
    } catch (err) {
      // Handle token expiration or invalid token
      if (err.response && err.response.status === 401) {
        logout();
      }
    }
  }, []);

  const Logout = () => {
    localStorage.removeItem("token");
    logout(null);
  };
  return (
    <div className="navbar bg-gray-100 px-20">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Shady&apos;s Blog
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-2">
          {!user && (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <NavLink to="/create">Create New Post</NavLink>
              </li>
              <li>
                <a onClick={Logout}>Logout</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
