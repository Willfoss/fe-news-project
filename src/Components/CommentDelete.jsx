import React, { useState } from "react";
import { Delete } from "lucide-react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { deleteCommentByArticleId } from "../api";

export default function CommentDelete(props) {
  const { comment_id } = props;

  function handleDeleteClick(event) {
    console.log(event);
    console.log(comment_id);
    document.getElementById(`confirmDeleteModal${comment_id}`).showModal();
  }

  function handleConfirmDeleteClick(event) {
    console.log(event);
    console.log("confirm");
    console.log(comment_id);
    document.getElementById(`deletingLoading${comment_id}`).showModal();
    deleteCommentByArticleId(comment_id)
      .then(() => {
        document.getElementById(`deletingLoading${comment_id}`).close();
        document.getElementById(`commentDeleted${comment_id}`).showModal();
      })
      .catch(() => {
        document.getElementById(`deletingLoading${comment_id}`).close();
        document.getElementById(`commentDeleted${comment_id}`).close();
        document.getElementById(`deleteCommentError${comment_id}`).close();
      });
  }

  function handleAcceptCommentHasBeenDeleted() {
    window.location.reload();
  }

  return (
    <div>
      <Delete
        onClick={handleDeleteClick}
        className="group-hover:visible invisible hover:cursor-pointer  group-hover:text-red-600 group-focus:visible group-focus:text-red-600"
      />
      <dialog id={`confirmDeleteModal${comment_id}`} className="modal" value={comment_id}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">Confirm comment removal</h3>
          <p className="py-4">This will permanently delete your comment. Are you sure?</p>
          <div className="modal-action flex flex-row items-center justify-evenly ">
            <form method="dialog">
              <button onClick={handleConfirmDeleteClick} className="btn mr-3">
                Yes (delete)
              </button>
              <button className="btn mf-3">No (go back)</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id={`deletingLoading${comment_id}`} className="modal">
        <div className="modal-box">
          <p className="py-4">Deleting...</p>
        </div>
      </dialog>
      <dialog id={`commentDeleted${comment_id}`} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Successfully removed!</h3>
          <p className="py-4">Your comment has been successfully removed</p>
          <div className="modal-action flex flex-row items-center justify-evenly ">
            <form method="dialog">
              <button onClick={handleAcceptCommentHasBeenDeleted} className="btn mf-3">
                close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id={`deleteCommentError${comment_id}`} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Successfully removed!</h3>
          <p className="py-4">Your comment has been successfully removed</p>
          <div className="modal-action flex flex-row items-center justify-evenly ">
            <form method="dialog">
              <button className="btn mf-3">close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
