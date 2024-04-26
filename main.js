(()=>{"use strict";function e(e){e&&(e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n),document.removeEventListener("click",o))}function t(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n),e.addEventListener("click",o)}function n(t){"Escape"===t.key&&e(document.querySelector(".popup_is-opened"))}function o(t){var n=document.querySelector(".popup_is-opened");t.target===n&&e(document.querySelector(".popup_is-opened"))}function r(e){e.target.classList.toggle("card__like-button_is-active")}function c(e){var n=e.item,o=e.zoomImageOut,c=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),u=c.querySelector(".card__image"),i=c.querySelector(".card__delete-button"),p=c.querySelector(".card__like-button");return u.src=n.link,u.alt=n.name,c.querySelector(".card__title").textContent=n.name,p.addEventListener("click",r),i.addEventListener("click",(function(){c.remove()})),u.addEventListener("click",(function(){return o({listItem:n,openPopup:t})})),c}var u=function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.textContent=""},i=function(e){return e.some((function(e){return!e.validity.valid}))};function p(e,t,n){i(e)?t.classList.add(n):t.classList.remove(n)}var a=document.querySelector(".popup__form"),s=a.querySelector(".popup__input_type_name"),l=a.querySelector(".popup__input_type_description"),d=document.querySelector(".profile__title"),_=document.querySelector(".profile__description"),m=document.querySelector(".places").querySelector(".places__list"),y=document.querySelector(".profile__edit-button"),v=document.querySelector(".popup_type_edit"),f=document.querySelector(".profile__add-button"),S=document.querySelector(".popup_type_new-card"),q=document.querySelector(".popup_type_image"),k=q.querySelector(".popup__close"),L=q.querySelector(".popup__image"),E=q.querySelector(".popup__caption"),g=document.querySelectorAll(".popup"),C=document.querySelector(".popup__forms"),b=document.querySelector(".popup__input_type_card-name"),h=document.querySelector(".popup__input_type_url");function x(e){var t=e.listItem,n=e.openPopup;L.src=t.link,L.alt=t.name,E.textContent=t.name,n(q)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var t=c({item:e,zoomImageOut:x});m.append(t)})),g.forEach((function(e){e.classList.add("popup_is-animated")})),a.addEventListener("submit",(function(t){t.preventDefault(),d.textContent=s.value,_.textContent=l.value,e(v),s.value="",l.value="",a.reset()})),C.addEventListener("submit",(function(t){t.preventDefault();var n=function(){var t=c({item:{name:b.value,link:h.value},zoomImageOut:x});return e(S),t}();m.prepend(n),C.reset()})),y.addEventListener("click",(function(){v.classList.contains("popup_type_edit")&&(s.value=d.textContent,l.value=_.textContent),t(v)})),f.addEventListener("click",(function(){t(S)})),v.querySelector(".popup__close").addEventListener("click",(function(){e(v)})),k.addEventListener("click",(function(){e(q)})),S.querySelector(".popup__close").addEventListener("click",(function(){e(S)}));var B={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){u(e,n,t)})),p(n,o,t.inactiveButtonClass)}(document.querySelector(".popup__form"),B),function(e){document.querySelectorAll(e.formSelector).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);p(n,o,t.inactiveButtonClass),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?u(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,r,t),p(n,o,t.inactiveButtonClass)}))}))}(t,e)}))}(B)})();