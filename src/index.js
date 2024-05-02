import "../src/pages/index.css";
import "./scripts/cards.js";
import "./scripts/validation.js";
// import { initialCards } from "./scripts/cards.js";
import { createCard } from "./scripts/card.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import { openPopup, closePopup } from "./scripts/modal.js";
import {
  additProfile,
  getInitialCards,
  getNameUser,
  additCard,
} from "./scripts/api.js";
// фото профайла
const profileImage = document.querySelector(".avatar_image");
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
const popupCaption = popupImageWrapper.querySelector(".popup__caption");

const animatedPopups = document.querySelectorAll(".popup");

// place
const formEditNewPlace = document.querySelector(".popup__forms");
const cardAddName = document.querySelector(".popup__input_type_card-name");
const cardAddLink = document.querySelector(".popup__input_type_url");

//validation config
const form = document.querySelector(".popup__form");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function getFormValues() {
  return {
    name: cardAddName.value,
    link: cardAddLink.value,
  };
}

// слушатели
function zoomImageOut({ listItem, openPopup }) {
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
    zoomImageOut
  });
  closePopup(popupTypeNewCard);
  return newCard;
}

// имитируем сабмит
function handleEditNewCardSubmit(evt) {
   evt.preventDefault();
  const submitData = { name: cardAddName.value, link: cardAddLink.value };
  additCard(submitData).then(function (result) {
    const newCard = createAndCloseCard();
    cardContainer.prepend(newCard);
    formEditNewPlace.reset();
  });
}

function handleEditProfileSubmit() {
  const submitData = { name: nameInput.value, about: jobInput.value };
  additProfile(submitData).then(function (result) {
    // result.preventDefault();
    profileTitle.textContent = result.name;
    profileDescription.textContent = result.about;

    closePopup(popupTypeEdit);
    nameInput.value = "";
    jobInput.value = "";
    formFillInput.reset();
  });
}

function handleInitialProfile(result) {
  // result.preventDefault();
  profileTitle.textContent = result.name;
  profileDescription.textContent = result.about;
  profileImage.src = result.avatar;
  profileImage.alt = result.name;
}

// добавляем класс анимации
animatedPopups.forEach((item) => {
  item.classList.add("popup_is-animated");
});

// Подписываемся на события сабмит
formFillInput.addEventListener("submit", handleEditProfileSubmit);
formEditNewPlace.addEventListener("submit", handleEditNewCardSubmit);

// подписываемся на клик "Редактировать"
profileEditButton.addEventListener("click", function () {
  if (popupTypeEdit.classList.contains("popup_type_edit")) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  }
  openPopup(popupTypeEdit);
});

//подписываемся на клик по "+"
profileAddButton.addEventListener("click", function () {
  openPopup(popupTypeNewCard);
});

//вешаю слушатель с событием клик на кнопку с классом  popup__close
popupTypeEdit
  .querySelector(".popup__close")
  .addEventListener("click", function () {
    closePopup(popupTypeEdit);
  });
//вешаю слушатель с событием клик на кнопку popup__close_image
popupCloseImage.addEventListener("click", function () {
  closePopup(popupImageWrapper);
});

//вешаю слушатель с событием клик на кнопку с классом  popup__close
//в попапе "+" с классом popup_type_new-card и вызываю функцию закрытия попа closePopup
popupTypeNewCard
  .querySelector(".popup__close")
  .addEventListener("click", function () {
    closePopup(popupTypeNewCard);
  });

clearValidation(form, validationConfig);
enableValidation(validationConfig);

Promise.all([getInitialCards(), getNameUser()])
  .then(([cardsResponse, userResponse]) => {
    handleInitialProfile(userResponse);
    const mutationCards = cardsResponse.map(function(item) {
      return {
        ...item, 
        isMe: item.owner._id === userResponse._id,
        isMyLikes: item.likes.some(function(like){
         return like._id === userResponse._id
        })
      }
    })
    mutationCards.forEach(function (item) {
      const newCardElement = createCard({
        item,
        zoomImageOut
      });
      cardContainer.append(newCardElement);
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
