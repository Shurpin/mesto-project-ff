(()=>{"use strict";function e(e){e&&(e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n),document.removeEventListener("click",r))}function t(e){e.classList.add("popup_is-opened");var t=e.querySelector(".popup__button");t&&(t.textContent="Сохранить"),document.addEventListener("keydown",n),e.addEventListener("click",r)}function n(t){"Escape"===t.key&&e(document.querySelector(".popup_is-opened"))}function r(t){var n=document.querySelector(".popup_is-opened");t.target===n&&e(document.querySelector(".popup_is-opened"))}var o={baseUrl:"https://nomoreparties.co/v1/wff-cohort-11",headers:{authorization:"65b3294f-e4ac-40f0-8936-5807289b7be3","Content-Type":"application/json"}},c=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},i=function(e){return fetch("".concat(o.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:o.headers}).then(c)},u=function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:o.headers}).then(c)},a=function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:o.headers}).then(c)};function l(e){var n,r=e.item,o=e.zoomImageOut,c=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),l=c.querySelector(".card__image"),s=c.querySelector(".card__delete-button"),p=c.querySelector(".card__like-button"),d=c.querySelector(".likes-number");return l.src=r.link,l.alt=r.name,c.querySelector(".card__title").textContent=r.name,d.textContent=null===(n=r.likes)||void 0===n?void 0:n.length,r.isMe&&c.querySelector(".card__delete-button__hiden").classList.remove("card__delete-button__hiden"),r.isMyLikes&&p.classList.add("card__like-button_is-active"),p.addEventListener("click",(function(){this.className.includes("card__like-button_is-active")?a(r._id).then((function(e){d.textContent="",d.textContent=e.likes.length,p.classList.remove("card__like-button_is-active")})):u(r._id).then((function(e){d.textContent=e.likes.length,p.classList.add("card__like-button_is-active")}))})),s.addEventListener("click",(function(){i(r._id),c.remove()})),l.addEventListener("click",(function(){return o({listItem:r,openPopup:t})})),c}var s=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.textContent=""},p=function(e){return e.some((function(e){return!e.validity.valid}))};function d(e,t,n){p(e)?(t.classList.add(n),t.disabled=!0,t.value="Disabled"):(t.classList.remove(n),t.disabled=!1,t.value="Enabled")}function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function _(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?_(Object(n),!0).forEach((function(t){var r,o,c,i;r=e,o=t,c=n[t],i=function(e,t){if("object"!=f(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=f(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o),(o="symbol"==f(i)?i:i+"")in r?Object.defineProperty(r,o,{value:c,enumerable:!0,configurable:!0,writable:!0}):r[o]=c})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):_(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var v=document.querySelector(".avatar_image"),b=document.querySelector(".popup_type_avatar"),h=document.querySelector(".popup__avatar"),S=h.querySelector(".popup__avatar_type_url"),q=h.querySelector(".popup__button"),k=document.querySelector(".popup__form"),E=k.querySelector(".popup__input_type_name"),L=k.querySelector(".popup__input_type_description"),g=k.querySelector(".popup__button"),C=document.querySelector(".profile__title"),O=document.querySelector(".profile__description"),j=document.querySelector(".places").querySelector(".places__list"),w=document.querySelector(".profile__edit-button"),P=document.querySelector(".popup_type_edit"),x=document.querySelector(".profile__add-button"),A=document.querySelector(".popup_type_new-card"),U=document.querySelector(".popup_type_image"),M=U.querySelector(".popup__close"),D=U.querySelector(".popup__image"),T=U.querySelector(".popup__caption"),I=document.querySelectorAll(".popup"),B=document.querySelector(".popup__forms"),N=document.querySelector(".popup__input_type_card-name"),z=document.querySelector(".popup__input_type_url"),J=B.querySelector(".popup__button"),H=document.querySelector(".popup__form"),V={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},$="";function F(e){var t=e.listItem,n=e.openPopup;D.src=t.link,D.alt=t.name,T.textContent=t.name,n(U)}function G(t,n){t.preventDefault();var r,i,u,a={name:N.value,link:z.value};K(!0,n),(r=a,i=r.name,u=r.link,fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify({name:i,link:u})}).then(c)).then((function(t){var n=function(t){var n=function(e){return{name:N.value,link:z.value,_id:e._id,likes:e.likes,isMe:e.owner._id===$,isMyLikes:!1}}(t),r=l({item:n,zoomImageOut:F});return e(A),r}(t);j.prepend(n),B.reset()})).catch((function(e){console.log(e)})).finally((function(){K(!1,n)}))}function K(e,t){t.textContent=e?"Сохранение...":""}I.forEach((function(e){e.classList.add("popup_is-animated")})),k.addEventListener("submit",(function(t){return n=g,a={name:E.value,about:L.value},K(!0,n),void(r=a,i=r.name,u=r.about,fetch("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify({name:i,about:u})}).then(c)).then((function(t){C.textContent=t.name,O.textContent=t.about,e(P),E.value="",L.value="",k.reset()})).catch((function(e){console.log(e)})).finally((function(){K(!1,n)}));var n,r,i,u,a})),B.addEventListener("submit",(function(e){return G(e,J)})),h.addEventListener("submit",(function(t){return n=q,i=S.value,K(!0,n),void(r=i,fetch("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify({avatar:r})}).then(c)).then((function(t){v.src=t.avatar,e(b),h.reset()})).catch((function(e){console.log(e)})).finally((function(){K(!1,n)}));var n,r,i})),v.addEventListener("click",(function(){t(b)})),w.addEventListener("click",(function(){P.classList.contains("popup_type_edit")&&(E.value=C.textContent,L.value=O.textContent),t(P)})),x.addEventListener("click",(function(){t(A)})),P.querySelector(".popup__close").addEventListener("click",(function(){e(P)})),M.addEventListener("click",(function(){e(U)})),A.querySelector(".popup__close").addEventListener("click",(function(){e(A)})),b.querySelector(".popup__close").addEventListener("click",(function(){e(b)})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){s(e,n,t)})),d(n,r,t.inactiveButtonClass)}(H,V),function(e){document.querySelectorAll(e.formSelector).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);d(n,r,t.inactiveButtonClass),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),d(n,r,t.inactiveButtonClass)}))}))}(t,e)}))}(V),Promise.all([fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers}).then(c),fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers}).then(c)]).then((function(e){var t,n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,i,u=[],a=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);a=!0);}catch(e){l=!0,o=e}finally{try{if(!a&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(l)throw o}}return u}}(n,r)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],i=o[1];$=i._id,t=i,C.textContent=t.name,O.textContent=t.about,v.src=t.avatar,v.alt=t.name,c.map((function(e){return m(m({},e),{},{isMe:e.owner._id===i._id,isMyLikes:e.likes.some((function(e){return e._id===i._id}))})})).forEach((function(e){var t=l({item:e,zoomImageOut:F});j.append(t)}))})).catch((function(e){console.log(e)}))})();