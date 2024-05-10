const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-11",
  headers: {
    authorization: "65b3294f-e4ac-40f0-8936-5807289b7be3",
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json(); //Метод fetch возвращает объект ответа преобразованный через Метод res.json:
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    //отправить запрос на сервер
    headers: config.headers,
  }).then(handleResponse);
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    //отправить запрос на сервер
    headers: config.headers,
  }).then(handleResponse);
};

export const editProfile = ({ name, about }) => {
  return fetch(`${config.baseUrl}/users/me`, {
    //отправить запрос на сервер
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(handleResponse);
};

export const addCard = ({ name, link }) => {
  return fetch(`${config.baseUrl}/cards`, {
    //отправить запрос на сервер
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(handleResponse);
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    //отправить запрос на сервер
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    //отправить запрос на сервер
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse);
};

export const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    //отправить запрос на сервер
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

export const changeAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    //отправить запрос на сервер
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then(handleResponse);
};
