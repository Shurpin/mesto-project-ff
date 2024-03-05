// @todo: Темплейт карточки

// @todo: DOM узлы
const container = document.querySelector('.places'); 
const cardContainer = container.querySelector('.places__list');
// @todo: Функция создания карточки
function addcard(listItem) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = listItem.link;
  cardElement.querySelector('.card__title').textContent = listItem.name;
  cardContainer.append(cardElement);
 }

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
  addcard(item);
});

const resetButton = container.querySelector('.card__delete-button');

resetButton.addEventListener('click', function () {
  const cardRemove = document.querySelector('.card')
  cardRemove.remove();
  for (let i = 0; i < cardRemove.length; i++) {
    cardRemove[i].remove();
  }
});

