import React, { useEffect, useState } from "react";
import { getTopics } from "../api";
import Loading from "./Loading";
import { useSearchParams } from "react-router-dom";

export default function Topics(props) {
  const { setTopic, topic, sortBy, order, setArticleList, setLimit, setPage } = props;
  const [topicsList, setTopicsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  let [searchParams, setSearchParams] = useSearchParams();

  function handleTopicSelectorClick(event) {
    event.preventDefault();
    if (event.target.outerText === "All Topics") {
      setTopic("");
      setSelectedTopic("All Topics");
      setArticleList([]);
      setPage(1);
      setSearchParams({ sort_by: sortBy, order: order });
    } else {
      setTopic(event.target.outerText);
      setSelectedTopic(event.target.outerText);
      setArticleList([]);
      setPage(1);
      setSearchParams({ topic: event.target.outerText, sort_by: sortBy, order: order });
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
      <ul>
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
  );
}
