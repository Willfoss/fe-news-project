import React, { useEffect } from "react";
import { useState } from "react";
import { getCommentsByArticleId } from "../api";
import { SquareArrowUp, SquareArrowDown } from "lucide-react";

export default function CommentsList(props) {
  const { article_id } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getCommentsByArticleId(article_id)
      .then(({ comments }) => {
        setCommentsList(comments);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id]);

  return (
    <ul className="max-w-[400px] flex-col justify-center items-center ">
      {commentsList.map((comment) => {
        return (
          <li className="shadow-md p-2 mt-3 mb-3" key={comment.comment_id}>
            <p>{comment.author}</p>
            <p>Posted on: {comment.created_at.slice(0, 10)}</p>
            <p>{comment.body}</p>
            <div className="card-body flex-row justify-startitems-center">
              <SquareArrowUp className="hover:text-green-500"></SquareArrowUp>
              <h3>{comment.votes}</h3>
              <SquareArrowDown className="hover:text-red-500"></SquareArrowDown>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
