export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// @todo: Функция удаления карточки
export function removeCard(cardElement) {
  cardElement.remove();
}

// @todo: Функция создания карточки
export function createCard(
  listItem,
  hanldeDelete,
  openPopupImage,
  closelistPopupImage
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__image").src = listItem.link;
  cardElement.querySelector(".card__image").alt = listItem.name;
  cardElement.querySelector(".card__title").textContent = listItem.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    hanldeDelete(cardElement);
  });

  const addPopupImage = document.querySelector(".popup_type_image");

  const activePopupImage = cardElement.querySelector(".card__image");
  activePopupImage.addEventListener("click", function () {
    addPopupImage.classList.add("popup_is-animated");
    openPopupImage(addPopupImage, listItem.link);
  });

  const closePopupImage = addPopupImage.querySelector(".popup__close");
  closePopupImage.addEventListener("click", function () {
    closelistPopupImage(addPopupImage);
  });

  return cardElement;
}

const placeList = document.querySelector(".places__list");

placeList.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active"); 
  }
});
