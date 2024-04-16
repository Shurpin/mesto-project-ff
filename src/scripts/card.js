import { openPopup } from "./modal";

// лайк
function addLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active"); 
}

// @todo: Функция создания карточки
export function createCard({
  item,
  zoomImageOut,
}) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

  const activePopupImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardButton = cardElement.querySelector(".card__like-button");

  activePopupImage.src = item.link;
  activePopupImage.alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;

  cardButton.addEventListener("click", addLike);
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });
  activePopupImage.addEventListener("click", () => zoomImageOut({listItem: item, openPopup}) );
  return cardElement;
}