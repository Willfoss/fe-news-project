import React, { useState, useEffect, useContext } from "react";
import { getUserByUsername, getUsers } from "../api";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import Loading from "./Loading";
import { postUser } from "../api";

export default function Signup() {
  const [usernameInput, setUsernameInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [userAvatarInput, setUserAvatarInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [customError, setcustomError] = useState(false);

  let navigate = useNavigate();

  function handleUsernameChange(event) {
    if (userAvatarInput) {
      setcustomError(false);
    }
    setUsernameInput(event.target.value);
  }

  function handleNameChange(event) {
    setNameInput(event.target.value);
  }

  function handleUserAvatarChange(event) {
    if (usernameInput) {
      setcustomError(false);
    }
    setUserAvatarInput(event.target.value);
  }

  function handleUserCreation(event) {
    event.preventDefault();
    if (!usernameInput || !userAvatarInput) {
      setcustomError(true);
      return;
    }
    setIsLoading(true);
    postUser(usernameInput, nameInput, userAvatarInput)
      .then((user) => {
        setIsLoading(false);
        navigate("/login");
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  return (
    <div className="flex justify-center items-center w-screen">
      <form
        onSubmit={handleUserCreation}
        id="login-container"
        className="flex flex-col border-2 w-full max-w-[500px] rounded p-5 mt-10 mb-10 dark:border-gray-500 ml-5 mr-5"
      >
        <label className="flex flex-col text-gray-700 justify-center mt-2 mb-2 ml-0 mr-0 dark:text-gray-300">
          Enter a username:
          <input
            type="text"
            placeholder="Type here"
            onChange={handleUsernameChange}
            value={usernameInput}
            className="input input-bordered bg-white text-gray-700 max-w-xl dark:text-gray-300 dark:bg-gray-800"
            minLength={5}
            required
          />
        </label>
        <label className="flex flex-col text-gray-700 justify-center mt-2 mb-2 ml-0 mr-0 dark:text-gray-300">
          Enter your name:
          <input
            type="text"
            placeholder="Type here"
            onChange={handleNameChange}
            value={nameInput}
            className="input input-bordered w-full bg-white text-gray-700 max-w-xl dark:text-gray-300 dark:bg-gray-800"
          />
        </label>
        <label className="flex flex-col text-gray-700 justify-center mt-2 mb-2 ml-0 mr-0 dark:text-gray-300">
          Enter an avatar URL:
          <input
            type="url"
            placeholder="Type here"
            onChange={handleUserAvatarChange}
            value={userAvatarInput}
            className="input input-bordered text-gray-700 bg-white w-full max-w-xl dark:text-gray-300 dark:bg-gray-800"
            minLength={5}
            required
          />
        </label>
        {customError ? <p className="text-red-500 ">*Username and avatar URL are required</p> : <p></p>}
        <button className="btn bg-white mt-20 text-gray-700 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-500">Sign up!</button>

        <Link to="/login" className="btn bg-white text-gray-700 mt-2 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-500">
          Back to login
        </Link>
      </form>
    </div>
  );
}
