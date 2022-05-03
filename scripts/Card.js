export class Card {
  constructor(name, link, selectorTemplate, handleCardClick) {
    this.selectorTemplate = selectorTemplate;
    this.name = name;
    this.link = link;
    /*this.popupImageTitle = document.querySelector(".popup__image-title");
    this.popupImageLayer = document.querySelector(".popup__image-layer");*/
    this.popupImage = document.querySelector(".popup_image");
    this._handleCardClick = handleCardClick;
  }

  renderElement() {
    const elementTemplate = document.querySelector(this.selectorTemplate).content.firstElementChild.cloneNode(true);
    const elementTitle = elementTemplate.querySelector(".element__title");
    const elementPhoto = elementTemplate.querySelector(".element__photo");
    const buttonLike = elementTemplate.querySelector(".element__button");
    elementTitle.textContent = this.name;
    elementPhoto.setAttribute("src", this.link);
    elementPhoto.setAttribute("alt", this.name);

    this._setListenerOnClickPhoto(elementPhoto);
  
    this._setListenerOnClickButtonLike(buttonLike);
  
    const deletedElement = elementTemplate.querySelector(".element__delete");
    this._setListenerOnClickDeletePhoto(deletedElement);
    
    return elementTemplate;
  }

  _setListenerOnClickPhoto(elementPhoto) {
    elementPhoto.addEventListener("click", this._handleCardClick);
  }

  /*_fillPopupImage(nameImage, linkImage) {
    this.popupImageTitle.textContent = nameImage;
    this.popupImageLayer.setAttribute("src", linkImage);
    this.popupImageLayer.setAttribute("alt", nameImage);
  }*/

  _setListenerOnClickButtonLike(buttonLike) {
    buttonLike.addEventListener('click', () => this._likePhoto(buttonLike));
  }

  _likePhoto(buttonLike) {
    buttonLike.classList.toggle("element_active");
  }

  _setListenerOnClickDeletePhoto(deletedElement) {
    deletedElement.addEventListener("click", this._deletePhoto);
  }

  _deletePhoto(event) {
    const element = event.currentTarget.closest(".element");
    element.remove();
  }
}