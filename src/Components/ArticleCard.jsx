import React from "react";
import { Link } from "react-router-dom";

import { SquareArrowUp, SquareArrowDown, MessageCircle } from "lucide-react";

export default function ArticleCard(props) {
  const { article } = props;

  return (
    <Link to={`/articles/${article.article_id}`} article_id={article.article_id}>
      <li className="card bg-base-100 w-96 shadow-xl p-4 m-10 w-25">
        <p>by: {article.author}</p>
        <h2 className="card-title">{article.title}</h2>
        <figure>
          <img className="rounded-md" src={article.article_img_url} alt={`image for article ${article.title}`} />
        </figure>
        <div className="card-body flex-row justify-startitems-center">
          <SquareArrowUp></SquareArrowUp>
          <h3>{article.votes}</h3>
          <SquareArrowDown></SquareArrowDown>
          <p className="flex justify-end">{article.comment_count}</p>
          <MessageCircle />
        </div>
      </li>
    </Link>
  );
}
