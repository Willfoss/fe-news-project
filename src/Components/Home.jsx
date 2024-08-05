import React, { useState, useEffect } from "react";
import { getArticles } from "../api";
import Error from "./Error";
import Loading from "./Loading";
import ArticleCard from "./ArticleCard";

export default function Home() {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsloading(true);
    getArticles()
      .then(({ data }) => {
        setArticleList(data.articles);
        setIsloading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsloading(false);
      });
  }, []);

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ul id="articleListContainer" className="flex flex-col justify-center">
      {articleList.map((article) => {
        return <ArticleCard article={article} key={article.article_id} />;
      })}
    </ul>
  );
}
