function ArticleCard({ article }) {
  return (
    <div className="articleCard">
      <img src={article.article_img_url} alt="Image attached to the article" />
      <p>{article.title}</p>
    </div>
  );
}

export default ArticleCard;
