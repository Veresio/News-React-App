import { useEffect, useState } from "react";
import { fetchAllArticles } from "../api";
import ArticleCard from "./ArticleCard";
import { useParams } from "react-router-dom";

function Topics() {
  const { topic } = useParams();
  const [articleList, setArticleList] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllArticles(topic).then(({ data: { articles } }) => {
      setArticleList(articles);
      setIsLoading(false);
    });
  }, [topic]);

  if (isLoading === true) return <p>Loading...</p>;
  return (
    <>
      <h1>{topic.charAt(0).toUpperCase() + topic.slice(1)}</h1>
      <h2>Articles</h2>
      <div className="articlesContainer">
        {articleList.map((article) => {
          return <ArticleCard key={article.title} article={article} />;
        })}
      </div>
    </>
  );
}

export default Topics;
