import React, { useState, useEffect, useContext } from "react";
import { getUserByUsername, getUsers } from "../api";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import Loading from "./Loading";

export default function Login() {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const { setLoggedInUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleUserSelect(event) {
    setSelectedUser(event.target.value);
  }

  function handleLoginClick() {
    setIsLoading(true);
    getUserByUsername(selectedUser)
      .then(({ user }) => {
        setLoggedInUser({ username: user.username, avatar_url: user.avatar_url });
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError(true);
      });
  }

  //no load effects on this as this is purely for a demonstration perspecive. in an actual app you would not load users list this
  useEffect(() => {
    getUsers().then(({ users }) => {
      setUserList(users);
    });
  }, []);

  if (isLoading) return <Loading />;

  if (error) {
    return <Error error={error} />;
  }

  return (
    <section id="login-container" className="self-center flex justify-center items-center w-screen">
      <div className="flex flex-col border-2 w-full max-w-[500px] rounded p-5 mt-10 mb-10 dark:border-gray-500 ml-5 mr-5">
        <label className="flex flex-col text-gray-700 justify-center dark:text-gray-300" htmlFor="username-input">
          Select a Username:
          <select
            value={selectedUser}
            className="select select-bordered max-w-xl bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            onChange={handleUserSelect}
            aria-label="username drop down menu"
          >
            {userList.map((user) => {
              return (
                <option className="" key={user.username} value={user.username}>
                  {user.username}
                </option>
              );
            })}
          </select>
        </label>
        <Link
          to="/"
          onClick={handleLoginClick}
          className="btn bg-white text-gray-700 mt-5 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-500"
        >
          Login
        </Link>
        <Link to="/signup" className="btn bg-white mt-20 text-gray-700 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-500">
          Not a user? Sign up!
        </Link>
      </div>
    </section>
  );
}
