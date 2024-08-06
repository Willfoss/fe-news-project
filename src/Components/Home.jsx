import React, { useState, useEffect } from "react";
import { getArticles } from "../api";
import Error from "./Error";
import Loading from "./Loading";
import ArticleCard from "./ArticleCard";
import Topics from "./Topics";

export default function Home() {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [topic, setTopic] = useState("");

  useEffect(() => {
    setIsloading(true);
    getArticles(topic)
      .then(({ data }) => {
        setArticleList(data.articles);
        setIsloading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsloading(false);
      });
  }, [topic]);

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="articles-container" className="w-full flex flex-col items-center justify-center">
      <Topics setTopic={setTopic} />
      <ul id="articleList-container" className="flex flex-col justify-center">
        {articleList.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </ul>
    </div>
  );
}
