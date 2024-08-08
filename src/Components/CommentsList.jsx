import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { getCommentsByArticleId } from "../api";

import CommentVote from "./CommentVote";
import Loading from "./Loading";
import PostComment from "./PostComment";
import { UserContext } from "../Context/UserContext";
import CommentDelete from "./CommentDelete";

export default function CommentsList(props) {
  const { article_id, commentCount, setOptimisticCommentCount } = props;
  const { loggedInUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [temporaryPostedComment, setTemporaryPostedComment] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [areMorePages, setAreMorePages] = useState(false);

  function handleLoadMoreComments() {
    setPage((prevPage) => prevPage + 1);
  }

  useEffect(() => {
    setIsLoading(true);
    getCommentsByArticleId(article_id, page)
      .then(({ comments }) => {
        setAreMorePages(true);
        if (commentsList.length + limit >= commentCount) {
          setAreMorePages(false);
        }
        setCommentsList((previousList) => {
          return [...previousList, ...comments];
        });
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id, page]);

  if (isLoading && page === 1) {
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
            <p className="dark:text-gray-300">{temporaryPostedComment.author}</p>
            <CommentDelete comment_id={temporaryPostedComment.comment_id} />
          </div>
          <p className="dark:text-gray-300">Posted on: {temporaryPostedComment.created_at.slice(0, 10)}</p>
          <p className="dark:text-gray-300">{temporaryPostedComment.body}</p>
          <CommentVote comment={temporaryPostedComment} />
        </div>
      )}
      <ul className="max-w-[400px] w-[400px] flex-col justify-center items-center ">
        {commentsList.map((comment) => {
          return (
            <li className=" group shadow-md p-2 mt-3 mb-3 dark:border-2 dark:border-gray-500 rounded" key={comment.comment_id}>
              <div className="flex justify-between">
                <p className="dark:text-gray-300">{comment.author}</p>
                {loggedInUser.username === comment.author ? <CommentDelete comment_id={comment.comment_id} /> : <p></p>}
              </div>

              <p className="dark:text-gray-300">Posted on: {comment.created_at.slice(0, 10)}</p>
              <p className="dark:text-gray-300">{comment.body}</p>
              <CommentVote comment={comment} />
            </li>
          );
        })}
      </ul>
      {areMorePages ? (
        <button
          className="btn self-stretch max-w-50 m-2 mb-5 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-500"
          onClick={handleLoadMoreComments}
        >
          Load More
        </button>
      ) : (
        <h2 className="dark:text-gray-300 mb-5">You're up to date!</h2>
      )}
      {isLoading && page !== 1 && <Loading />}
    </div>
  );
}
