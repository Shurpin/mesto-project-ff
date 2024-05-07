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
  changeAvatar,
} from "./scripts/api.js";
// фото профайла - аватар 
const profileImageAvatar = document.querySelector(".avatar_image");
const popupEditAvatar = document.querySelector(".popup_type_avatar");
const formEditAvatar = document.querySelector(".popup__avatar");
const avatarAddLink = formEditAvatar.querySelector(".popup__avatar_type_url");
// индикация процесса загрузки аватар
const loadButton = formEditAvatar.querySelector(".popup__button");

// profile
const formFillInput = document.querySelector(".popup__form");
const nameInput = formFillInput.querySelector(".popup__input_type_name");
const jobInput = formFillInput.querySelector(".popup__input_type_description");
// индикация процесса загрузки profile
const loadButtonFillInput = formFillInput.querySelector(".popup__button");

// header profile
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// контейнер для карточек
const sectionCard = document.querySelector(".places");
const cardContainer = sectionCard.querySelector(".places__list");

// классы для открытия/закрытия popupa "Редактировать"
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");

// классы для открытия popapa добавить карточку "+"
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");

// классы для popapa "image"
const popupImageWrapper = document.querySelector(".popup_type_image");
const popupCloseImage = popupImageWrapper.querySelector(".popup__close");
const popupImage = popupImageWrapper.querySelector(".popup__image");
const popupCaption = popupImageWrapper.querySelector(".popup__caption");

// класс для анимации попапов
const animatedPopups = document.querySelectorAll(".popup");

// классы для открытия/закрытия popupa добавить карточку "+"
const formEditNewPlace = document.querySelector(".popup__forms");
const cardAddName = document.querySelector(".popup__input_type_card-name");
const cardAddLink = document.querySelector(".popup__input_type_url");
// индикация процесса загрузки
const loadButtonNewPlace = formEditNewPlace.querySelector(".popup__button");

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

let ownerId = "";

function getFormValues(result) {
  return {
    name: cardAddName.value,
    link: cardAddLink.value,
    _id: result._id,
    likes: result.likes,
    isMe: result.owner._id === ownerId,
    isMyLikes: false,
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
function createAndCloseCard(result) {
  const item = getFormValues(result);
  const newCard = createCard({
    item,
    zoomImageOut,
  });
  closePopup(popupTypeNewCard);
  return newCard;
}

// имитируем сабмит
function handleEditNewCardSubmit(evt, buttonElement) {
  evt.preventDefault();
  const submitData = { name: cardAddName.value, link: cardAddLink.value };
  renderLoading(true, buttonElement);
  additCard(submitData)
    .then(function (result) {
      const newCard = createAndCloseCard(result);
      cardContainer.prepend(newCard);
      formEditNewPlace.reset();
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      renderLoading(false, buttonElement); // вызовите renderLoading
    });
}

function handleEditProfileSubmit(evt, buttonElement) {
  const submitData = { name: nameInput.value, about: jobInput.value };
  renderLoading(true, buttonElement);
  additProfile(submitData)
    .then(function (result) {
      // result.preventDefault();
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;

      closePopup(popupTypeEdit);
      nameInput.value = "";
      jobInput.value = "";
      formFillInput.reset();
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      renderLoading(false, buttonElement); // вызовите renderLoading
    });
}

function handleEditAvatar(evt, buttonElement) {
  // evt.preventDefault();
  const submitData = avatarAddLink.value;
  renderLoading(true, buttonElement);
  changeAvatar(submitData)
    .then(function (result) {
      profileImageAvatar.src = result.avatar;
      closePopup(popupEditAvatar);
      formEditAvatar.reset();
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      renderLoading(false, buttonElement); // вызовите renderLoading
    });
}

function handleInitialProfile(result) {
  // result.preventDefault();
  profileTitle.textContent = result.name;
  profileDescription.textContent = result.about;
  profileImageAvatar.src = result.avatar;
  profileImageAvatar.alt = result.name;
}

// добавляем класс анимации
animatedPopups.forEach((item) => {
  item.classList.add("popup_is-animated");
});

// Подписываемся на события сабмит
formFillInput.addEventListener("submit", (evt) =>
  handleEditProfileSubmit(evt, loadButtonFillInput)
);
formEditNewPlace.addEventListener("submit", (evt) =>
  handleEditNewCardSubmit(evt, loadButtonNewPlace)
);
formEditAvatar.addEventListener("submit", (evt) =>
  handleEditAvatar(evt, loadButton)
);

// Подписываемся на клик по аватарке
profileImageAvatar.addEventListener("click", function () {
  openPopup(popupEditAvatar);
});

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

  //вешаю слушатель с событием клик на кнопку с классом  popup__close
  popupEditAvatar.querySelector(".popup__close").addEventListener("click", function () {
  closePopup(popupEditAvatar);
});

// валидация форм
clearValidation(form, validationConfig);
enableValidation(validationConfig);

Promise.all([getInitialCards(), getNameUser()])
  .then(([cardsResponse, userResponse]) => {
    ownerId = userResponse._id;
    handleInitialProfile(userResponse);
    const mutationCards = cardsResponse.map(function (item) {
      return {
        ...item,
        isMe: item.owner._id === userResponse._id,
        isMyLikes: item.likes.some(function (like) {
          return like._id === userResponse._id;
        }),
      };
    });
    mutationCards.forEach(function (item) {
      const newCardElement = createCard({
        item,
        zoomImageOut,
      });
      cardContainer.append(newCardElement);
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

function renderLoading(isLoading, buttonElement) {
  if (isLoading) {
    // добавил кнопке текст загрузки
    buttonElement.textContent = "Сохранение...";
  } else {
    // очистил текст кнопки
    buttonElement.textContent = "";
  }
}
