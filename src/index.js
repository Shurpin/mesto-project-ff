import "../src/pages/index.css";
import "./scripts/cards.js";
import { initialCards } from "./scripts/cards.js";
import { createCard, removeCard } from "./scripts/card.js";
import { openPopup, closePopup } from "./scripts/modal.js";
// @todo: DOM узлы
  // Кэшируем элементы DOM
// profile
const editProfileForm = document.querySelector(".popup__form");
export const nameInput = editProfileForm.querySelector(".popup__input_type_name");
export const jobInput = editProfileForm.querySelector(".popup__input_type_description");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");
const animatedPopups = document.querySelectorAll(".popup");
//  console.log(animatedPopups);
// const animatedPopupsArray = Array.from(animatedPopups);
animatedPopups.forEach((item) => {
  item.classList.add("popup_is-animated");
}); 

const sectionCard = document.querySelector(".places");
const cardContainer = sectionCard.querySelector(".places__list");

//нашел в DOM классы для создания/удаления popupa "Редактировать"
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
// const animatedPopups = document.querySelector(".popup");
// animatedPopups.classList.add("popup_is-animated");

//нашел в DOM классы для popapa "+"
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");

// нашел в DOM классы для popapa "image"
export const addPopupImage = document.querySelector(".popup_type_image");
const closePopupImage = addPopupImage.querySelector(".popup__close");
export const popupImage = addPopupImage.querySelector(".popup__image");

//вызов функции создания/удаление карточек/попа
initialCards.forEach(function (item) {
  const newCardElement = createCard(item, removeCard, openPopup, addPopupImage);
  cardContainer.append(newCardElement);
  // addLikeListener();
});

//вызов функции открытия попа "Редактировать" и анимация
profileEditButton.addEventListener("click", function () {
  openPopup(popupTypeEdit);
});

//нашел в DOM классы для popapa "+" и анимация
profileAddButton.addEventListener("click", function () {
  openPopup(popupTypeNewCard);
});

//вешаю слушатель с событием клик на кнопку с классом  popup__close
//в попапе "Редактировать" с классом profile__edit-button и вызываю функцию закрытия попа
popupTypeEdit
  .querySelector(".popup__close")
  .addEventListener("click", function () {
    closePopup(popupTypeEdit);
  });

closePopupImage.addEventListener("click", function () {
  closePopup(addPopupImage);
});

//вешаю слушатель с событием клик на кнопку с классом  popup__close
//в попапе "+" с классом popup_type_new-card и вызываю функцию закрытия попа closePopup
popupTypeNewCard
  .querySelector(".popup__close")
  .addEventListener("click", function () {
    closePopup(popupTypeNewCard);
  });

// Обработчики событий
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupTypeEdit);
  popupTypeEdit.classList.contains("popup_type_edit")
    nameInput.value = '';
    jobInput.value = '';
  editProfileForm.reset();
}

// place
const editNewPlaceForm = document.querySelector(".popup__forms");

function getFormValues() {
  return {
    name: document.querySelector(".popup__input_type_card-name").value,
    link: document.querySelector(".popup__input_type_url").value
  };
}
// Создаем новую карточку и закрываем попап
function createAndCloseCard() {
  const values = getFormValues()
  const newCard = createCard(values, removeCard, openPopup, addPopupImage);
  closePopup(popupTypeNewCard);
  return newCard;
}

function handleEditNewCardSubmit(evt) {
  evt.preventDefault();
  const newCard = createAndCloseCard();
  const container = document.querySelector(".places__list");
  container.prepend(newCard);
  editNewPlaceForm.reset();
}

// Подписываемся на события
editProfileForm.addEventListener("submit", handleEditProfileSubmit);
editNewPlaceForm.addEventListener("submit", handleEditNewCardSubmit);