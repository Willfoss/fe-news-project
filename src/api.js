import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://be-news-project-p4dz.onrender.com/api",
});

export const getArticles = () => {
  return ncNewsApi.get("/articles");
};

export const getArticleById = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getCommentsByArticleId = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data;
  });
};
