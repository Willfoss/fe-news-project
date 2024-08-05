import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://be-news-project-p4dz.onrender.com/api",
});

export function getArticles() {
  return ncNewsApi.get("/articles");
}

export function getArticleById(article_id) {
  return ncNewsApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
}

export function getCommentsByArticleId(article_id) {
  return ncNewsApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data;
  });
}

export function patchCommentByCommentId(comment_id, votes) {
  return ncNewsApi.patch(`/comments/${comment_id}`, { inc_votes: votes }).then(({ data }) => {
    return data;
  });
}

export function patchArticleByarticleId(article_id, votes) {
  return ncNewsApi.patch(`/articles/${article_id}`, { inc_votes: votes }).then(({ data }) => {
    return data;
  });
}
