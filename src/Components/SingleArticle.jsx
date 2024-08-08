import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";
import { MessageCircle } from "lucide-react";
import Loading from "./Loading";
import CommentsList from "./CommentsList";
import ArticleVotes from "./ArticleVotes";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [singleArticleVote, setSingleArticleVote] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [date, setDate] = useState("");
  const [optimisticCommentCount, setOptimisticCommentCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((article) => {
        setSingleArticle(article);
        setDate(article.created_at.slice(0, 10));
        setSingleArticleVote(article.votes);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className="single-article-container flex flex-col justify-center items-center">
      <li className="card bg-base-100 w-96 shadow-xl p-4 m-2 dark:bg-gray-800">
        <p className="dark:text-gray-300">by: {singleArticle.author}</p>
        <h2 className="card-title dark:text-gray-300">{singleArticle.title}</h2>
        <figure>
          <img className="rounded-md" src={singleArticle.article_img_url} alt={`image for article ${singleArticle.title}`} />
        </figure>
        <p className="text-small dark:text-gray-300">Posted on {date}</p>
        <p className="dark:text-gray-300">{singleArticle.body}</p>
        <div className="card-body flex-row justify-startitems-center">
          <ArticleVotes className="card-body flex-row justify-start items-center" article={singleArticle} />
          <p className="flex justify-end dark:text-gray-300 ">{singleArticle.comment_count + optimisticCommentCount}</p>
          <MessageCircle className="dark:text-gray-300" />
        </div>
      </li>

      <CommentsList
        article_id={article_id}
        commentCount={singleArticle.comment_count}
        key={article_id}
        setOptimisticCommentCount={setOptimisticCommentCount}
      />
    </div>
  );
}
