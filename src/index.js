import "../src/pages/index.css";
import "./scripts/cards.js";
import { initialCards } from "./scripts/cards.js";
import { createCard } from "./scripts/cards.js";
import { removeCard } from "./scripts/cards.js";
import { openPopup } from "./scripts/modal.js";
import { closePopup } from "./scripts/modal.js";
// @todo: DOM узлы
const container = document.querySelector(".places");
const cardContainer = container.querySelector(".places__list");

//нашел в DOM классы для создания/удаления popapa "Редактировать"
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");

//нашел в DOM классы для popapa "+"
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");

//вызов функции создания/удаление карточек/попа
initialCards.forEach(function (item) {
  const newCardElement = createCard(item, removeCard, openPopup, closePopup);
  cardContainer.append(newCardElement);
});

//вызов функции открытия попа "Редактировать"
profileEditButton.addEventListener("click", function () {
  openPopup(popupTypeEdit);
});

//нашел в DOM классы для popapa "+"
profileAddButton.addEventListener("click", function () {
  openPopup(popupTypeNewCard);
});

//вешаю слушатель с событием клик на кнопку с классом  popup__close 
//в попапе "Редактировать" с классом profile__edit-button и вызываю функцию закрытия попа
popupTypeEdit.querySelector(".popup__close").addEventListener("click", function () {
  closePopup(popupTypeEdit);
});

//вешаю слушатель с событием клик на кнопку с классом  popup__close 
//в попапе "+" с классом popup_type_new-card и вызываю функцию закрытия попа closePopup
popupTypeNewCard.querySelector(".popup__close").addEventListener("click", function () {
  closePopup(popupTypeNewCard);
}); 