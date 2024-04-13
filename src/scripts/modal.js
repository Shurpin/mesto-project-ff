// import { createCard, removeCard } from "./card.js";
import { nameInput, jobInput, profileTitle, profileDescription } from "../index.js";

// общий код
// Закрытие попапа
export function closePopup(modalElement) {
  if (modalElement) {
    modalElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeEsс);
    document.removeEventListener("click", closeOverlay);
    // if (modalElement.classList.contains("popup_type_edit")) {
    //   nameInput.value = '';
    //   jobInput.value = '';
    // }
  }
}

// Открытие попапа
export function openPopup(innerPopup, link) {
  innerPopup.classList.add("popup_is-opened");

  document.addEventListener("keydown", closeEsс);
  const popup = document.querySelector(".popup_is-opened");
  popup.addEventListener("click", closeOverlay);
  if (innerPopup.classList.contains("popup_type_edit")) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  }
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