import React, { useEffect } from "react";
import { useState } from "react";
import { getCommentsByArticleId } from "../api";

import CommentVote from "./CommentVote";
import Loading from "./Loading";
import PostComment from "./PostComment";

export default function CommentsList(props) {
  const { article_id, setOptimisticCommentCount } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [optimisticPostedComment, setOptimisticPostedComment] = useState({});

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

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <PostComment
        article_id={article_id}
        setOptimisticPostedComment={setOptimisticPostedComment}
        setOptimisticCommentCount={setOptimisticCommentCount}
      />
      {!optimisticPostedComment.author ? (
        ""
      ) : (
        <div className=" w-[400px] border-4 border-blue-300 shadow-md p-2 mt-3 mb-3" key={optimisticPostedComment.comment_id}>
          <p>{optimisticPostedComment.author}</p>
          <p>Posted on: {optimisticPostedComment.created_at.slice(0, 10)}</p>
          <p>{optimisticPostedComment.body}</p>
          <CommentVote comment={optimisticPostedComment} />
        </div>
      )}
      <ul className="max-w-[400px] flex-col justify-center items-center ">
        {commentsList.map((comment) => {
          return (
            <li className="shadow-md p-2 mt-3 mb-3" key={comment.comment_id}>
              <p>{comment.author}</p>
              <p>Posted on: {comment.created_at.slice(0, 10)}</p>
              <p>{comment.body}</p>
              <CommentVote comment={comment} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}