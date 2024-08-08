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
  const [articleList, setArticleList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  return (
    <div className="flex flex-col justify-center items-center">
      <Topics
        topic={topic}
        setTopic={setTopic}
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setOrder={setOrder}
        setArticleList={setArticleList}
        setPage={setPage}
        setLimit={setLimit}
      />
      <SortBy
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setOrder={setOrder}
        topic={topic}
        setLimit={setLimit}
        articleList={articleList}
        setArticleList={setArticleList}
        setPage={setPage}
      />

      <Home
        order={order}
        sortBy={sortBy}
        topic={topic}
        articleList={articleList}
        setArticleList={setArticleList}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
      />
    </div>
  );
}
