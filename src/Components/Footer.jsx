import React from "react";
import { Linkedin, Github } from "lucide-react";

export default function Footer() {
  function handleLinkedInClick() {
    window.open("https://uk.linkedin.com/in/will-fossard-2ab174b0", "_blank");
  }

  function handleGithubClick() {
    window.open("https://github.com/Willfoss", "_blank");
  }

  return (
    <footer className="w-full flex items-center justify-center bg-white text-gray-700 border-t-2 dark:border-gray-300 dark:bg-gray-900">
      <div className="flex p-5  ">
        <Linkedin onClick={handleLinkedInClick} className="mr-5 min-w-[50px] w-[50px] text-gray-700 dark:text-gray-300 hover:cursor-pointer" />
        <Github onClick={handleGithubClick} className="min-w-[50px] w-[50px] bg-white dark:bg-gray-900 dark:text-gray-300 hover:cursor-pointer" />
      </div>
    </footer>
  );
}
