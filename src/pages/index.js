import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';

// объявление DOM-элементов
const buttonEditPerson = document.querySelector(".profile__button");
const buttonAddCard = document.querySelector(".profile__add-button");

// объявление данных
const elements = [
  {
    name: 'Группа Пала',
    link: 'https://unsplash.com/photos/9TaYFMMapbA/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8fGVufDB8fHx8MTY0NzI4NTQzNw&force=true&w=640'
  },
  {
    name: 'Маттерхорн',
    link: 'https://unsplash.com/photos/S3zopd8_5OY/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8fGVufDB8fHx8MTY0NzI4NDUyNQ&force=true&w=640'
  },
  {
    name: 'Вайссхорн',
    link: 'https://unsplash.com/photos/uqm2GgJANDM/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8fGVufDB8fHx8MTY0NzI4NTMwOA&force=true&w=640'
  },
  {
    name: 'Сьон',
    link: 'https://unsplash.com/photos/Nr_LsDsyJG4/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8fGVufDB8fHx8MTY0NzI4NTI2Mw&force=true&w=640'
  },
  {
    name: 'Пассо Ролле',
    link: 'https://unsplash.com/photos/3i5PHVp1Fkw/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8fGVufDB8fHx8MTY0NzI4NTE5Mg&force=true&w=640'
  },
  {
    name: 'Монблан',
    link: 'https://unsplash.com/photos/S3zopd8_5OY/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8fGVufDB8fHx8MTY0NzI4NDUyNQ&force=true&w=640'
  }
];

const selectorsForValidation = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


// блок работы с информацией о себе
const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userAboutSelector: ".profile__about"
});

function submitProfile(inputValues) {
  const name = inputValues.find((input) => { return input.getAttribute("name") === "personName"; }).value;
  const about = inputValues.find((input) => { return input.getAttribute("name") === "personAbout"; }).value;
  userInfo.setUserInfo({ newElementName: name, newElementAbout: about });
}

const popupEditUserInfo = new PopupWithForm(".popup_person", submitProfile);

const formPersonValidator = new FormValidator(selectorsForValidation, popupEditUserInfo.form);
formPersonValidator.enableValidation();

buttonEditPerson.addEventListener("click", function () {
  const nameAbout = userInfo.getUserInfo();
  popupEditUserInfo.setInputValues([{ name: "personName", value: nameAbout.name }, { name: "personAbout", value: nameAbout.about }]);
  formPersonValidator.validateForm();
  popupEditUserInfo.open();
});


// блок работы с карточками
function createCard({ name, link }) {
  function handleCardClick() {
    const popupWithImage = new PopupWithImage(".popup_image", name, link);
    popupWithImage.open();
  }
  const card = new Card(name, link, ".element-template", handleCardClick);
  return card.renderElement();
}

const section = new Section({ items: elements, renderer: createCard }, ".elements");
section.renderAll().forEach((item) => { section.addItem(item); });

function submitNewLocation(inputValues) {
  const name = inputValues.find((input) => { return input.getAttribute("name") === "cardName"; }).value;
  const link = inputValues.find((input) => { return input.getAttribute("name") === "cardLink"; }).value;
  const card = createCard({ name: name, link: link });
  section.addItem(card);
}

const popupAddCard = new PopupWithForm(".popup_card", submitNewLocation);

const formCardValidator = new FormValidator(selectorsForValidation, popupAddCard.form);
formCardValidator.enableValidation();

buttonAddCard.addEventListener("click", function () {
  formCardValidator.validateForm();
  popupAddCard.open();
});