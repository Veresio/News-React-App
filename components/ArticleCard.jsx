import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <div className="articleCard">
      <Link to={`/articles/${article.article_id}`}>
        <img src={article.article_img_url} alt={article.title} />
        <h1>{article.title}</h1>
      </Link>
    </div>
  );
}

export default ArticleCard;
