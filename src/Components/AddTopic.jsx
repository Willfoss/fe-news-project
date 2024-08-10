import React, { useContext, useEffect, useState } from "react";
import { postTopic } from "../api";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function AddTopic() {
  const [isPostingError, setIsPostingError] = useState(false);
  const [isCustomError, setIsCustomError] = useState(false);
  const [slugInput, setSlugInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const { loggedInUser } = useContext(UserContext);
  let navigate = useNavigate();

  function handleSlugInputChange(event) {
    if (slugInput) {
      setIsCustomError(false);
    }
    setSlugInput(event.target.value);
  }

  function handleDescriptionInputChange(event) {
    setDescriptionInput(event.target.value);
  }

  function handleTopicPost(event) {
    event.preventDefault();
    if (!slugInput || !descriptionInput) {
      setIsCustomError(true);
      return;
    }

    postTopic(slugInput, descriptionInput)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setIsPostingError(true);
      });
  }

  return isPostingError ? (
    <h2 className="flex justify-center items-center text-gray-700 dark:text-gray-300 m-5">
      Whoops something went wrong while trying to add your topic! please refresh the page and try again!
    </h2>
  ) : (
    <div className="flex self-center justify-center items-center w-screen">
      <form
        onSubmit={handleTopicPost}
        id="login-container"
        className="flex flex-col border-2 w-full rounded max-w-[500px] p-5 mt-10 mb-10 ml-5 mr-5 dark:border-gray-500"
      >
        <label className="flex flex-col justify-center mt-2 mb-2 ml-0 mr-0 text-gray-700 dark:text-gray-300">
          Topic Title
          <input
            type="text"
            placeholder="Type here"
            onChange={handleSlugInputChange}
            value={slugInput}
            className="input input-bordered max-w-xl bg-white max-w-[500px]  dark:bg-gray-800 dark:text-gray-300"
            minLength={3}
            required
          />
        </label>
        <label className="flex flex-col justify-center mt-2 mb-2 ml-0 mr-0 text-gray-700 dark:text-gray-300 dark:bg-gray-900">
          Description:
          <textarea
            className="textarea textarea-bordered  min-h-72 max-w-xl bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            placeholder="Type here"
            value={descriptionInput}
            onChange={handleDescriptionInputChange}
          ></textarea>
        </label>
        {isCustomError && <p className="text-red-500">*Topic Title and description are required</p>}
        <button className="btn mt-4 bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-500 dark:focus:bg-gray-500">
          Add Topic
        </button>
      </form>
    </div>
  );
}
