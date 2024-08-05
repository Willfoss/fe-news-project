import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import SingleArticle from "./Components/SingleArticle";

function App() {
  return (
    <div className="body flex flex-col flex-wrap justify-center items-center min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Home />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
