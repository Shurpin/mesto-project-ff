// фото профайла - аватар
export const profileImageAvatar = document.querySelector(".avatar_image");
export const popupEditAvatar = document.querySelector(".popup_type_avatar");
export const formEditAvatar = document.querySelector(".popup__avatar");
export const avatarAddLink = formEditAvatar.querySelector(".popup__avatar_type_url");
// индикация процесса загрузки аватар
export const avatarSubmitButton = formEditAvatar.querySelector(".popup__button");

// profile
export const profileForm = document.querySelector(".popup__form");
// export const profileForm = document.forms["profile-form"];
export const nameInput = profileForm.querySelector(".popup__input_type_name");
export const jobInput = profileForm.querySelector(".popup__input_type_description");
// индикация процесса загрузки profile
export const profileSubmitButton = profileForm.querySelector(".popup__button");

// header profile
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");

// контейнер для карточек
export const sectionCard = document.querySelector(".places");
export const cardContainer = sectionCard.querySelector(".places__list");

// классы для открытия/закрытия popupa "Редактировать"
export const profileEditButton = document.querySelector(".profile__edit-button");
export const profilePopup = document.querySelector(".popup_type_edit");

// классы для открытия popapa добавить карточку "+"
export const profileAddButton = document.querySelector(".profile__add-button");
export const popupTypeNewCard = document.querySelector(".popup_type_new-card");

// классы для popapa "image"
export const popupImageWrapper = document.querySelector(".popup_type_image");
export const popupCloseImage = popupImageWrapper.querySelector(".popup__close");
export const popupImage = popupImageWrapper.querySelector(".popup__image");
export const popupCaption = popupImageWrapper.querySelector(".popup__caption");

// класс для анимации попапов
export const popups = document.querySelectorAll(".popup");

// классы для открытия/закрытия popupa добавить карточку "+"
export const formEditNewPlace = document.querySelector(".popup__forms");
export const cardAddName = document.querySelector(".popup__input_type_card-name");
export const cardAddLink = document.querySelector(".popup__input_type_url");
// индикация процесса загрузки
export const submitButtonNewPlace = formEditNewPlace.querySelector(".popup__button");

//validation config
// export const form = document.querySelector(".popup__form");
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};


