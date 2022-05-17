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
    this._callbackSubmitForm(this._getInputValues())
      .then((result) => {
        this.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this._renderLoading(false);
      });
  }

  close() {
    super.close();

    this.form.reset();
  }

  _renderLoading (isLoading) {
    if(isLoading) {
      this._submitButton.textContent = this._operationSubmitCaption
    } else {
      this._submitButton.textContent = this._commandSubmitCaption
    }
  }
}