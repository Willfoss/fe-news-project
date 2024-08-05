import React, { useContext } from "react";
import { Moon, Sun, Newspaper } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import user from "../assets/user.png";
import { ThemeContext } from "../Context/ThemeContext";

export default function Header() {
  let navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleHeaderClick = () => {
    navigate("/");
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
            <Link className="px-3">Articles</Link>
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
          <img className="min-w-[30px] w-[30px]  rounded-full hover:outline hover:outline-orange-400 " src={user}></img>
        </div>
      </div>
    </div>
  );
}
