import React, { useState, useEffect } from "react";
import { getArticles } from "../api";
import Error from "./Error";
import Loading from "./Loading";
import ArticleCard from "./ArticleCard";
import Topics from "./Topics";
import SortBy from "./SortBy";

export default function Home(props) {
  const { order, sortBy, topic, articleList, setArticleList, page, setPage, limit, setLimit } = props;

  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState("");
  const [areMorePages, setAreMorePages] = useState(false);

  function handleLoadMoreArticles() {
    if (!areMorePages) {
      return;
    } else {
      setPage((prevPage) => prevPage + 1);
    }
  }

  useEffect(() => {
    setIsloading(true);
    getArticles(topic, sortBy, order, page, limit)
      .then(({ data }) => {
        setAreMorePages(true);
        if (articleList.length + limit >= data.total_count) {
          setAreMorePages(false);
        }

        setArticleList((previousList) => {
          return [...previousList, ...data.articles];
        });
        setIsloading(false);
      })
      .catch((error) => {
        "hello from catch block";
        setError(error);
        setIsloading(false);
      });
  }, [topic, sortBy, order, page, limit]);

  if (error) {
    return <Error error={error} />;
  }

  if (isLoading && page === 1) {
    return <Loading />;
  }

  return (
    <section id="articles-container" className="w-full bg-gray-100 flex flex-shrink-1 flex-col items-center justify-center mb-10 dark:bg-gray-900">
      <ul id="articleList-container" className="flex flex-col justify-center dark:bg-gray-900">
        {articleList.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </ul>
      {areMorePages ? (
        <button
          className="btn bg-white self-stretch max-w-85 m-4 bg-white dark:bg-gray-800 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-500"
          onClick={handleLoadMoreArticles}
        >
          Load More
        </button>
      ) : (
        <h2 className="dark:text-gray-300">You're up to date!</h2>
      )}
      {isLoading && page !== 1 && <Loading />}
    </section>
  );
}
