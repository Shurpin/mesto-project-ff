// @todo: Темплейт карточки

// @todo: DOM узлы
const container = document.querySelector('.places'); 
const cardContainer = container.querySelector('.places__list');
// @todo: Функция создания карточки
function addcard() {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg";
  cardElement.querySelector('.card__title').textContent = 'titleValue';
  cardContainer.append(cardElement);
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
addcard();




