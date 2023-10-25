import { Link, useNavigate } from "react-router-dom";
import { fetchAllTopics } from "../api";
import { useEffect, useState } from "react";

function NavBar() {
  const [topicsList, setTopicsList] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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
    </nav>
  );
}

export default NavBar;
