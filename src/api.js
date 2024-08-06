import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://be-news-project-p4dz.onrender.com/api",
});

export function getArticles(topic) {
  const queries = {
    params: {
      topic: topic,
    },
  };
  return ncNewsApi.get("/articles", queries);
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

export function postCommentByArticleId(article_id, body, username) {
  return ncNewsApi.post(`/articles/${article_id}/comments`, { body: body, username: username }).then(({ data }) => {
    return data;
  });
}

export function deleteCommentByArticleId(comment_id) {
  return ncNewsApi.delete(`/comments/${comment_id}`).then(({ data }) => {
    return data;
  });
}

export function getTopics() {
  return ncNewsApi.get(`/topics`).then(({ data }) => {
    return data;
  });
}
