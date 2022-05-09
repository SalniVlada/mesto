import { Popup } from '../components/Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this.form = this._popup.querySelector('form');
    this._allInputs = Array.from(this._popup.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    // В форме найти все input по селектору их класса, превратить в массив DOM-элементов, вернуть
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
    this._callbackSubmitForm(this._getInputValues());
    this.close();
  }

  close() {
    super.close();

    this.form.reset();
  }
}