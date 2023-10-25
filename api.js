import axios from "axios";
export function fetchAllEndpoints() {
  return axios.get("https://news-api-f5ap.onrender.com/api");
}

export function fetchAllTopics() {
  return axios.get("https://news-api-f5ap.onrender.com/api/topics");
}

export function fetchAllArticles() {
  return axios.get("https://news-api-f5ap.onrender.com/api/articles");
}
