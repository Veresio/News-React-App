import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, updateArticleVotes } from "../api";
import CommentSection from "./CommentSection";

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasVotedUp, setHasVotedUp] = useState(false);
  const [hasVotedDown, setHasVotedDown] = useState(false);
  const [votesValue, setVotesValue] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(id).then(({ data: { article } }) => {
      setArticle(article);
      setIsLoading(false);
      setVotesValue(article.votes);
    });
  }, [id]);
  let originalValue = article.votes;

  // This is to keep track of how the user has voted, it has to be here instead of inside handleArticleVote because it's dependent on setVotesValue which is (as i just found out) async
  // This is mainly to allow for optimistic rendering, could also put this if (with slightly different logic) inside .then on line 44 for non optimistic rendering
  useEffect(() => {
    if (originalValue < votesValue) {
      setHasVotedUp(true);
      setHasVotedDown(false);
    } else if (originalValue > votesValue) {
      setHasVotedDown(true);
      setHasVotedUp(false);
    } else {
      setHasVotedDown(false);
      setHasVotedUp(false);
    }
  }, [votesValue]);

  function handleArticleVote(e) {
    e.preventDefault();
    setVotesValue(votesValue + Number(e.target.value));

    updateArticleVotes(id, e.target.value)
      .then(
        ({
          data: {
            article: { votes },
          },
        }) => {
          setVotesValue(votes);
        }
      )
      .catch((err) => {
        setErr(err);
      });
  }

  if (isLoading === true) return <p>Loading...</p>;
  return (
    <>
      <h2>{article.title}</h2>
      <h3>By:{article.author}</h3>
      <img src={article.article_img_url}></img>
      <div className="bodyContainer">
        <p>{article.body}</p>
        <form className="votes">
          <button value={1} disabled={hasVotedUp} onClick={handleArticleVote}>
            ↑
          </button>
          <p>{votesValue}</p>
          <button
            value={-1}
            disabled={hasVotedDown}
            onClick={handleArticleVote}
          >
            ↓
          </button>
        </form>
      </div>
      <CommentSection id={id} />
    </>
  );
}

export default ArticlePage;
