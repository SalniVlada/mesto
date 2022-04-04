// Вызов функции, устанавливающей правила валидации формы.
enableValidation ({
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

// Функция устанавливает правила валидации и показывает сообщения об ошибках.
function enableValidation ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  // Выбор всех форм на странице.
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(form => {
    // Выбор всех полей ввода на форме.
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    inputs.forEach(input => {
      // При изменении поля вызываются функции валидации.
      input.addEventListener('input', evt => {
        validateInput(input, inputErrorClass, errorClass);
        validateForm(form, inputs, submitButtonSelector, inactiveButtonClass);
      });
    });
  });
}

// Валидация поля ввода.
function validateInput(input, inputErrorClass, errorClass) {
  const errorPlace = findInputErrorPlace(input); // Элемент с текстом ошибки для этого поля ввода.
  if (isInputValid(input)) {
    hideInputError(input, errorPlace, inputErrorClass, errorClass);
  } else {
    showInputError(input, errorPlace, inputErrorClass, errorClass);
  }
}

// поиск errorPlace
function findInputErrorPlace(input) {
  const name = input.getAttribute('name');
  return document.getElementById(`${name}Error`);
}

// проверка валидности введеных данных
function isInputValid(input) {
  return input.validity.valid;
}


// скрыть ошибку под полем
function hideInputError(input, errorPlace, inputErrorClass, errorClass) {
  input.classList.remove(inputErrorClass);
  errorPlace.textContent = '';
  errorPlace.classList.remove(errorClass);
}

// показать ошибку под полем
function showInputError(input, errorPlace, inputErrorClass, errorClass) {
  input.classList.add(inputErrorClass);
  errorPlace.textContent = input.validationMessage;
  errorPlace.classList.add(errorClass);
}

function validateForm(form, inputs, submitButtonSelector, inactiveButtonClass) {
  const button = form.querySelector(submitButtonSelector);
  if (isInputsValid(inputs)) {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
  } else {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', 'disabled');
  }
}

// показать, есть ли хотя бы одно невалидное поле в порме
function isInputsValid(inputs) {
  return inputs.every(isInputValid);
}