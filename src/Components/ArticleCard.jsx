import React from "react";
import { Link } from "react-router-dom";
import ArticleVotes from "./ArticleVotes";

import { SquareArrowUp, SquareArrowDown, MessageCircle } from "lucide-react";

export default function ArticleCard(props) {
  const { article } = props;

  return (
    <li className="card bg-base-100 w-96 shadow-xl p-4 m-10 w-25">
      <Link to={`/articles/${article.article_id}`} article_id={article.article_id}>
        <p>by: {article.author}</p>
        <h2 className="card-title">{article.title}</h2>
        <figure>
          <img className="rounded-md" src={article.article_img_url} alt={`image for article ${article.title}`} />
        </figure>
      </Link>
      <div className="card-body flex-row justify-startitems-center">
        <ArticleVotes className="card-body flex-row justify-start items-center" article={article} />
        <p className="flex justify-end">{article.comment_count}</p>
        <MessageCircle />
      </div>
    </li>
  );
}
