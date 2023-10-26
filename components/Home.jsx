import { useEffect, useState } from "react";
import { fetchAllArticles } from "../api";
import ArticleCard from "./ArticleCard";
import { useSearchParams } from "react-router-dom";

function Home() {
  const [articleList, setArticleList] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useSearchParams();
  const [sort, setSort] = useState("date");
  const [order, setOrder] = useState("descending");

  useEffect(() => {
    fetchAllArticles().then(({ data: { articles } }) => {
      setArticleList(articles);
      setIsLoading(false);
      setQuery({ sortParam: sort, sortOrder: order });
    });
  }, []);

  function handleDropDown(e) {
    if (e.target.id === "sortParam") {
      setSort(e.target.value);
    } else if (e.target.id === "sortOrder") {
      setOrder(e.target.value);
    }
  }

  useEffect(() => {
    setQuery({ sortParam: sort, sortOrder: order });
  }, [order, sort]);

  useEffect(() => {
    console.log("trying");
    const sortingArr = [...articleList];
    if (order === "ascending") {
      if (sort === "comment_count") {
        sortingArr.sort((a, b) => {
          return Number(a.comment_count) - Number(b.comment_count);
        });
        setArticleList(sortingArr);
      } else if (sort === "votes") {
        sortingArr.sort((a, b) => {
          return Number(a.votes) - Number(b.votes);
        });
        setArticleList(sortingArr);
      } else if (sort === "date") {
        sortingArr.sort((a, b) => {
          return new Date(a.created_at) - new Date(b.created_at);
        });
        setArticleList(sortingArr);
      }
    } else if (order === "descending") {
      if (sort === "comment_count") {
        sortingArr.sort((a, b) => {
          return Number(b.comment_count) - Number(a.comment_count);
        });
        setArticleList(sortingArr);
      } else if (sort === "votes") {
        sortingArr.sort((a, b) => {
          return Number(b.votes) - Number(a.votes);
        });
        setArticleList(sortingArr);
      }
    }
    console.log(articleList);
  }, [query]);

  if (isLoading === true) return <p>Loading...</p>;
  return (
    <>
      <h1>Home</h1>
      <h2>Articles</h2>
      <h3>
        Sort by:
        <select onChange={handleDropDown} name="topics" id="sortParam">
          <option value="created_at">Date</option>
          <option value="comment_count">Comment count</option>
          <option value="votes">Votes</option>
        </select>
        in
        <select onChange={handleDropDown} name="topics" id="sortOrder">
          <option value="descending">Descending</option>
          <option value="ascending">Ascending</option>
        </select>
        order
      </h3>

      <div className="articlesContainer">
        {articleList.map((article) => {
          return <ArticleCard key={article.title} article={article} />;
        })}
      </div>
    </>
  );
}

export default Home;
