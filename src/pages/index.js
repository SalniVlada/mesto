import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';

import { buttonEditPerson } from '../utils/constants.js';
import { buttonAddCard } from '../utils/constants.js';

import { elements } from '../utils/elements.js';

import { selectorsForValidation } from '../utils/selectorsForValidation.js';

// блок работы с информацией о себе
const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userAboutSelector: ".profile__about"
});

function submitProfile(inputValues) {
  const name = inputValues["personName"];
  const about = inputValues["personAbout"];
  userInfo.setUserInfo({ newElementName: name, newElementAbout: about });
}

const popupEditUserInfo = new PopupWithForm(".popup_person", submitProfile);
popupEditUserInfo.setEventListeners();

const formPersonValidator = new FormValidator(selectorsForValidation, popupEditUserInfo.form);
formPersonValidator.enableValidation();

buttonEditPerson.addEventListener("click", function () {
  const nameAbout = userInfo.getUserInfo();
  popupEditUserInfo.setInputValues([{ name: "personName", value: nameAbout.name }, { name: "personAbout", value: nameAbout.about }]);
  formPersonValidator.toggleButtonState();
  popupEditUserInfo.open();
});

// блок работы с карточками
const popupWithImage = new PopupWithImage(".popup_image");
popupWithImage.setEventListeners();

function createCard({ name, link }) {
  function handleCardClick() {
    popupWithImage.open(name, link);
  }
  const card = new Card(name, link, ".element-template", handleCardClick);
  return card.renderElement();
}

const section = new Section({ items: elements, renderer: (item) => section.addItem(createCard(item)) }, ".elements");
section.renderAll();

function submitNewLocation(inputValues) {
  const name = inputValues["cardName"];
  const link = inputValues["cardLink"];
  const card = createCard({ name: name, link: link });
  section.addItem(card);
}

const popupAddCard = new PopupWithForm(".popup_card", submitNewLocation);
popupAddCard.setEventListeners();

const formCardValidator = new FormValidator(selectorsForValidation, popupAddCard.form);
formCardValidator.enableValidation();

buttonAddCard.addEventListener("click", function () {
  formCardValidator.toggleButtonState();
  popupAddCard.open();
});