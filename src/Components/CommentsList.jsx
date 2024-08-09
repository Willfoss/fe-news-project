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
  const [error, setError] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [temporaryPostedCommentList, setTemporaryPostedCommentList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [areMorePages, setAreMorePages] = useState(false);
  const [isDeleteCustomError, setIsDeleteCustomError] = useState(false);
  const [deletedCommentId, setDeletedCommentId] = useState(0);

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
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [article_id, page]);

  if (isLoading && page === 1) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="flex self-stretch flex-col justify-center items-center w-100 m-5">
      <PostComment
        article_id={article_id}
        setTemporaryPostedCommentList={setTemporaryPostedCommentList}
        setOptimisticCommentCount={setOptimisticCommentCount}
      />
      {setTemporaryPostedCommentList.length === 0 ? (
        ""
      ) : (
        <ul className="self-stretch max-w-[750px] flex-col justify-center items-center ">
          {temporaryPostedCommentList.map((temporaryPostedComment) => {
            return (
              <li
                className={`group shadow-md p-2 mt-3 mb-3 bg-white border-2 dark:bg-gray-800  rounded ${
                  isDeleteCustomError && temporaryPostedComment.comment_id === deletedCommentId
                    ? "border-red-500 dark:border-red-500"
                    : "border-blue-500 dark:border-blue-500"
                }`}
                key={temporaryPostedComment.comment_id}
              >
                <div className="flex justify-between">
                  <p
                    className={` ${
                      loggedInUser.username === temporaryPostedComment.author
                        ? "text-blue-500 dark:text-blue-500"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {temporaryPostedComment.author}
                  </p>
                  {isDeleteCustomError && temporaryPostedComment.comment_id === deletedCommentId && (
                    <p className="text-red-500">Whoops! failed to delete your comment. try again later</p>
                  )}

                  <CommentDelete
                    comment_id={temporaryPostedComment.comment_id}
                    isDeleteCustomError={isDeleteCustomError}
                    setIsDeleteCustomError={setIsDeleteCustomError}
                    setDeletedCommentId={setDeletedCommentId}
                  />
                </div>

                <p className="text-gray-700 dark:text-gray-300">Posted on: {temporaryPostedComment.created_at.slice(0, 10)}</p>
                <p className="text-gray-700 dark:text-gray-300">{temporaryPostedComment.body}</p>

                <CommentVote comment={temporaryPostedComment} />
              </li>
            );
          })}
        </ul>
      )}
      <ul className="self-stretch max-w-[750px] flex-col justify-center items-center ">
        {commentsList.map((comment) => {
          return (
            <li
              className={`group shadow-md p-2 mt-3 mb-3 bg-white border-2 dark:bg-gray-800 rounded ${
                isDeleteCustomError && comment.comment_id === deletedCommentId ? "border-red-500 dark:border-red-500" : "dark:border-gray-500"
              }`}
              key={comment.comment_id}
            >
              <div className="flex justify-between">
                <p className={` ${loggedInUser.username === comment.author ? "text-blue-500 dark:text-blue-500" : "dark:text-gray-300"}`}>
                  {comment.author}
                </p>
                {isDeleteCustomError && comment.comment_id === deletedCommentId && (
                  <p className="text-red-500">Whoops! failed to delete your comment. try again later</p>
                )}
                {loggedInUser.username === comment.author ? (
                  <CommentDelete
                    comment_id={comment.comment_id}
                    isDeleteCustomError={isDeleteCustomError}
                    setIsDeleteCustomError={setIsDeleteCustomError}
                    setDeletedCommentId={setDeletedCommentId}
                  />
                ) : (
                  <p></p>
                )}
              </div>

              <p className="text-gray-700 dark:text-gray-300">Posted on: {comment.created_at.slice(0, 10)}</p>
              <p className="text-gray-700 dark:text-gray-300">{comment.body}</p>

              <CommentVote comment={comment} />
            </li>
          );
        })}
      </ul>
      {areMorePages ? (
        <button
          className="btn self-stretch bg-white text-gray-700 max-w-50 m-2 mb-5 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-500"
          onClick={handleLoadMoreComments}
        >
          Load More
        </button>
      ) : (
        <h2 className="text-gray-700 dark:text-gray-300 mb-5">You're up to date!</h2>
      )}
      {isLoading && page !== 1 && <Loading />}
    </div>
  );
}
