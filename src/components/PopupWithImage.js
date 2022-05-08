import { Popup } from '../components/Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupImageTitle = document.querySelector(".popup__image-title");
    this.popupImageLayer = document.querySelector(".popup__image-layer");
  }

  open(nameImage, linkImage) {
    this.popupImageTitle.textContent = nameImage;
    this.popupImageLayer.setAttribute("src", linkImage);
    this.popupImageLayer.setAttribute("alt", nameImage);

    super.open();
  }
}