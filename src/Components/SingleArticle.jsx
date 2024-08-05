import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";
import { SquareArrowUp, SquareArrowDown, MessageCircle } from "lucide-react";
import Loading from "./Loading";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((article) => {
        setSingleArticle(article);
        setDate(article.created_at.slice(0, 10));
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    <Loading />;
  }

  if (isError) {
    <Error />;
  }

  return (
    <li className="card bg-base-100 w-96 shadow-xl p-4 m-10 w-25">
      <p>by: {singleArticle.author}</p>
      <h2 className="card-title">{singleArticle.title}</h2>
      <figure>
        <img className="rounded-md" src={singleArticle.article_img_url} alt={`image for article ${singleArticle.title}`} />
      </figure>
      <p className="text-small">Posted on {date}</p>
      <p>{singleArticle.body}</p>
      <div className="card-body flex-row justify-startitems-center">
        <SquareArrowUp className="hover:text-green-500"></SquareArrowUp>
        <h3>{singleArticle.votes}</h3>
        <SquareArrowDown className="hover:text-red-500"></SquareArrowDown>
      </div>
    </li>
  );
}
