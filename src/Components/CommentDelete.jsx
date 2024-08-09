import React, { useRef, useState } from "react";
import { Delete } from "lucide-react";
import Loading from "./Loading";
import { deleteCommentByArticleId } from "../api";

export default function CommentDelete(props) {
  const { comment_id, isDeleteCustomError, setIsDeleteCustomError, setDeletedCommentId } = props;
  const [isDeleteInProgress, setIsDeleteInProgress] = useState(false);

  const refreshPage = () => {
    window.parent.location = window.parent.location.href;
  };

  function handleDeleteClick(event) {
    setIsDeleteCustomError(false);
    setIsDeleteInProgress(true);
    deleteCommentByArticleId(comment_id)
      .then(() => {
        setIsDeleteInProgress(false);
        refreshPage();
      })
      .catch((err) => {
        setDeletedCommentId(comment_id);
        setIsDeleteCustomError(true);
        setIsDeleteInProgress(false);
      });
  }

  return (
    <div>
      {!isDeleteInProgress ? (
        <Delete
          onClick={handleDeleteClick}
          className="group-hover:visible invisible hover:cursor-pointer  group-hover:text-red-600 group-focus:visible group-focus:text-red-600"
        />
      ) : (
        <p className="text-red-500">deleting...</p>
      )}
    </div>
  );
}
