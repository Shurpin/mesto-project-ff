import { deleteCard, addLike, removeLike } from "./api.js";
const cardTemplate = document.querySelector("#card-template").content;

export function likeCard(likesCounter, cardLikeButton, { listItem }) {
  if (cardLikeButton.className.includes("card__like-button_is-active")) {
    removeLike(listItem._id).then(function (result) {
      likesCounter.textContent = result.likes.length;
      cardLikeButton.classList.remove("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
  } else {
    addLike(listItem._id)
      .then(function (result) {
        likesCounter.textContent = result.likes.length;
        cardLikeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  }
}

export function removeCard(cardElement, { listItem }) {
  deleteCard(listItem._id)
    .then(function (result) {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

// @todo: Функция создания карточки
export function createCard({ item, zoomImageOut, likeCard, removeCard }) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  const likesCounter = cardElement.querySelector(".likes-number");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;

  // пока данные с сервера не обновились поставил дефолтное значение лайков
  likesCounter.textContent = item.likes?.length;

  //убрал из своих карточек класс который прячет кнопку удаления карточек
  if (item.isMe) {
    deleteButton.classList.remove("card__delete-button__hiden");
  }

  // окрашиваем мои лайки
  if (item.isMyLikes) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  // отправляем лайк карточки на сервер и окрашиваем его
  cardLikeButton.addEventListener("click", () =>
    likeCard(likesCounter, cardLikeButton, { listItem: item })
  );

  deleteButton.addEventListener("click", () =>
    removeCard(cardElement, { listItem: item })
  );

  cardImage.addEventListener("click", () => zoomImageOut({ listItem: item }));
  return cardElement;
}
