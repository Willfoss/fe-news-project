import React, { useState } from "react";
import { SquareArrowUp, SquareArrowDown } from "lucide-react";
import { patchCommentByCommentId } from "../api";

export default function CommentVote(props) {
  const { comment } = props;

  const storedPosVoteCount = localStorage.getItem(`commentPosVoteCount${comment.comment_id}`);
  const storedNegVoteCount = localStorage.getItem(`commentNegVoteCount${comment.comment_id}`);

  const [optimisticVotes, setOptimisticVotes] = useState(0);
  const [commentPositiveVoteNumber, setCommentPositiveVoteNumber] = useState(storedPosVoteCount === "1" ? 1 : 0);

  const [commentNegativeVoteNumber, setCommentNegativeVoteNumber] = useState(storedNegVoteCount === "1" ? 1 : 0);
  const [commentError, setCommentError] = useState("");

  function incrementVotes() {
    if ((commentPositiveVoteNumber === 0 && optimisticVotes === 0) || commentNegativeVoteNumber === 1) {
      setOptimisticVotes((currentOptimisticvotes) => {
        setCommentPositiveVoteNumber(1);
        localStorage.setItem(`commentPosVoteCount${comment.comment_id}`, 1);
        setCommentNegativeVoteNumber(0);
        localStorage.setItem(`commentNegVoteCount${comment.comment_id}`, 0);

        return currentOptimisticvotes + 1;
      });
      patchCommentByCommentId(comment.comment_id, 1).catch(() => {
        setOptimisticVotes((currentOptimisticvotes) => {
          setCommentPositiveVoteNumber(0);
          localStorage.setItem(`commentPosVoteCount${comment.comment_id}`, 0);
          setCommentError("whoops something went wrong! please try again");
          return currentOptimisticvotes - 1;
        });
      });
    }
  }
  function decrementVote() {
    if ((commentNegativeVoteNumber === 0 && optimisticVotes === 0) || commentPositiveVoteNumber === 1) {
      setOptimisticVotes((currentOptimisticvotes) => {
        setCommentNegativeVoteNumber(1);
        localStorage.setItem(`commentNegVoteCount${comment.comment_id}`, 1);
        setCommentPositiveVoteNumber(0);
        localStorage.setItem(`commentPosVoteCount${comment.comment_id}`, 0);
        return currentOptimisticvotes - 1;
      });
      patchCommentByCommentId(comment.comment_id, -1).catch(() => {
        setOptimisticVotes((currentOptimisticvotes) => {
          setCommentNegativeVoteNumber(0);
          localStorage.setItem(`commentNegVoteCount${comment.comment_id}`, 0);
          setCommentError("whoops something went wrong! please try again");
          return currentOptimisticvotes + 1;
        });
      });
    }
  }

  if (commentError) {
    alert(commentError);
  }

  return (
    <div className="card-body flex-row justify-startitems-center">
      <SquareArrowUp onClick={incrementVotes} className={commentPositiveVoteNumber === 1 ? `text-green-500` : `hover:text-green-500`}></SquareArrowUp>
      <h3>{comment.votes + optimisticVotes}</h3>
      <SquareArrowDown onClick={decrementVote} className={commentNegativeVoteNumber === 1 ? `text-red-500` : `hover:text-red-500`}></SquareArrowDown>
    </div>
  );
}