// @todo: Темплейт карточки

// @todo: DOM узлы
const container = document.querySelector('.places'); 
const cardContainer = container.querySelector('.places__list');

// @todo: Функция удаления карточки
function removeCard(cardElement) {
  cardElement.remove();
};

// @todo: Функция создания карточки
function createCard(listItem, hanldeDelete) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = listItem.link;
  cardElement.querySelector('.card__image').alt = listItem.name;
  cardElement.querySelector('.card__title').textContent = listItem.name;
 
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
    hanldeDelete(cardElement);
  }); 
  return cardElement;
 }

// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
  const newCardElement = createCard(item, removeCard);
  cardContainer.append(newCardElement);
});

