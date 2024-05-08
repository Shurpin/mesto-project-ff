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
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  // const cardLikeButtontwo = cardLikeButton.querySelector(
  //   ".card__like-button_is-active"
  // );
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

  // окрашиваем мои лайки
  if (item.isMyLikes) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  // отправляем лайк карточки на сервер и окрашиваем его
  cardLikeButton.addEventListener("click", function () {
    // console.log(evt)
    if (this.className.includes("card__like-button_is-active")) {
      removeLike(item._id).then(function (result) {
        likeLengthNumber.textContent = "";
        likeLengthNumber.textContent = result.likes.length;
        cardLikeButton.classList.remove("card__like-button_is-active");
      });
    } else {
      sendLike(item._id).then(function (result) {
        likeLengthNumber.textContent = result.likes.length;
        cardLikeButton.classList.add("card__like-button_is-active");
      });
    }
  });

  // // удаляем лайк с сервера
  // cardLikeButton.addEventListener("click", function () {
  //   if (item.isMyLikes) {
  //     removeLike(item._id).then(function (result) {
  //       likeLengthNumber.textContent = "";
  //       likeLengthNumber.textContent = result.likes.length;
  //       cardLikeButton.classList.toggle("card__like-button_is-active");
  //     });
  //   }
  // });

  deleteButton.addEventListener("click", function () {
    deleteCard(item._id);
    cardElement.remove();
  });

  activePopupImage.addEventListener("click", () =>
    zoomImageOut({ listItem: item, openPopup })
  );
  return cardElement;
}
