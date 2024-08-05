import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://be-news-project-p4dz.onrender.com/api",
});

export const getArticles = () => {
  return ncNewsApi.get("/articles");
};
