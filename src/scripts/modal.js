
export function closePopup(modalElement) {
  if (modalElement) {
    modalElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeEsс);
    modalElement.removeEventListener("click", closeOverlay);
  }
}

// Открытие попапа
export function openPopup(modalElement) {
  modalElement.classList.add("popup_is-opened");
  // слушатели закрытия попапа
  document.addEventListener("keydown", closeEsс);
  modalElement.addEventListener("click", closeOverlay);
}

// Дополнительные общие функции
function closeEsс(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}

function closeOverlay(evt) {
  // const activePopup = document.querySelector(".popup_is-opened");
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}
