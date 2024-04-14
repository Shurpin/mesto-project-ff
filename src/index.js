import "../src/pages/index.css";
import "./scripts/cards.js";
import { initialCards } from "./scripts/cards.js";
import { createCard, removeCard } from "./scripts/card.js";
import { openPopup, closePopup } from "./scripts/modal.js";
// @todo: DOM узлы
// Кэшируем элементы DOM
// profile
const formFillInput = document.querySelector(".popup__form");
export const nameInput = formFillInput.querySelector(".popup__input_type_name");
export const jobInput = formFillInput.querySelector(".popup__input_type_description");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");
const animatedPopups = document.querySelectorAll(".popup");

animatedPopups.forEach((item) => {
  item.classList.add("popup_is-animated");
});

const sectionCard = document.querySelector(".places");
const cardContainer = sectionCard.querySelector(".places__list");

//нашел в DOM классы для создания/удаления popupa "Редактировать"
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");

//нашел в DOM классы для popapa "+"
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");

// нашел в DOM классы для popapa "image"
export const PopupAddImage = document.querySelector(".popup_type_image");
const PopupCloseImage = PopupAddImage.querySelector(".popup__close");
export const popupImage = PopupAddImage.querySelector(".popup__image");

//вызов функции создания/удаление карточек/попа
initialCards.forEach(function (item) {
  const newCardElement = createCard(item, removeCard, openPopup, PopupAddImage, popupImage);
  cardContainer.append(newCardElement);
});

//вызов функции открытия попа "Редактировать" и анимация
profileEditButton.addEventListener("click", function () {
  if (popupTypeEdit.classList.contains("popup_type_edit")) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  }
  openPopup(popupTypeEdit);
});

//нашел в DOM классы для popapa "+" и анимация
profileAddButton.addEventListener("click", function () {
  openPopup(popupTypeNewCard);
});

//вешаю слушатель с событием клик на кнопку с классом  popup__close
//в попапе "Редактировать" с классом profile__edit-button и вызываю функцию закрытия попа
popupTypeEdit.querySelector(".popup__close").addEventListener("click", function () {
    closePopup(popupTypeEdit);
  });

PopupCloseImage.addEventListener("click", function () {
  closePopup(PopupAddImage);
});

//вешаю слушатель с событием клик на кнопку с классом  popup__close
//в попапе "+" с классом popup_type_new-card и вызываю функцию закрытия попа closePopup
popupTypeNewCard.querySelector(".popup__close").addEventListener("click", function () {
    closePopup(popupTypeNewCard);
  });

// Обработчики событий
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupTypeEdit);
  nameInput.value = "";
  jobInput.value = "";
  formFillInput.reset();
}

// place
const FormEditNewPlace = document.querySelector(".popup__forms");
const cardAddName = document.querySelector(".popup__input_type_card-name");
const cardAddLink = document.querySelector(".popup__input_type_url");

function getFormValues() {
  return {
    name: cardAddName.value,
    link: cardAddLink.value,
  };
}
// Создаем новую карточку и закрываем попап
function createAndCloseCard() {
  const values = getFormValues();
  const newCard = createCard(values, removeCard, openPopup, PopupAddImage, popupImage);
  closePopup(popupTypeNewCard);
  return newCard;
}

function handleEditNewCardSubmit(evt) {
  evt.preventDefault();
  const newCard = createAndCloseCard();
  cardContainer.prepend(newCard);
  FormEditNewPlace.reset();
}

// Подписываемся на события
formFillInput.addEventListener("submit", handleEditProfileSubmit);
FormEditNewPlace.addEventListener("submit", handleEditNewCardSubmit);
