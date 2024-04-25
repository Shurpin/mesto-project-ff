import "../src/pages/index.css";
import "./scripts/cards.js";
import "./scripts/validation.js";
import { initialCards } from "./scripts/cards.js";
import { createCard } from "./scripts/card.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import { openPopup, closePopup } from "./scripts/modal.js";
// @todo: DOM узлы
// Кэшируем элементы DOM
// profile
const formFillInput = document.querySelector(".popup__form");
const nameInput = formFillInput.querySelector(".popup__input_type_name");
const jobInput = formFillInput.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const sectionCard = document.querySelector(".places");
const cardContainer = sectionCard.querySelector(".places__list");

//нашел в DOM классы для создания/удаления popupa "Редактировать"
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");

//нашел в DOM классы для popapa "+"
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");

// нашел в DOM классы для popapa "image"
const popupImageWrapper = document.querySelector(".popup_type_image");
const popupCloseImage = popupImageWrapper.querySelector(".popup__close");
const popupImage = popupImageWrapper.querySelector(".popup__image");
const popupCaption = popupImageWrapper.querySelector('.popup__caption')

const animatedPopups = document.querySelectorAll(".popup");

// place
const FormEditNewPlace = document.querySelector(".popup__forms");
const cardAddName = document.querySelector(".popup__input_type_card-name");
const cardAddLink = document.querySelector(".popup__input_type_url");


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


function getFormValues() {
  return {
    name: cardAddName.value,
    link: cardAddLink.value,
  };
}

// слушатели
function zoomImageOut({
  listItem,
  openPopup, 
}) {
    popupImage.src = listItem.link;
    popupImage.alt = listItem.name;
    popupCaption.textContent = listItem.name;
    openPopup(popupImageWrapper);
}

// Создаем новую карточку и закрываем попап
function createAndCloseCard() {
  const item = getFormValues();
  const newCard = createCard({
    item,
    zoomImageOut,
  });
  closePopup(popupTypeNewCard);
  return newCard;
}

// имитируем сабмит
function handleEditNewCardSubmit(evt) {
  evt.preventDefault();
  const newCard = createAndCloseCard();
  cardContainer.prepend(newCard);
  FormEditNewPlace.reset();
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupTypeEdit);
  nameInput.value = "";
  jobInput.value = "";
  formFillInput.reset();
}

//вызов функции создания карточек
initialCards.forEach(function (item) {
  const newCardElement = createCard({
    item,
    zoomImageOut,
  });
  cardContainer.append(newCardElement);
});

// добавляем класс анимации
animatedPopups.forEach((item) => {
  item.classList.add("popup_is-animated");
});

// Подписываемся на события сабмит
formFillInput.addEventListener("submit", handleEditProfileSubmit);
FormEditNewPlace.addEventListener("submit", handleEditNewCardSubmit);

// подписываемся на клик "Редактировать"
profileEditButton.addEventListener("click", function () {
  if (popupTypeEdit.classList.contains("popup_type_edit")) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  }
  openPopup(popupTypeEdit);
  //clearValidation(formFillInput, validationConfig);
});

//подписываемся на клик по "+"
profileAddButton.addEventListener("click", function () {
  openPopup(popupTypeNewCard);
});

//вешаю слушатель с событием клик на кнопку с классом  popup__close
popupTypeEdit.querySelector(".popup__close").addEventListener("click", function () {
    closePopup(popupTypeEdit);
  });
//вешаю слушатель с событием клик на кнопку popup__close_image
popupCloseImage.addEventListener("click", function () {
  closePopup(popupImageWrapper);
});

//вешаю слушатель с событием клик на кнопку с классом  popup__close
//в попапе "+" с классом popup_type_new-card и вызываю функцию закрытия попа closePopup
popupTypeNewCard.querySelector(".popup__close").addEventListener("click", function () {
  clearValidation(formFillInput, validationConfig);
    closePopup(popupTypeNewCard);
  });

  // const inputList = Array.from(document.querySelectorAll('.popup__input'));
  // clearValidation(inputList, enableValidation);
  
  enableValidation(validationConfig); 
  