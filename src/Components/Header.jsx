import React, { useContext } from "react";
import { Moon, Sun, Newspaper } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import user from "../assets/user.png";

export default function Header() {
  let navigate = useNavigate();

  const handleHeaderClick = () => {
    navigate("/");
  };

  return (
    <div className="navbar border-b-2 w-screen flex items-center justify-center">
      <div className="w-[1000px] flex items-center justify-between ">
        <div className="flex items-center cursor-pointer" onClick={handleHeaderClick}>
          <Newspaper className="newspaper  min-w-[50px] w-[50px]"></Newspaper>
          <h1 className="min-w-[80px] px-2">NC news</h1>
        </div>

        <div className=" flex justify-center items-center">
          <ul className=" h-[40px] flex items-center justify-evenly justify-end  ">
            <Link to="/" className="">
              Home
            </Link>
          </ul>
          <Sun className="hover:text-yellow-600  min-w-[50px] w-[50px] hover: cursor-pointer sun px-3 mr-2"></Sun>
          <img className="min-w-[30px] w-[30px]  rounded-full hover:outline hover:outline-orange-400 " src={user}></img>
        </div>
      </div>
    </div>
  );
}
