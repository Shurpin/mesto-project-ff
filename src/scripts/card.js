import { openPopup } from "./modal";
import { deleteCard, sendLike, removeLike } from "./api";

// @todo: Функция создания карточки
export function createCard({ item, zoomImageOut }) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const activePopupImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardButton = cardElement.querySelector(".card__like-button");
  const cardButtonTwo = cardElement.querySelector(".card__like-button_is-active");
  const likeLengthNumber = cardElement.querySelector(".likes-number");

  activePopupImage.src = item.link;
  activePopupImage.alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;

  // пока данные с сервера не обновились поставил дефолтное значение лайков
  likeLengthNumber.textContent = item.likes?.length;

  //убрал из своих карточек класс который прячет кнопку удаления карточек
  if (item.isMe) {
    const cardDeleteButtonElement = cardElement.querySelector(
      ".card__delete-button__hiden"
    );
    cardDeleteButtonElement.classList.remove("card__delete-button__hiden");
  }
  // отправляем лайк карточки на сервер и окрашиваем его
  cardButton.addEventListener("click", function () {
    sendLike(item._id);
    cardButton.classList.toggle("card__like-button_is-active");
  });

  // окрашиваем мои лайки
  if (item.isMyLikes) {
    cardButton.classList.toggle("card__like-button_is-active");
  }
  // удаляем лайк с сервера
  cardButton.addEventListener("click", function () {
    if (item.isMyLikes) {
      cardButton.classList.toggle("card__like-button_is-active");
      removeLike(item._id);
      cardButton.classList.remove("card__like-button_is-active");
    }
  });

  deleteButton.addEventListener("click", function () {
    deleteCard(item._id);
    cardElement.remove();
  });

  activePopupImage.addEventListener("click", () =>
    zoomImageOut({ listItem: item, openPopup })
  );
  return cardElement;
}
