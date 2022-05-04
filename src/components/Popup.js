export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
  }

  open() {
    this._popup.classList.add("popup_opened");
    this._setEventListeners();
  }

  // создание слушателя на нажатие вне попапа для закрытия попапа
  _setEventListeners() {
    this._currentClosePopupWithListener = this._closePopupWithListener.bind(this);
    this._currentHandleEscClose = this._handleEscClose.bind(this);
    this._popup.addEventListener('click', this._currentClosePopupWithListener);
    document.addEventListener('keydown', this._currentHandleEscClose);
  }

  _closePopupWithListener(evt) {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    const buttonEscCode = 27;
    if (evt.which === buttonEscCode) {
      this.close();
    }
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._removePopupCloseListener();
  }

  // удаление слушателя на нажатие вне попапа для закрытия попапа
  _removePopupCloseListener() {
    this._popup.removeEventListener('click', this._currentClosePopupWithListener);
    document.removeEventListener('keydown', this._currentHandleEscClose);
  }
}