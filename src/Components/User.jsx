import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import ArticleCard from "./ArticleCard";
import { getUserArticles } from "../api";
import Loading from "./Loading";
import Error from "./Error";

export default function User() {
  const { loggedInUser } = useContext(UserContext);

  const [userArticleList, setUserArticleList] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);

  useState(() => {
    setIsloading(true);
    getUserArticles(loggedInUser.username)
      .then(({ data }) => {
        setUserArticleList(data.articles);
        setIsloading(false);
      })
      .catch(() => {
        setIsloading(false);
        setIsError(true);
      });
  }, []);

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  return (
    <section className=" flex flex-col justify-start items-center">
      <h2 className="mt-10 text-gray-700 dark:text-gray-300">My Profile</h2>
      <div id="user-profile-container" className="flex flex-col justify-center w-80 items-center card  p-4 m-2">
        <img
          className="rounded-xl h-60 object:fi border-2 border-black "
          src={loggedInUser.avatar_url}
          alt="large version of user profile picture"
        ></img>
        <div id="username-container" className="flex">
          <p className="mr-4 text-gray-700 dark:text-gray-300">Username:</p>
          <p className="text-gray-700 dark:text-gray-300">{loggedInUser.username}</p>
        </div>
      </div>
      <h2 className="mt-10 text-gray-700 dark:text-gray-300">My Articles</h2>
      <ul></ul>
      <ul id="articleList-container" className="flex flex-col justify-center">
        {userArticleList.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </ul>
    </section>
  );
}
