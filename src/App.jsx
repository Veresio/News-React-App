import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import NavBar from "../components/NavBar";
import Topics from "../components/Topics";
import ArticlePage from "../components/ArticlePage";
import "./App.css";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");
  return (
    <>
      <NavBar setUser={setUser} user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics/:topic" element={<Topics />} />
        <Route path="/articles/:id" element={<ArticlePage user={user} />} />
      </Routes>
    </>
  );
}

export default App;
