import { stackTraceLimit } from "postcss/lib/css-syntax-error";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function sortBy(props) {
  const { sortBy, setSortBy, order, setOrder, topic, setPage, articleList, setArticleList, setLimit } = props;
  let [searchParams, setSearchParams] = useSearchParams();

  function handleSortChange(event) {
    event.preventDefault();
    setSortBy(event.target.value);
    setPage(1);
    setArticleList([]);
    if (topic === "") {
      setSearchParams({ sort_by: event.target.value, order: order });
    } else {
      setSearchParams({ topic: topic, sort_by: event.target.value, order: order });
    }
  }

  function handleOrderChange(event) {
    event.preventDefault();
    setOrder(event.target.value);
    setPage(1);
    setArticleList([]);
    if (topic === "") {
      setSearchParams({ sort_by: event.target.value, order: order });
    } else {
      setSearchParams({ topic: topic, sort_by: event.target.value, order: order });
    }
  }

  return (
    <div className="flex p-2">
      <select
        onChange={handleSortChange}
        className="select m-2 select-bordered w-full max-w-xs min-w-[140px] text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300"
        value={sortBy}
      >
        <option className="font-bold text-black text-gray-700 dark:text-gray-200" disabled>
          Sort By
        </option>
        <option value="author">Author</option>
        <option value="votes">Votes</option>
        <option value="created_at">Date</option>
        <option value="comment_count">Comments</option>
        <option value="title">Title</option>
      </select>
      <select
        onChange={handleOrderChange}
        className="select m-2 select-bordered bg-white text-gray-700 min-w-[140px] dark:bg-gray-800  dark:text-gray-300"
        value={order}
      >
        <option className="font-bold text-black dark:text-gray-200" disabled>
          Order
        </option>
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
    </div>
  );
}
