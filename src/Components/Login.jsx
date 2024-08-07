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
  const [isError, setIsError] = useState(false);

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
        setIsError(true);
      });
  }

  //no load effects on this as this is purely for a demonstration perspecive. in an actual app you would not load users list this
  useEffect(() => {
    getUsers().then(({ users }) => {
      setUserList(users);
    });
  }, []);

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  return (
    <section id="login-container" className="flex flex-col self-start mt-20 justify-start item start">
      <label className="flex flex-col justify-center" htmlFor="username-input">
        Select a Username:
        <select value={selectedUser} className="select select-bordered w-60 max-w-xs" onChange={handleUserSelect}>
          {userList.map((user) => {
            return (
              <option key={user.username} value={user.username}>
                {user.username}
              </option>
            );
          })}
        </select>
      </label>
      <Link to="/" onClick={handleLoginClick} className="btn bg-white mt-5">
        Login
      </Link>
      <Link to="/signup" className="btn bg-white mt-20">
        Not a user? Sign up!
      </Link>
    </section>
  );
}
