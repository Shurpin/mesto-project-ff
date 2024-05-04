// общий код
// Закрытие попапа
// import { loadButton } from '../index.js';

export function closePopup(modalElement) {
  if (modalElement) {
    modalElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeEsс);
    document.removeEventListener("click", closeOverlay);
  }
}

// Открытие попапа
export function openPopup(innerPopup) {
  innerPopup.classList.add("popup_is-opened");
  // добавил кнопке попапа текст
  const textButton = innerPopup.querySelector(".popup__button");
  textButton.textContent = "Сохранить";
  // слушатели закрытия попапа
  document.addEventListener("keydown", closeEsс);
  innerPopup.addEventListener("click", closeOverlay);
}

// Дополнительные общие функции
function closeEsс(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}

function closeOverlay(evt) {
  const activePopup = document.querySelector(".popup_is-opened");
  if (evt.target === activePopup) {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}
