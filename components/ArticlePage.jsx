import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../api";

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(id).then(({ data: { article } }) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading === true) return <p>Loading...</p>;
  return (
    <>
      <h2>{article.title}</h2>
      <h3>By:{article.author}</h3>
      <img src={article.article_img_url}></img>
      <div className="bodyContainer">
        <p>{article.body}</p>
        <form>
          <button>↑</button>
          <p>{article.votes}</p>
          <button>↓</button>
        </form>
      </div>
      <div className="commentSection"></div>
    </>
  );
}

export default ArticlePage;
