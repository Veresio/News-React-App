import axios from "axios";
export function fetchAllEndpoints() {
  return axios.get("https://news-api-f5ap.onrender.com/api");
}

export function fetchAllTopics() {
  return axios.get("https://news-api-f5ap.onrender.com/api/topics");
}

export function fetchAllArticles(topic) {
  if (topic) {
    return axios.get(
      `https://news-api-f5ap.onrender.com/api/articles?topic=${topic}`
    );
  } else return axios.get("https://news-api-f5ap.onrender.com/api/articles");
}

export function fetchArticleById(id) {
  return axios.get(`https://news-api-f5ap.onrender.com/api/articles/${id}`);
}

export function fetchCommentsByArticleId(id) {
  return axios.get(
    `https://news-api-f5ap.onrender.com/api/articles/${id}/comments`
  );
}

export function updateArticleVotes(id, voteValue) {
  return axios.patch(`https://news-api-f5ap.onrender.com/api/articles/${id}`, {
    inc_votes: voteValue,
  });
}

export function createNewComment(id, comment, user) {
  return axios.post(
    `https://news-api-f5ap.onrender.com/api/articles/${id}/comments`,
    { body: comment, username: user }
  );
}

export function deleteCommentById(id) {
  return axios.delete(`https://news-api-f5ap.onrender.com/api/comments/${id}`);
}
