import { useEffect, useState } from "react";
import { createNewComment, fetchCommentsByArticleId } from "../api";
import CommentCard from "./CommentCard";

function CommentSection({ id, user }) {
  const [commentsList, setCommentsList] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [newCommentInput, setNewCommentInput] = useState("");
  const [commentSent, setCommentSent] = useState(false);
  const [err, setErr] = useState("");
  useEffect(() => {
    setIsLoading(true);
    fetchCommentsByArticleId(id).then(({ data: { comments } }) => {
      setCommentsList(comments);
      setIsLoading(false);
    });
  }, [id]);
  function handleNewComment(e) {
    e.preventDefault();
    setCommentSent(true);
    setErr("");
    createNewComment(id, newCommentInput, user)
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
      {commentsList.map((comment) => {
        return <CommentCard comment={comment} key={comment.id} />;
      })}
    </div>
  );
}

export default CommentSection;
