export function openPopup(innerPopup, link) {
  innerPopup.classList.add("popup_is-opened");
  if (link) {
    //нашел элемент image в попапе 
    const popupImage = innerPopup.querySelector(".popup__image");
    //добавил ссылку в image попап
    popupImage.src = link;
  } 
}


export function closePopup(close) {
  close.classList.remove("popup_is-opened");
}