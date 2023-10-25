import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import NavBar from "../components/NavBar";
import Topics from "../components/Topics";
import ArticlePage from "../components/ArticlePage";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics/:topic" element={<Topics />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
      </Routes>
    </>
  );
}

export default App;
