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

  let navigate = useNavigate();

  function handleUsernameChange(event) {
    setUsernameInput(event.target.value);
  }

  function handleNameChange(event) {
    setNameInput(event.target.value);
  }

  function handleUserAvatarChange(event) {
    setUserAvatarInput(event.target.value);
  }

  function handleUserCreation(event) {
    event.preventDefault();
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
    <form id="login-container" className="flex flex-col self-start mt-20 justify-start item start">
      <label className="flex flex-col justify-center m-2">
        Enter a username:
        <input
          type="text"
          placeholder="Type here"
          onChange={handleUsernameChange}
          value={usernameInput}
          className="input input-bordered w-full max-w-xs"
          required
        />
      </label>
      <label className="flex flex-col justify-center m-2">
        Enter your name:
        <input type="text" placeholder="Type here" onChange={handleNameChange} value={nameInput} className="input input-bordered w-full max-w-xs" />
      </label>
      <label className="flex flex-col justify-center m-2">
        Enter an avatar URL:
        <input
          type="url"
          placeholder="Type here"
          onChange={handleUserAvatarChange}
          value={userAvatarInput}
          className="input input-bordered w-full max-w-xs"
          required
        />
      </label>
      <button className="btn bg-white mt-20" onClick={handleUserCreation}>
        Sign up!
      </button>
    </form>
  );
}
