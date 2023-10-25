function CommentCard({ comment }) {
  return (
    <div className="commentCard">
      <div className="commentContent">
        <p>{comment.author} says:</p>
        <p>{comment.body}</p>
        <p>{comment.created_at.slice(0, 10)}</p>
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
