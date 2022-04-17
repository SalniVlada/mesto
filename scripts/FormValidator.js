export class FormValidator {
  constructor({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}, form) {
    this.formSelector = formSelector;
    this.inputSelector = inputSelector;
    this.submitButtonSelector = submitButtonSelector;
    this.inactiveButtonClass = inactiveButtonClass;
    this.inputErrorClass = inputErrorClass;
    this.errorClass = errorClass;
    this._form = form;
  }

  // Функция устанавливает правила валидации и показывает сообщения об ошибках.
  enableValidation() {
    // Выбор всех полей ввода на форме.
    this._inputs = Array.from(this._form.querySelectorAll(this.inputSelector));
    this._button = this._form.querySelector(this.submitButtonSelector);
    this._inputs.forEach(input => {
      // При изменении поля вызываются функции валидации.
      this._setListenerOnInput(input);
    });
  }

  _setListenerOnInput(input) {
    input.addEventListener('input', () => this._validateElements(input));
  }

  _validateElements(input) {
    this._validateInput(input);
    this.validateForm();
  };

  // Валидация поля ввода.
  _validateInput(input) {
    const errorPlace = this._findInputErrorPlace(input); // Элемент с текстом ошибки для этого поля ввода.
    if (this._isInputValid(input)) {
      this._hideInputError(input, errorPlace);
    } else {
      this._showInputError(input, errorPlace);
    }
  }

  // поиск errorPlace
  _findInputErrorPlace(input) {
    const name = input.getAttribute('name');
    return document.getElementById(`${name}Error`);
  }

  // проверка валидности введеных данных
  _isInputValid(input) {
    return input.validity.valid;
  }

  // скрыть ошибку под полем
  _hideInputError(input, errorPlace) {
    input.classList.remove(this.inputErrorClass);
    errorPlace.textContent = '';
    errorPlace.classList.remove(this.errorClass);
  }

  // показать ошибку под полем
  _showInputError(input, errorPlace) {
    input.classList.add(this.inputErrorClass);
    errorPlace.textContent = input.validationMessage;
    errorPlace.classList.add(this.errorClass);
  }

  //Валидация поля формы
  validateForm() {
    if (this._isInputsValid()) {
      this._button.classList.remove(this.inactiveButtonClass);
      this._button.removeAttribute('disabled');
    } else {
      this._button.classList.add(this.inactiveButtonClass);
      this._button.setAttribute('disabled', 'disabled');
    }
  }

  // показать, есть ли хотя бы одно невалидное поле в форме
  _isInputsValid() {
    return this._inputs.every(this._isInputValid);
  }
}
