import { useContext, useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

import SingleArticle from "./Components/SingleArticle";
import { UserContext } from "./Context/UserContext";
import Login from "./Components/Login";
import User from "./Components/User";
import Signup from "./Components/Signup";
import HomeFilterProvider from "./Components/HomeFilterProvider";
import PostArticle from "./Components/PostArticle";
import BadPathError from "./Components/BadPathError";
import AddTopic from "./Components/AddTopic";

function App() {
  const { loggedInUser } = useContext(UserContext);

  return (
    <div className="body flex flex-col flex-wrap justify-center items-center min-h-screen">
      <Header />
      <main className="flex flex-1 bg-gray-100 w-screen justify-center items-start dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<HomeFilterProvider />} />
          <Route path="/articles" element={<HomeFilterProvider />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          <Route path="/login" element={loggedInUser.username === "" ? <Login /> : <Navigate to="/" />} />
          <Route path="/user" element={loggedInUser.username != "" ? <User /> : <Navigate to="/login" />} />
          <Route path="/signup" element={loggedInUser.username === "" ? <Signup /> : <Navigate to="/" />} />
          <Route path="/postarticle" element={loggedInUser.username !== "" ? <PostArticle /> : <Navigate to="/login" />} />
          <Route path="/addtopic" element={loggedInUser.username !== "" ? <AddTopic /> : <Navigate to="/login" />} />
          <Route path="*" element={<BadPathError />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
