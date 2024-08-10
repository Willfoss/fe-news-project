import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";
import { MessageCircle } from "lucide-react";
import Loading from "./Loading";
import CommentsList from "./CommentsList";
import ArticleVotes from "./ArticleVotes";
import { UserContext } from "../Context/UserContext";
import Error from "./Error";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [singleArticleVote, setSingleArticleVote] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
  const [optimisticCommentCount, setOptimisticCommentCount] = useState(0);
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((article) => {
        setSingleArticle(article);
        setDate(article.created_at.slice(0, 10));
        setSingleArticleVote(article.votes);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="single-article-container flex flex-col justify-center items-center mt-8">
      <li className="card bg-base-100 bg-white self-stretch max-w-[750px] shadow-xl p-4 m-2 dark:bg-gray-800">
        <div className="flex flex-col justify-center items-center ">
          <p
            className={` ${loggedInUser.username === singleArticle.author ? "text-blue-500 dark:text-blue-500" : "text-gray-700 dark:text-gray-300"}`}
          >
            by: {singleArticle.author}
          </p>
          <h2 className="card-title text-gray-700 dark:text-gray-300">{singleArticle.title}</h2>
        </div>

        <figure>
          <img className="rounded-md" src={singleArticle.article_img_url} alt={`image for article ${singleArticle.title}`} />
        </figure>
        <p className="ml-2 text-small text-gray-700 dark:text-gray-300">Posted on {date}</p>
        <p className="ml-2 text-gray-700  dark:text-gray-300">{singleArticle.body}</p>
        <div className="card-body flex-row justify-start items-center">
          <ArticleVotes className="card-body flex-row justify-start items-center" article={singleArticle} />
          <p className="flex justify-end text-gray-700  dark:text-gray-300 ">{singleArticle.comment_count + optimisticCommentCount}</p>
          <MessageCircle className="text-gray-700  dark:text-gray-300" />
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
