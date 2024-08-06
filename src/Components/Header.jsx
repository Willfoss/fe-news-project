import React, { useContext } from "react";
import { Moon, Sun, Newspaper } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import user from "../assets/user.png";
import { ThemeContext } from "../Context/ThemeContext";
import { UserContext } from "../Context/UserContext";

export default function Header() {
  let navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const handleHeaderClick = () => {
    navigate("/");
  };

  const handleSignOutClick = () => {
    setLoggedInUser({ username: "" });
  };

  return (
    <div className="navbar border-b-2 w-screen flex items-center justify-center dark:bg-gray-900">
      <div className="w-[1000px] flex items-center justify-between ">
        <div className="flex items-center cursor-pointer" onClick={handleHeaderClick}>
          <Newspaper className="newspaper dark:text-gray-300 min-w-[50px] w-[50px]"></Newspaper>
          <h1 className="min-w-[80px] dark:text-gray-300 px-2">NC news</h1>
        </div>

        <div className=" flex justify-center items-center">
          <ul className=" h-[40px] flex items-center justify-evenly justify-end dark:text-gray-300 ">
            <Link to="/articles" className="px-3">
              Articles
            </Link>
            <Link className="px-3">Post</Link>
          </ul>
          {theme === "light" ? (
            <Sun
              className="hover:text-yellow-700 min-w-[50px] w-[50px] hover: cursor-pointer sun dark:text-gray-300 px-3 mr-2"
              onClick={toggleTheme}
            ></Sun>
          ) : (
            <Moon
              className="dark:text-gray-300 dark:hover:text-yellow-700 min-w-[50px] w-[50px] hover: cursor-pointer moon  px-3 mr-2"
              onClick={toggleTheme}
            ></Moon>
          )}
          {loggedInUser.username === "" ? (
            <div className="dropdown dropdown-end ">
              <img
                tabIndex={0}
                role="button"
                className="min-w-[30px] w-[30px]  rounded-full hover:outline hover:outline-orange-400 "
                src={user}
              ></img>
              <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="dropdown dropdown-end ">
              <img
                tabIndex={0}
                role="button"
                className="  dark:bg-white min-h-[30px] h-[30px] min-w-[30px] w-[30px] object-cover rounded-full hover:outline hover:outline-orange-400 rounded-full "
                src={loggedInUser.avatar_url}
              ></img>

              <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                <li>
                  <p className="pointer-events-none focus:bg-white ml-0 p-0">Logged in as {loggedInUser.username}</p>
                  <Link to="/user">User Profile</Link>
                  <Link onClick={handleSignOutClick} to="/">
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
