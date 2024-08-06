import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { getCommentsByArticleId } from "../api";

import CommentVote from "./CommentVote";
import Loading from "./Loading";
import PostComment from "./PostComment";
import { UserContext } from "../Context/UserContext";
import CommentDelete from "./CommentDelete";

export default function CommentsList(props) {
  const { article_id, setOptimisticCommentCount } = props;

  const { loggedInUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [temporaryPostedComment, setTemporaryPostedComment] = useState({});

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
        setTemporaryPostedComment={setTemporaryPostedComment}
        setOptimisticCommentCount={setOptimisticCommentCount}
      />
      {!temporaryPostedComment.author ? (
        ""
      ) : (
        <div className=" group w-[400px] border-4 border-blue-300 shadow-md p-2 mt-3 mb-3" key={temporaryPostedComment.comment_id}>
          <div className="flex justify-between">
            <p>{temporaryPostedComment.author}</p>
            <CommentDelete comment_id={temporaryPostedComment.comment_id} />
          </div>
          <p>Posted on: {temporaryPostedComment.created_at.slice(0, 10)}</p>
          <p>{temporaryPostedComment.body}</p>
          <CommentVote comment={temporaryPostedComment} />
        </div>
      )}
      <ul className="max-w-[400px] w-[400px] flex-col justify-center items-center ">
        {commentsList.map((comment) => {
          return (
            <li className=" group shadow-md p-2 mt-3 mb-3" key={comment.comment_id}>
              <div className="flex justify-between">
                <p>{comment.author}</p>
                {loggedInUser.username === comment.author ? <CommentDelete comment_id={comment.comment_id} /> : <p></p>}
              </div>

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
