import { openPopup } from "./modal";

// @todo: Функция создания карточки
export function createCard({
  item,
  popupImage,
  popupImageWrapper,
  addLikeListener,
  zoomImageOutListener,
  deleteCardListener,
}) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

  const activePopupImage = cardElement.querySelector(".card__image");
  activePopupImage.src = item.link;
  activePopupImage.alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;
  deleteCardListener(cardElement);
  addLikeListener(cardElement);
  zoomImageOutListener({
    listItem: item,
    activePopupImage,
    popupImage,
    popupImageWrapper,
    openPopup, 
  });

  return cardElement;
}