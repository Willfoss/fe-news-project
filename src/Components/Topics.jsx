import React, { useEffect, useState } from "react";
import { getTopics } from "../api";
import Loading from "./Loading";
import { useSearchParams } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Topics(props) {
  const { setTopic, topic, sortBy, order, setArticleList, setLimit, setPage } = props;
  const [topicsList, setTopicsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  let [searchParams, setSearchParams] = useSearchParams();

  function handleTopicSelectorClick(event) {
    event.preventDefault();
    console.log(event.target.textContent);
    if (event.target.textContent === "All Topics") {
      const elem = document.activeElement;
      if (elem) {
        elem?.blur();
      }
      if ("" === topic) {
        return;
      }
      setTopic("");
      setSelectedTopic("All Topics");
      setArticleList([]);
      setPage(1);
      setSearchParams({ sort_by: sortBy, order: order });
    } else {
      const elem = document.activeElement;
      if (elem) {
        elem?.blur();
      }
      if (event.target.textContent === topic) {
        return;
      }
      setTopic(event.target.textContent);
      setSelectedTopic(event.target.textContent);
      setArticleList([]);
      setPage(1);
      setSearchParams({ topic: event.target.textContent, sort_by: sortBy, order: order });
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getTopics()
      .then(({ topics }) => {
        setTopicsList(topics);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  //hmm do i want these as loading will appear twice on the screen with the article loading?
  if (isLoading) return <Loading />;
  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className="dropdown dropdown-end bg-gray-100 dark:bg-gray-900">
        <button className="btn w-[150px] flex justify-start bg-white dark:border-gray-800 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
          <Menu className="mr-2" />
          {topic === "" ? "All Topics" : topic}
        </button>
        <ul tabIndex={0} className="menu dropdown-content bg-white bg-base-100 rounded-box dark:bg-gray-800 z-[1] mt-4 w-52 p-2 shadow">
          <li
            className={`btn mr-3  text-gray-700 dark:text-gray-300 dark:border-gray-800 ${
              "All Topics" === selectedTopic ? "bg-gray-400 dark:bg-gray-500" : "dark:bg-gray-800 bg-white"
            }`}
            onClick={handleTopicSelectorClick}
            key="all-items"
          >
            All Topics
          </li>
          {topicsList.map((topic) => {
            return (
              <li
                className={`btn mr-3  text-gray-700 dark:text-gray-300 border-white dark:border-gray-800 ${
                  topic.slug === selectedTopic ? "bg-gray-400 dark:bg-gray-500" : "dark:bg-gray-800 bg-white"
                }`}
                onClick={handleTopicSelectorClick}
                key={topic.slug}
              >
                {topic.slug}
              </li>
            );
          })}
        </ul>
      </div>
      <ul></ul>
    </div>
  );
}
