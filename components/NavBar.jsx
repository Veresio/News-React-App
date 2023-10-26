import { Link, useNavigate } from "react-router-dom";
import { fetchAllTopics } from "../api";
import { useEffect, useState } from "react";

function NavBar({ setUser, user }) {
  const [topicsList, setTopicsList] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [logIn, setLogIn] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchAllTopics().then(({ data: { topics } }) => {
      setTopicsList(topics);
      setIsLoading(false);
    });
  }, []);

  function handleDropDown(e) {
    if (e.target.value === "All topics") navigate("/");
    else navigate(`/topics/${e.target.value}`);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setUser(logIn);
    setLogIn("");
  }
  if (isLoading === true) return <p>Loading...</p>;
  return (
    <nav>
      <Link to="/">NC News</Link>
      <form>
        <label htmlFor="topics">Topics:</label>
        <select onChange={handleDropDown} name="topics" id="topics">
          <option value="All topics">All topics</option>
          {topicsList.map((topic) => {
            return (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            );
          })}
        </select>
      </form>
      {!user && (
        <form>
          <input
            value={logIn}
            onChange={(event) => setLogIn(event.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>
            Log In
          </button>
        </form>
      )}
      {user && (
        <form>
          <h2>
            Welcome {user}{" "}
            <button type="submit" onClick={handleSubmit}>
              Log Out
            </button>
          </h2>
        </form>
      )}
    </nav>
  );
}

export default NavBar;
