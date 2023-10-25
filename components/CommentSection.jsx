import { useEffect, useState } from "react";
import { fetchCommentsByArticleId } from "../api";
import CommentCard from "./CommentCard";

function CommentSection({ id }) {
  const [commentsList, setCommentsList] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetchCommentsByArticleId(id).then(({ data: { comments } }) => {
      setCommentsList(comments);
      setIsLoading(false);
    });
  }, [id]);
  if (isLoading === true) return <p>Loading...</p>;
  return (
    <div className="commentSection">
      <h2>Comments</h2>
      <form>
        <label htmlFor="userComment">To be developped later</label>
        <input type="text" name="userComment" id="userComment" />
      </form>
      {commentsList.map((comment) => {
        return <CommentCard comment={comment} key={comment.id} />;
      })}
    </div>
  );
}

export default CommentSection;
