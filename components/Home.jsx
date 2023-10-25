import { useEffect, useState } from "react";
import { fetchAllArticles } from "../api";
import ArticleCard from "./ArticleCard";

function Home() {
  const [articleList, setArticleList] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllArticles().then(({ data: { articles } }) => {
      setArticleList(articles);
      setIsLoading(false);
    });
  }, []);

  if (isLoading === true) return <p>Loading...</p>;
  return (
    <>
      <h1>Articles</h1>
      <div className="articlesContainer">
        {articleList.map((article) => {
          return <ArticleCard key={article.title} article={article} />;
        })}
      </div>
    </>
  );
}

export default Home;
