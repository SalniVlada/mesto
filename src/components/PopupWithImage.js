import { Popup } from '../components/Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector, nameImage, linkImage) {
    super(popupSelector);
    this.popupImageTitle = document.querySelector(".popup__image-title");
    this.popupImageLayer = document.querySelector(".popup__image-layer");
    this.nameImage = nameImage;
    this.linkImage = linkImage;
  }

  open() {
    this.popupImageTitle.textContent = this.nameImage;
    this.popupImageLayer.setAttribute("src", this.linkImage);
    this.popupImageLayer.setAttribute("alt", this.nameImage);

    super.open();
  }
}