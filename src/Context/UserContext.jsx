import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const parsedUser = JSON.parse(storedUser);
  const [loggedInUser, setLoggedInUser] = useState(
    parsedUser
      ? parsedUser
      : {
          username: "tickle122",
          avatar_url: "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
        }
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  return <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>{children}</UserContext.Provider>;
};
