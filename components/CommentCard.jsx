import { deleteCommentById } from "../api";

function CommentCard({ comment, user, setCommentsList, commentsList }) {
  function handleDelete() {
    deleteCommentById(comment.comment_id).then(() => {
      setCommentsList(
        commentsList.filter((filterComment) => {
          return filterComment.comment_id !== comment.comment_id;
        })
      );
    });
  }
  return (
    <div className="commentCard">
      <div className="commentContent">
        <p>{comment.author} says:</p>
        <p>{comment.body}</p>
        <p>{comment.created_at.slice(0, 10)}</p>
        {user === comment.author && (
          <button onClick={handleDelete}>Delete</button>
        )}
      </div>
      <form className="votes">
        <button>↑</button>
        <p>{comment.votes}</p>
        <button>↓</button>
      </form>
    </div>
  );
}

export default CommentCard;
