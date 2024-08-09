import React, { useState } from "react";
import { SquareArrowUp, SquareArrowDown } from "lucide-react";
import { patchArticleByarticleId } from "../api";

export default function ArticleVotes(props) {
  const { article } = props;

  const storedPosVoteCount = localStorage.getItem(`articlePosVoteCount${article.article_id}`);
  const storedNegVoteCount = localStorage.getItem(`articleNegVoteCount${article.article_id}`);

  const [optimisticVotes, setOptimisticVotes] = useState(0);
  const [articlePositiveVoteNumber, setarticlePositiveVoteNumber] = useState(storedPosVoteCount === "1" ? 1 : 0);
  const [articleNegativeVoteNumber, setarticleNegativeVoteNumber] = useState(storedNegVoteCount === "1" ? 1 : 0);
  const [articleError, setarticleError] = useState("");

  function incrementVote() {
    if (articlePositiveVoteNumber === 0 && articleNegativeVoteNumber === 1) {
      setOptimisticVotes((currentOptimisticvotes) => {
        setarticlePositiveVoteNumber(1);
        localStorage.setItem(`articlePosVoteCount${article.article_id}`, 1);
        setarticleNegativeVoteNumber(0);
        localStorage.setItem(`articleNegVoteCount${article.article_id}`, 0);
        return currentOptimisticvotes + 2;
      });
      patchArticleByarticleId(article.article_id, 2).catch(() => {
        setOptimisticVotes((currentOptimisticvotes) => {
          setarticlePositiveVoteNumber(0);
          localStorage.setItem(`articlePosVoteCount${article.article_id}`, 0);
          setarticleError("whoops something went wrong! please try again");
          return currentOptimisticvotes - 2;
        });
      });
    } else if (articlePositiveVoteNumber === 0) {
      setOptimisticVotes((currentOptimisticvotes) => {
        setarticlePositiveVoteNumber(1);
        localStorage.setItem(`articlePosVoteCount${article.article_id}`, 1);
        return currentOptimisticvotes + 1;
      });
      patchArticleByarticleId(article.article_id, 1).catch(() => {
        setOptimisticVotes((currentOptimisticvotes) => {
          setarticlePositiveVoteNumber(0);
          localStorage.setItem(`articlePosVoteCount${article.article_id}`, 0);
          setarticleError("whoops something went wrong! please try again");
          return currentOptimisticvotes - 1;
        });
      });
    } else if (articlePositiveVoteNumber === 1) {
      setOptimisticVotes((currentOptimisticvotes) => {
        setarticlePositiveVoteNumber(0);
        localStorage.setItem(`articlePosVoteCount${article.article_id}`, 0);
        return currentOptimisticvotes - 1;
      });
      patchArticleByarticleId(article.article_id, -1).catch(() => {
        setOptimisticVotes((currentOptimisticvotes) => {
          setarticlePositiveVoteNumber(1);
          localStorage.setItem(`articlePosVoteCount${article.article_id}`, 1);
          setarticleError("whoops something went wrong! please try again");
          return currentOptimisticvotes + 1;
        });
      });
    }
  }
  function decrementVote() {
    if (articleNegativeVoteNumber === 0 && articlePositiveVoteNumber === 1) {
      setOptimisticVotes((currentOptimisticvotes) => {
        setarticleNegativeVoteNumber(1);
        localStorage.setItem(`articleNegVoteCount${article.article_id}`, 1);
        setarticlePositiveVoteNumber(0);
        localStorage.setItem(`articlePosVoteCount${article.article_id}`, 0);
        return currentOptimisticvotes - 2;
      });
      patchArticleByarticleId(article.article_id, -2).catch(() => {
        setOptimisticVotes((currentOptimisticvotes) => {
          setarticleNegativeVoteNumber(0);
          localStorage.setItem(`articleNegVoteCount${article.article_id}`, 0);
          setarticleError("whoops something went wrong! please try again");
          return currentOptimisticvotes + 2;
        });
      });
    } else if (articleNegativeVoteNumber === 0) {
      setOptimisticVotes((currentOptimisticvotes) => {
        setarticleNegativeVoteNumber(1);
        localStorage.setItem(`articleNegVoteCount${article.article_id}`, 1);
        return currentOptimisticvotes - 1;
      });
      patchArticleByarticleId(article.article_id, -1).catch(() => {
        setOptimisticVotes((currentOptimisticvotes) => {
          setarticleNegativeVoteNumber(0);
          localStorage.setItem(`articleNegVoteCount${article.article_id}`, 0);
          setarticleError("whoops something went wrong! please try again");
          return currentOptimisticvotes + 1;
        });
      });
    } else if (articleNegativeVoteNumber === 1) {
      setOptimisticVotes((currentOptimisticvotes) => {
        setarticleNegativeVoteNumber(0);
        localStorage.setItem(`articleNegVoteCount${article.article_id}`, 0);
        return currentOptimisticvotes + 1;
      });
      patchArticleByarticleId(article.article_id, 1).catch(() => {
        setOptimisticVotes((currentOptimisticvotes) => {
          setarticleNegativeVoteNumber(0);
          localStorage.setItem(`articleNegVoteCount${article.article_id}`, 0);
          setarticleError("whoops something went wrong! please try again");
          return currentOptimisticvotes - 1;
        });
      });
    }
  }

  return (
    <section>
      {articleError && <p className="text-s text-red-500">Something went wrong! try again later</p>}
      <div className="card-body flex-row justify-startitems-center p-0">
        <SquareArrowUp
          onClick={incrementVote}
          className={`text-gray-700 dark:text-gray-300 ${
            articlePositiveVoteNumber === 1 ? "text-green-500 dark:text-green-500" : "hover:text-green-500 dark:hover:text-green-500"
          }`}
        ></SquareArrowUp>
        <h3 className=" text-gray-700 dark:text-gray-300">{article.votes + optimisticVotes}</h3>
        <SquareArrowDown
          onClick={decrementVote}
          className={`text-gray-700  dark:text-gray-300 ${
            articleNegativeVoteNumber === 1 ? "text-red-500 dark:text-red-500" : "hover:text-red-500 dark:hover:text-red-500"
          }`}
        ></SquareArrowDown>
      </div>
    </section>
  );
}
