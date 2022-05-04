import { Popup } from '../components/Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this.form = this._popup.querySelector('form');
  }

  _getInputValues() {
    // В форме найти все input по селектору их класса, превратить в массив DOM-элементов, вернуть
    const allInputs = Array.from(this._popup.querySelectorAll('.popup__input'));
    return allInputs;
  }

  setInputValues(inputValues) {
    inputValues.forEach((nameValue) => {
      this._popup.querySelector(`.popup__input[name=${nameValue.name}]`).value = nameValue.value;
    });
  }

  _setEventListeners() {
    this._currentCallbackSubmitListener = this._callCallbackFunction.bind(this);
    this.form.addEventListener('submit', this._currentCallbackSubmitListener);

    super._setEventListeners();
  }

  _callCallbackFunction(evt) {
    evt.preventDefault();
    this._callbackSubmitForm(this._getInputValues());
    this.close();
  }

  close() {
    super.close();

    this.form.reset();
  }

  _removePopupCloseListener() {
    super._removePopupCloseListener();
    this.form.removeEventListener('submit', this._currentCallbackSubmitListener);
  }
}