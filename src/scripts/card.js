// @todo: Функция удаления карточки
export function removeCard(cardElement) {
  cardElement.remove();
}

 function addLike(evt) {
   evt.target.classList.toggle("card__like-button_is-active"); 
}

export function addLikeListener(cardElement) {
  const cardButton = cardElement.querySelector(".card__like-button");
  if (Boolean(cardButton)) {
  cardButton.addEventListener("click", addLike);
}
}

// @todo: Функция создания карточки
export function createCard(listItem, hanldeDelete, openPopupImage, addPopupImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

  const activePopupImage = cardElement.querySelector(".card__image");
    activePopupImage.src = listItem.link;
    activePopupImage.alt = listItem.name;
  cardElement.querySelector(".card__title").textContent = listItem.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    hanldeDelete(cardElement);
  });
  addLikeListener(cardElement);

  activePopupImage.addEventListener("click", function () {
      popupImage.src = listItem.link;
      popupImage.alt = listItem.name;
    openPopupImage(addPopupImage);
  });
  return cardElement;
}