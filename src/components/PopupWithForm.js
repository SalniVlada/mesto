import { Popup } from '../components/Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this.form = this._popup.querySelector('form');
    this._allInputs = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._submitButton = document.querySelector(".popup__save");
    this._commandSubmitCaption = this._submitButton.textContent;
    this._operationSubmitCaption = "Создание..."
    if (this._commandSubmitCaption == "Сохранить") {
      this._operationSubmitCaption = "Сохранение..."
    }
    // (1) объявить DOM-элемент кнопки submit через querySelector
    // (2) получить название кнопки (1) и объявить его как переменную
    // (3) объявить переменную с названием кнопки для загрузки: если (2) == сохранить, то сохранение, иначе создание
  }

  _getInputValues() {
    this._formValues = {}; 
    this._allInputs.forEach(input => { 
      this._formValues[input.name] = input.value; 
    });
    return this._formValues;
  }

  setInputValues(inputValues) {
    inputValues.forEach((nameValue) => {
      this._popup.querySelector(`.popup__input[name=${nameValue.name}]`).value = nameValue.value;
    });
  }

  setEventListeners() {
    this._currentCallbackSubmitListener = this._callCallbackFunction.bind(this);
    this.form.addEventListener('submit', this._currentCallbackSubmitListener);

    super.setEventListeners();
  }

  _callCallbackFunction(evt) {
    evt.preventDefault();
    this._renderLoading(true);
    this._callbackSubmitForm(this._getInputValues());
    this.close();
    this._renderLoading(false);
  }

  close() {
    super.close();

    this.form.reset();
  }

  // функция renderLoading (isLoading)
  // если isLoading - true, то задавать textContent у кнопки (1) как (3)...
  // иначе задавать как (2)

  _renderLoading (isLoading) {
    if(isLoading) {
      this._submitButton.textContent = this._operationSubmitCaption
    } else {
      this._submitButton.textContent = this._commandSubmitCaption
    }
  }
}