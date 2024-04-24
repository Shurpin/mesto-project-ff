//показывает элемент ошибки;
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

//скрывает элемент ошибки;
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    // данные атрибута доступны у элемента инпута через ключевое слово dataset.
    // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
    // HTML мы писали в kebab-case, это не опечатка)
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
    });
  });
};

const enableValidation = (validationConfig) => {
  const forms = document.querySelectorAll(validationConfig.formSelector);
  console.log('forms', forms);
  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    //const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));

    //formList.forEach((fieldSet) => {
      setEventListeners(formElement, validationConfig);
   // });
  });
};
// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(inactiveButtonClass);
    //buttonElement.classList.add("button_inactive");
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(inactiveButtonClass);
  }
}
// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

