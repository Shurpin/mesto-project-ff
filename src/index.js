import "../src/pages/index.css";
import "./scripts/cards.js";
import "./scripts/validation.js";
import "./scripts/utils/constants.js";
// import { initialCards } from "./scripts/cards.js";
import { createCard } from "./scripts/card.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import { openPopup, closePopup } from "./scripts/modal.js";
import {
  editProfile,
  getInitialCards,
  getUserInfo,
  addCard,
  changeAvatar,
  addLike,
  removeLike,
  deleteCard,
} from "./scripts/api.js";

import {
  profileImageAvatar,
  popupEditAvatar,
  formEditAvatar,
  avatarAddLink,
  avatarSubmitButton,
  profileForm,
  nameInput,
  jobInput,
  profileSubmitButton,
  profileTitle,
  profileDescription,
  sectionCard,
  cardContainer,
  profileEditButton,
  profilePopup,
  profileAddButton,
  popupTypeNewCard,
  popupImageWrapper,
  popupCloseImage,
  popupImage,
  popupCaption,
  popups,
  formEditNewPlace,
  cardAddName,
  cardAddLink,
  SubmitButtonNewPlace,
  validationConfig,
} from "./scripts/utils/constants.js";

let ownerId = "";

function getCardData(result) {
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
function zoomImageOut({ listItem }) {
  popupImage.src = listItem.link;
  popupImage.alt = listItem.name;
  popupCaption.textContent = listItem.name;
  openPopup(popupImageWrapper);
}

function likeCard(likesCounter, cardLikeButton, { listItem }) {
  if (cardLikeButton.className.includes("card__like-button_is-active")) {
    removeLike(listItem._id).then(function (result) {
      likesCounter.textContent = result.likes.length;
      cardLikeButton.classList.remove("card__like-button_is-active");
    });
  } else {
    addLike(listItem._id)
      .then(function (result) {
        likesCounter.textContent = result.likes.length;
        cardLikeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  }
}

function removeCard(cardElement, { listItem }) {
  deleteCard(listItem._id)
    .then(function (result) {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

// Создаем новую карточку и закрываем попап
function createAndCloseCard(result) {
  const item = getCardData(result);
  const newCard = createCard({
    item,
    zoomImageOut,
    likeCard,
    removeCard,
  });
  closePopup(popupTypeNewCard);
  return newCard;
}

// имитируем сабмит
function handleEditNewCardSubmit() {
  // evt.preventDefault();
  const submitData = { name: cardAddName.value, link: cardAddLink.value };
  // const initialText = submitButton.textContent;

  renderLoading(true, SubmitButtonNewPlace);
  addCard(submitData)
    .then(function (result) {
      const newCard = createAndCloseCard(result);
      cardContainer.prepend(newCard);
      formEditNewPlace.reset();
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      renderLoading(false, SubmitButtonNewPlace);
    });
}

function handleEditProfileSubmit() {
  const submitData = { name: nameInput.value, about: jobInput.value };
  renderLoading(true, profileSubmitButton);
  editProfile(submitData)
    .then(function (result) {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;

      closePopup(profilePopup);
      profileForm.reset();
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      renderLoading(false, profileSubmitButton); 
    });
}

function handleEditAvatar() {
  const submitData = avatarAddLink.value;
  renderLoading(true, avatarSubmitButton);
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
      renderLoading(false, avatarSubmitButton); 
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
popups.forEach((item) => {
  item.classList.add("popup_is-animated");
});

// Подписываемся на события сабмит
profileForm.addEventListener("submit", handleEditProfileSubmit);
formEditNewPlace.addEventListener("submit", handleEditNewCardSubmit);
formEditAvatar.addEventListener("submit", handleEditAvatar);

// Подписываемся на клик по аватарке
profileImageAvatar.addEventListener("click", function () {
  openPopup(popupEditAvatar);
});

// подписываемся на клик "Редактировать"
profileEditButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(profilePopup);
  clearValidation(profileForm, validationConfig);
});

//подписываемся на клик по "+"
profileAddButton.addEventListener("click", function () {
  openPopup(popupTypeNewCard);
});

//вешаю слушатель с событием клик на кнопку с классом  popup__close
profilePopup
  .querySelector(".popup__close")
  .addEventListener("click", function () {
    closePopup(profilePopup);
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
popupEditAvatar
  .querySelector(".popup__close")
  .addEventListener("click", function () {
    closePopup(popupEditAvatar);
  });

// валидация форм
enableValidation(validationConfig);

Promise.all([getInitialCards(), getUserInfo()])
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
        likeCard,
        removeCard,
      });
      cardContainer.append(newCardElement);
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

function renderLoading(isLoading, buttonElement) {
    // const textButton = modalElement.querySelector(".popup__button");
    // buttonElement.textContent = "Сохранить";

  if (isLoading) {
    // добавил кнопке текст загрузки
    buttonElement.textContent = "Сохранение...";
  } else {
    // добавил кнопке попапа текст
    buttonElement.textContent = "Сохранить";
  }
}
