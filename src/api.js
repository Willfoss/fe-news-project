import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://be-news-project-p4dz.onrender.com/api",
});

export function getArticles(topic, sortBy, order, page, limit) {
  console.log(topic);
  const queries = {
    params: {
      topic: topic,
      sort_by: sortBy,
      order: order,
      page: page,
      limit: limit,
    },
  };
  return ncNewsApi.get("/articles", queries);
}

export function getArticleById(article_id) {
  return ncNewsApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
}

export function getCommentsByArticleId(article_id, page, limit) {
  const queries = {
    params: {
      page: page,
      limit: limit,
    },
  };
  return ncNewsApi.get(`/articles/${article_id}/comments`, queries).then(({ data }) => {
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

export function getUsers() {
  return ncNewsApi.get(`/users`).then(({ data }) => {
    return data;
  });
}

export function getUserByUsername(username) {
  return ncNewsApi.get(`/users/${username}`).then(({ data }) => {
    return data;
  });
}

export function postUser(username, name, url) {
  return ncNewsApi.post(`/users`, { username: username, name: name, avatar_url: url }).then(({ data }) => {
    return data;
  });
}

export function getUserArticles(author) {
  const queries = {
    params: {
      author: author,
      order: "DESC",
    },
  };
  return ncNewsApi.get("/articles", queries);
}

export function postArticle(author, title, body, url, topic) {
  return ncNewsApi.post(`/articles`, { author: author, title: title, body: body, url: url, topic: topic }).then(({ data }) => {
    return data;
  });
}
