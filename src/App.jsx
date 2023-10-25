import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import NavBar from "../components/NavBar";
import Topics from "../components/Topics";
// import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics/:topic" element={<Topics />} />
      </Routes>
      <Home />;
    </>
  );
}

export default App;
