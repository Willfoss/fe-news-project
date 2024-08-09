import React, { useContext, useEffect, useState } from "react";
import { getTopics } from "../api";
import { postArticle } from "../api";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function PostArticle() {
  const [topicsList, setTopicsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isPostingError, setIsPostingError] = useState(false);
  const [isCustomError, setIsCustomError] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [topicInput, setTopicInput] = useState("");
  const { loggedInUser } = useContext(UserContext);
  let navigate = useNavigate();

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

  function handleTitleInputChange(event) {
    if (topicInput) {
      setIsCustomError(false);
    }
    setTitleInput(event.target.value);
  }

  function handleUrlInputChange(event) {
    setUrlInput(event.target.value);
  }

  function handleBodyInputChange(event) {
    setBodyInput(event.target.value);
  }

  function handleTopicChange(event) {
    if (titleInput) {
      setIsCustomError(false);
    }
    setTopicInput(event.target.value);
  }

  function handleArticlePost(event) {
    event.preventDefault();
    if (!topicInput || !titleInput) {
      setIsCustomError(true);
      return;
    }

    postArticle(loggedInUser.username, titleInput, bodyInput, urlInput, topicInput)
      .then(() => {
        navigate("/user");
      })
      .catch(() => {
        setIsPostingError(true);
      });
  }

  return isPostingError ? (
    <h2 className="flex justify-center items-center text-gray-700 dark:text-gray-300 m-5">
      Whoops something went wrong while tryin to post your article! please refresh the page and try again!
    </h2>
  ) : (
    <div className="flex justify-center items-center w-screen">
      <form onSubmit={handleArticlePost} id="login-container" className="flex flex-col border-2 rounded p-5 mt-10 mb-10 dark:border-gray-500">
        <label className="flex flex-col text-gray-700 justify-center dark:text-gray-300" htmlFor="username-input">
          Select a Topic:
        </label>
        <select
          onChange={handleTopicChange}
          value={topicInput}
          className="select select-bordered max-w-xs bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300"
        >
          <option></option>
          {topicsList.map((topic) => {
            return (
              <option value={topic.slug} className="btn mr-3 bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300" key={topic.slug}>
                {topic.slug}
              </option>
            );
          })}
        </select>
        <label className="flex flex-col justify-center m-2 text-gray-700 dark:text-gray-300">
          Title:
          <input
            type="text"
            placeholder="Type here"
            onChange={handleTitleInputChange}
            value={titleInput}
            className="input input-bordered bg-white max-w-lg dark:bg-gray-800 dark:text-gray-300"
            minLength={2}
            required
          />
        </label>
        <label className="flex flex-col justify-center m-2 text-gray-700 dark:text-gray-300">
          Enter an image URL:
          <input
            type="url"
            placeholder="Type here"
            onChange={handleUrlInputChange}
            value={urlInput}
            className="input input-bordered w-full bg-white text-gray-700 max-w-xs dark:bg-gray-800 dark:text-gray-300"
            minLength={5}
          />
        </label>
        <label className="flex flex-col justify-center m-2 text-gray-700 dark:text-gray-300 dark:bg-gray-800">
          Body:
          <textarea
            className="textarea textarea-bordered  min-h-72 max-w-xs bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            placeholder="Type here"
            value={bodyInput}
            onChange={handleBodyInputChange}
          ></textarea>
        </label>
        {isCustomError && <p className="text-red-500">*Topic and Title are required</p>}
        <button className="btn bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-500 dark:focus:bg-gray-500">
          Post
        </button>
      </form>
    </div>
  );
}
