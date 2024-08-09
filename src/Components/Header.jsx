import React, { useContext, useEffect, useState } from "react";
import { Moon, Sun, Newspaper, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import user from "../assets/user.png";
import { ThemeContext } from "../Context/ThemeContext";
import { UserContext } from "../Context/UserContext";

export default function Header() {
  let navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [windowPixels, setWindowPixels] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  console.log(windowPixels.width);

  const handleHeaderClick = () => {
    navigate("/");
  };

  const handleSignOutClick = () => {
    setLoggedInUser({ username: "" });
  };

  useEffect(() => {
    function handleResize() {
      setWindowPixels({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="navbar border-b-2 text-gray-700 bg-white border-gray-300 dark:border-gray-300 w-screen flex items-center justify-center dark:bg-gray-900">
      <div className="w-[1000px] flex items-center justify-between ">
        <div className="flex items-center cursor-pointer" onClick={handleHeaderClick}>
          <Newspaper className="newspaper dark:text-gray-300 min-w-[50px] w-[50px]"></Newspaper>
          <h1 className="min-w-[80px] text-gray-700 dark:text-gray-300 px-2">NC news</h1>
        </div>

        <div className=" flex justify-center items-center">
          {windowPixels.width > 660 ? (
            <ul className=" h-[40px] text-gray-700 flex items-center justify-evenly justify-end dark:text-gray-300 ">
              <Link to="/articles" className="px-3">
                Articles
              </Link>
              {loggedInUser.username !== "" && (
                <Link to="postarticle" className="px-3 text-gray-700 dark:text-gray-300">
                  Post an Article
                </Link>
              )}
              {loggedInUser.username !== "" && (
                <Link to="postarticle" className="px-3 text-gray-700 dark:text-gray-300">
                  Post an Article
                </Link>
              )}
            </ul>
          ) : (
            <div className="dropdown dropdown-end bg-white dark:bg-gray-800">
              <Menu tabIndex={0} role="button" className="imp-menu text-gray-700 dark:text-gray-300 dark:bg-gray-900"></Menu>
              <ul tabIndex={0} className="menu dropdown-content bg-white bg-base-100 rounded-box dark:bg-gray-800 z-[1] mt-4 w-52 p-2 shadow">
                <li>
                  <Link className="text-gray-700 dark:text-gray-300 hover-gray-400 dark:hover:bg-gray-400" to="/">
                    Articles
                  </Link>
                  {loggedInUser.username !== "" && (
                    <Link className="text-gray-700 dark:text-gray-300 hover-gray-400 dark:hover:bg-gray-400" to="/postarticle">
                      Post An Article
                    </Link>
                  )}
                  {loggedInUser.username !== "" && (
                    <Link className="text-gray-700 dark:text-gray-300 hover-gray-400 dark:hover:bg-gray-400" to="/postarticle">
                      Add a Topic
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          )}
          {theme === "light" ? (
            <Sun className="hover:text-yellow-400 min-w-[50px] hover: cursor-pointer dark:text-gray-300 px-3 mr-2" onClick={toggleTheme}></Sun>
          ) : (
            <Moon
              className="dark:text-gray-300 dark:hover:text-yellow-400 min-w-[50px] w-[50px] hover: cursor-pointer moon  px-3 mr-2"
              onClick={toggleTheme}
            ></Moon>
          )}
          {loggedInUser.username === "" ? (
            <div className="dropdown dropdown-end bg-white dark:bg-gray-800">
              <img
                tabIndex={0}
                role="button"
                className="min-w-[30px] w-[30px]  rounded-full hover:outline hover:outline-orange-400 "
                src={user}
              ></img>
              <ul tabIndex={0} className="menu dropdown-content bg-white bg-base-100 rounded-box dark:bg-gray-800 z-[1] mt-4 w-52 p-2 shadow">
                <li>
                  <Link className="text-gray-700 dark:text-gray-300 hover-gray-400 dark:hover:bg-gray-400" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="dropdown dropdown-end bg-white dark:bg-gray-800 ">
              <img
                tabIndex={0}
                role="button"
                className="  dark:bg-white min-h-[30px] h-[30px] min-w-[30px] w-[30px] object-cover rounded-full hover:outline hover:outline-orange-400 rounded-full "
                src={!loggedInUser.avatar_url ? user : loggedInUser.avatar_url}
              ></img>

              <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box bg-white dark:bg-gray-800 z-[1] mt-4 w-52 p-2 shadow ">
                <li>
                  <p className="pointer-events-none text-gray-700 focus:bg-white ml-0 p-0 dark:text-gray-300">Logged in as {loggedInUser.username}</p>
                  <Link className="text-gray-700 dark:text-gray-300 dark:hover:bg-gray-400" to="/user">
                    User Profile
                  </Link>
                  <Link className="text-gray-700 dark:text-gray-300 dark:hover:bg-gray-400" onClick={handleSignOutClick}>
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
