import React from "react";

export default function Error(props) {
  const { error } = props;

  if (error.response) {
    const { error } = props;
    console.log(error);
    const errorStatus = error.response.status;

    if (errorStatus === 404) {
      return (
        <section className="flex flex-col justify-center items-center">
          <h2 className="text-2xl dark:text-gray-300 mt-10">Error!</h2>
          <p className="text-l dark:text-gray-300 mt-2">What you were looking for doesn't exist! </p>
        </section>
      );
    }

    if (errorStatus === 400) {
      return (
        <section className="flex flex-col justify-center items-center">
          <h2 className="text-2xl dark:text-gray-300 mt-10">Error!</h2>
          <p className="text-l dark:text-gray-300 mt-2 ml-5 mr-5">
            Looks like you didn't provide all the necessary information in the right format - try again!
          </p>
        </section>
      );
    }
  } else {
    return (
      <section className="flex flex-col justify-center items-center">
        <h2 className="text-2xl dark:text-gray-300 mt-10">Error!</h2>
        <p className="text-l dark:text-gray-300 mt-2 ml-5 mr-5">Looks like you're no longer connected to the internet!</p>
      </section>
    );
  }
}
