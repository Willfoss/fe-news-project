import React, { useState, useEffect } from "react";
import { getArticles } from "../api";
import Error from "./Error";
import Loading from "./Loading";
import ArticleCard from "./ArticleCard";
import Topics from "./Topics";
import SortBy from "./SortBy";

export default function Home() {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [topic, setTopic] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("DESC");

  useEffect(() => {
    setIsloading(true);
    getArticles(topic, sortBy, order)
      .then(({ data }) => {
        setArticleList(data.articles);
        setIsloading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsloading(false);
      });
  }, [topic, sortBy, order]);

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section id="articles-container" className="w-full bg-gray-100 flex flex-col items-center justify-center">
      <div>
        <Topics setTopic={setTopic} sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder} />
        <SortBy sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder} topic={topic} />
      </div>
      <ul id="articleList-container" className="flex flex-col justify-center">
        {articleList.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </ul>
    </section>
  );
}
