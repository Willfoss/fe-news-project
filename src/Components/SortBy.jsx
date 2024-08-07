import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function sortBy(props) {
  const { sortBy, setSortBy, order, setOrder, topic } = props;
  let [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();

  function handleSortChange(event) {
    event.preventDefault();
    setSortBy(event.target.value);
    if (topic === "") {
      setSearchParams({ sort_by: event.target.value, order: order });
    } else {
      setSearchParams({ topic: topic, sort_by: event.target.value, order: order });
    }
  }

  function handleOrderChange(event) {
    event.preventDefault();
    setOrder(event.target.value);
    if (topic === "") {
      setSearchParams({ sort_by: event.target.value, order: order });
    } else {
      setSearchParams({ topic: topic, sort_by: event.target.value, order: order });
    }
  }

  return (
    <div className="flex p-2">
      <select onChange={handleSortChange} className="select select-bordered w-full max-w-xs" value={sortBy}>
        <option className="font-bold text-black" disabled>
          Sort By
        </option>
        <option value="author">Author</option>
        <option value="votes">Votes</option>
        <option value="created_at">Date</option>
        <option value="comment_count">Number of Comments</option>
        <option value="title">Title</option>
      </select>
      <select onChange={handleOrderChange} className="select select-bordered w-full max-w-xs" value={order}>
        <option className="font-bold text-black" disabled>
          Order
        </option>
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
    </div>
  );
}
