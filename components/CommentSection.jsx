import { useEffect, useState } from "react";
import { createNewComment, fetchCommentsByArticleId } from "../api";
import CommentCard from "./CommentCard";

function CommentSection({ id }) {
  const [commentsList, setCommentsList] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [newCommentInput, setNewCommentInput] = useState("");
  const [commentSent, setCommentSent] = useState(false);
  const [err, setErr] = useState("");
  const username = "cooljmessy"; //not sure if we're meant to take a username or just use an existing one, code should be 95% the same
  useEffect(() => {
    setIsLoading(true);
    fetchCommentsByArticleId(id)
      .then(({ data: { comments } }) => {
        setCommentsList(comments);
        setIsLoading(false);
      })
      .catch((err) => {
        if ((err.status = 404)) setIsLoading(false);
      });
  }, [id]);
  function handleNewComment(e) {
    e.preventDefault();
    setCommentSent(true);
    setErr("");
    createNewComment(id, newCommentInput, username)
      .then(({ data: { comment } }) => {
        setNewCommentInput("");
        setCommentsList([comment, ...commentsList]);
        setCommentSent(false);
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          setCommentSent(false);
          setErr(message);
        }
      );
  }
  if (isLoading === true) return <p>Loading...</p>;
  return (
    <div className="commentSection">
      <h2>Comments</h2>
      <form className="ownComment">
        <textarea
          className="ownCommentInput"
          type="text"
          name="userComment"
          id="userComment"
          placeholder="Enter your comment here..."
          value={newCommentInput}
          onChange={(e) => setNewCommentInput(e.target.value)}
        />

        <button
          className="submitComment"
          onClick={handleNewComment}
          disabled={commentSent}
        >
          Post
        </button>
        {err ? (
          <div className="popup">
            <p>{err}</p>
          </div>
        ) : null}
      </form>
      {commentsList ? (
        commentsList.map((comment) => {
          return <CommentCard comment={comment} key={comment.id} />;
        })
      ) : (
        <p>Be the first to comment on this article</p>
      )}
    </div>
  );
}

export default CommentSection;
