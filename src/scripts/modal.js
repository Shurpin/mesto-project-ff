import { createCard, removeCard } from "./cards.js";

// Находим форму в DOM
const formElement = document.querySelector(".popup__form");
const formElements = document.querySelector(".popup__forms");
// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
//находим новые значения для вставки в формы
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
// вставляем новые значения с помощью textContent
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  // Получите значение полей jobInput и nameInput из свойства value
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  const openedPopup = document.querySelector(".popup_is-opened");
  const newCardModal = document.querySelector(".popup");
  if (newCardModal.classList.contains("popup_type_new-card")) {
    const name = document.querySelector(".popup__input_type_card-name");
    const link = document.querySelector(".popup__input_type_url");
    const listItem = { name, link };
    createCard(listItem, removeCard, openPopup, closePopup);
    formElement.reset();
  }
  closePopup(openedPopup);
}

function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  const container = document.querySelector(".places__list");
  const openedPopup = document.querySelector(".popup_is-opened");
  const name = document.querySelector(".popup__input_type_card-name").value;
  const link = document.querySelector(".popup__input_type_url").value;
  const listItem = { name, link };
  const newCard = createCard(listItem, removeCard, openPopup, closePopup);
  formElements.reset();
  container.prepend(newCard);
  closePopup(openedPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);
formElements.addEventListener("submit", handleFormSubmitNewCard);

function closeEsс(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened");
    closePopup(activePopup);
  }
}

function closeOverlay(evt) {
  const activePopup = document.querySelector(".popup_is-opened");
  if (evt.target === activePopup) {
    closePopup(activePopup);
  }
}

export function openPopup(innerPopup, link) {
  innerPopup.classList.add("popup_is-opened");
  if (link) {
    //нашел элемент image в попапе
    const popupImage = innerPopup.querySelector(".popup__image");
    //добавил ссылку в image попап
    popupImage.src = link;
  }
  document.addEventListener("keydown", closeEsс);
  const popup = document.querySelector(".popup_is-opened");
  popup.addEventListener("click", closeOverlay);
}

export function closePopup(modalElement) {
  modalElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEsс);
  document.removeEventListener("click", closeOverlay);
  if (modalElement.classList.contains("popup_type_edit")) {
    // вставляем новые значения с помощью textContent
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  }
}
