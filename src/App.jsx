import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";

function App() {
  return (
    <div className="body flex flex-col flex-wrap justify-center items-center min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
