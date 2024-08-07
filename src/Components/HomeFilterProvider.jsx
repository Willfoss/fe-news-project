import React, { useState, useEffect, useContext } from "react";
import Topics from "./Topics";
import SortBy from "./SortBy";
import Home from "./Home";
import { UserContext } from "../Context/UserContext";

export default function HomeFilterProvider() {
  const { loggedInUser } = useContext(UserContext);
  const [topic, setTopic] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("DESC");

  return (
    <div className="flex flex-col justify-center items-center">
      <Topics setTopic={setTopic} sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder} />
      <SortBy sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder} topic={topic} />

      <Home order={order} sortBy={sortBy} topic={topic} />
    </div>
  );
}
