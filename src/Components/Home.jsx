import React, { useState, useEffect } from "react";
import { getArticles } from "../api";
import Error from "./Error";
import Loading from "./Loading";
import ArticleCard from "./ArticleCard";
import Topics from "./Topics";
import SortBy from "./SortBy";

export default function Home(props) {
  const { order, sortBy, topic } = props;
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);

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
    <section id="articles-container" className="w-full bg-gray-100 flex flex-col items-center justify-center mb-10 dark:bg-gray-900">
      <ul id="articleList-container" className="flex flex-col justify-center dark:bg-gray-900">
        {articleList.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </ul>
    </section>
  );
}
