import React, { useContext, useState } from "react";
import { postCommentByArticleId } from "../api";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import Error from "./Error";

export default function PostComment(props) {
  const { article_id, setTemporaryPostedCommentList, setOptimisticCommentCount } = props;
  const { loggedInUser } = useContext(UserContext);
  const [commentTextInput, setCommentTextInput] = useState("");
  const [emptyCommentBox, setEmptyCommentBox] = useState(false);
  const [error, setError] = useState();

  function handleCommentChange(event) {
    setCommentTextInput(event.target.value);
    setEmptyCommentBox(false);
  }

  function handleCommentSubmit(event) {
    event.preventDefault();
    if (commentTextInput.length < 1) {
      setEmptyCommentBox(true);
    } else {
      setOptimisticCommentCount((currentValue) => {
        return currentValue + 1;
      });
      postCommentByArticleId(article_id, commentTextInput, loggedInUser.username)
        .then((postedComment) => {
          setCommentTextInput("");
          setTemporaryPostedCommentList((prevComments) => {
            return [...prevComments, postedComment.comment];
          });
        })
        .catch((error) => {
          setOptimisticCommentCount((currentValue) => {
            return currentValue - 1;
          });
          console.log(error);
          setError(error);
        });
    }
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="flex flex-col self-stretch justify-center ">
      {loggedInUser.username !== "" ? (
        <form onSubmit={handleCommentSubmit} className="flex  flex-col justify-center items-center shadow-md pt-2 mt-2">
          <label className="flex self-stretch flex-col">
            <textarea
              className="textarea w-full textarea-bordered h-40 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-400"
              placeholder="comment"
              onChange={handleCommentChange}
              value={commentTextInput}
            ></textarea>
          </label>
          {emptyCommentBox && <p className="text-red-500">You need to enter something to post!</p>}
          <button className="btn bg-white self-stretch mt-2 dark:bg-gray-800 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-500 dark:focus:bg-gray-500">
            Post Comment
          </button>
        </form>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <p className="dark:text-gray-300 ">You must be logged in to post. do you want to login now?</p>
          <Link
            to="/login"
            className="btn mr-5 dark:bg-gray-800 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-500 dark:focus:bg-gray-500"
          >
            Yes (go to login page)
          </Link>
        </div>
      )}
    </div>
  );
}
