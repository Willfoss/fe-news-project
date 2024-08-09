import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ArticleVotes from "./ArticleVotes";

import { SquareArrowUp, SquareArrowDown, MessageCircle } from "lucide-react";
import { UserContext } from "../Context/UserContext";

export default function ArticleCard(props) {
  const { article } = props;
  const { loggedInUser } = useContext(UserContext);

  return (
    <li className="card bg-white self-stretch bg-base-100 shadow-xl max-w-[750px] p-4 m-4 dark:bg-gray-800">
      <Link to={`/articles/${article.article_id}`} article_id={article.article_id}>
        <p className={` ${loggedInUser.username === article.author ? "text-blue-500 dark:text-blue-500" : "text-gray-700 dark:text-gray-300"}`}>
          by: {article.author}
        </p>
        <h2 className="card-title text-gray-700 dark:text-gray-300">{article.title}</h2>
        <figure>
          <img className="rounded-md " src={article.article_img_url} alt={`image for article ${article.title}`} />
        </figure>
      </Link>
      <div className="card-body flex-row justify-startitems-center">
        <ArticleVotes className="card-body flex-row justify-start items-center" article={article} />
        <p className="flex justify-end text-gray-700 dark:text-gray-300">{article.comment_count}</p>
        <Link to={`/articles/${article.article_id}`}>
          <MessageCircle className="text-gray-700 dark:text-gray-300" />
        </Link>
      </div>
    </li>
  );
}
