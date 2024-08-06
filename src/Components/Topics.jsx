import React, { useEffect, useState } from "react";
import { getTopics } from "../api";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

export default function Topics(props) {
  let navigate = useNavigate();
  const { setTopic } = props;
  const [topicsList, setTopicsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  function handleTopicSelectorClick(event) {
    if (event.target.outerText === "All Items") {
      setTopic("");
      navigate(`/articles`, { replace: true });
    } else {
      setTopic(event.target.outerText);
      navigate(`/articles?topic=${event.target.outerText}`, { replace: true });
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getTopics()
      .then(({ topics }) => {
        setTopicsList(topics);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  //hmm do i want these as loading will appear twice on the screen?
  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <h2>Topics</h2>
      <ul>
        <li className="btn mr-3" onClick={handleTopicSelectorClick} key="all-items">
          All Items
        </li>
        {topicsList.map((topic) => {
          return (
            <li className="btn mr-3" onClick={handleTopicSelectorClick} key={topic.slug}>
              {topic.slug}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
