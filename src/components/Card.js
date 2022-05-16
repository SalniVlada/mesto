export class Card {
  constructor({data, handleCardClick, handleLikeClick, handleDeleteIconClick}, selectorTemplate, userId) {
    this.selectorTemplate = selectorTemplate;
    this.name = data.name;
    this.link = data.link;
    this.likes = data.likes;
    this.id = data._id;
    this.ownerId = data.owner._id;
    this.userId = userId;
    this.popupImage = document.querySelector(".popup_image");
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._liked = this.likes.map((elem) => { return elem._id }).includes(this.userId);
  }

  renderElement() {
    const elementTemplate = document.querySelector(this.selectorTemplate).content.firstElementChild.cloneNode(true);
    elementTemplate.id = this.id;
    const elementTitle = elementTemplate.querySelector(".element__title");
    const elementPhoto = elementTemplate.querySelector(".element__photo");
    this._buttonLike = elementTemplate.querySelector(".element__button");
    this._elementCounter = elementTemplate.querySelector(".element__counter");
    elementTitle.textContent = this.name;
    elementPhoto.setAttribute("src", this.link);
    elementPhoto.setAttribute("alt", this.name);
    this.setLikesCount(this.likes.length);
    this.setLiked(this.getLiked());

    this._setListenerOnClickPhoto(elementPhoto);

    this._setListenerOnClickButtonLike();

    const deletedElement = elementTemplate.querySelector(".element__delete");
    if (this.userId == this.ownerId) {
      this._setListenerOnClickDeletePhoto(deletedElement);
    } else {
      deletedElement.remove();
    }

    return elementTemplate;
  }

  _setListenerOnClickPhoto(elementPhoto) {
    elementPhoto.addEventListener("click", this._handleCardClick);
  }

  _setListenerOnClickButtonLike() {
    this._buttonLike.addEventListener('click', () => this._handleLikeClick(this));
  }

  _setListenerOnClickDeletePhoto(deletedElement) {
    deletedElement.addEventListener("click", () => { this._handleDeleteIconClick(this) });
  }

  getLiked() {
    return this._liked;
  }

  setLiked(condition) {
    this._liked = condition;
    if (condition) {
      this._buttonLike.classList.add("element_active");
    } else {
      this._buttonLike.classList.remove("element_active");
    }
  }

  setLikesCount(n) {
    this._elementCounter.textContent = n;
  }
}