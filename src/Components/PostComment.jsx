import React, { useContext, useState } from "react";
import { postCommentByArticleId } from "../api";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";

export default function PostComment(props) {
  const { article_id, setTemporaryPostedComment, setOptimisticCommentCount } = props;
  const { loggedInUser } = useContext(UserContext);
  const [commentTextInput, setCommentTextInput] = useState("");

  function handleCommentChange(event) {
    setCommentTextInput(event.target.value);
  }

  function handleCommentSubmit(event) {
    event.preventDefault();
    if (loggedInUser.username === "") {
      logInModal.showModal();
    } else {
      setOptimisticCommentCount((currentValue) => {
        return currentValue + 1;
      });
      postCommentByArticleId(article_id, commentTextInput, loggedInUser.username)
        .then((postedComment) => {
          setCommentTextInput("");
          setTemporaryPostedComment(postedComment.comment);
        })
        .catch(() => {
          setTemporaryPostedComment({});
          setOptimisticCommentCount((currentValue) => {
            return currentValue - 1;
          });
          postingErrorModal.showModal();
        });
    }
  }

  return (
    <div>
      <form onSubmit={handleCommentSubmit} className="flex flex-col justify-center items-center shadow-md p-2 m-2">
        <label>
          <textarea
            className="textarea textarea-bordered w-[380px] h-40"
            placeholder="comment"
            onChange={handleCommentChange}
            value={commentTextInput}
          ></textarea>
        </label>
        <button className="btn bg-white">Post Comment</button>
      </form>
      <dialog id="logInModal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">You are not logged in!</h3>
          <p className="py-4">You must be logged in to post. do you want to login now?</p>
          <div className="modal-action flex flex-row items-center justify-evenly ">
            <form method="dialog">
              <Link to="/login" className="btn mr-5">
                Yes (go to login page)
              </Link>
              <button className="btn ">No (continue browsing)</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="postingErrorModal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Something went wrong!</h3>
          <p className="py-4">Please try posting again</p>
          <div className="modal-action flex flex-row items-center justify-evenly ">
            <form method="dialog">
              <button className="btn ">Close this window</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
