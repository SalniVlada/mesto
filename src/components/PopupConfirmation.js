import { Popup } from '../components/Popup.js';

export class PopupConfirmation extends Popup {
  constructor(popupSelector, callbackConfirm) {
    super(popupSelector);
    this._callbackConfirm = callbackConfirm;
    this._buttonConfirm  = this._popup.querySelector(".popup__save");
  }

  open(id) {
    this._id = id;

    super.open();
  }

  setEventListeners() {
    this._currentCallbackSubmitListener = this._callCallbackFunction.bind(this);
    this._buttonConfirm.addEventListener('click', this._currentCallbackSubmitListener);
    
    super.setEventListeners();
  }

  _callCallbackFunction(evt) {
    evt.preventDefault();
    this._renderLoading(true);
    this._callbackConfirm(this._id)
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

  _renderLoading (isLoading) {
    if(isLoading) {
      this._buttonConfirm.textContent = "Удаление...";
    } else {
      this._buttonConfirm.textContent = "Да";
    }
  }
}