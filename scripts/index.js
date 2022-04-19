import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// объявление переменных для редактирования персональных данных
const popupPerson = document.querySelector(".popup_person");
const formPerson = document.querySelector(".form_person");
const newPersonName = document.querySelector(".popup__input_add_name");
const newPersonAbout = document.querySelector(".popup__input_add_about");
const buttonEditPerson = document.querySelector(".profile__button");
const namePerson = document.querySelector(".profile__name");
const aboutPerson = document.querySelector(".profile__about");

//объявление переменных для добавления, удаления и "лайка" новых карточек
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
const elementsContainer = document.querySelector(".elements");
const popupCard = document.querySelector(".popup_card");
const buttonAddedCard = document.querySelector(".profile__add-button");
const newCardName = document.querySelector(".popup__input_card_name");
const newImageLink = document.querySelector(".popup__input_card_link");
const formCard = document.querySelector(".form_card");
const buttonEscCode = 27;
const popupSaveCard = document.querySelector(".popup__save_card");
const inactiveButtonClass = "popup__save_disabled";

//открытие, закрытие модального окна и редактирование персональных данных
function showPopup(popup) {
  popup.classList.add("popup_opened");
  addPopupCloseListener(popup);
}

export {showPopup};

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  removePopupCloseListener(popup);
}

function fillPopupPerson() {
  const nameText = namePerson.textContent;
  newPersonName.value = nameText;

  newPersonAbout.value = aboutPerson.textContent;
}

buttonEditPerson.addEventListener("click", function() {
  fillPopupPerson();
  showPopup(popupPerson);
});

function submitProfile (evt) {
  evt.preventDefault(); 

  const addedName = newPersonName.value;
  
  namePerson.textContent = addedName;
  aboutPerson.textContent = newPersonAbout.value;
  closePopup(popupPerson);
}

formPerson.addEventListener('submit', submitProfile);

function createCard(name, link) {
  const card = new Card(name, link, ".element-template");
  return card.renderElement();
}

elements.forEach(function(element) {
  const elementTemplate = createCard(element.name, element.link);
  elementsContainer.prepend(elementTemplate);
});

const selectorsForValidation = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const formPersonValidator = new FormValidator(selectorsForValidation, formPerson);

formPersonValidator.enableValidation();

const formCardValidator = new FormValidator(selectorsForValidation, formCard);

formCardValidator.enableValidation();

buttonAddedCard.addEventListener("click", function() {
  formCard.reset();
  formCardValidator.validateForm();
  showPopup(popupCard);
});

function submitNewLocation (evt) {
  evt.preventDefault(); 

  const addedTitle = newCardName.value;
  const addedImage = newImageLink.value;
  
  const element = {
    name: addedTitle,
    link: addedImage
  }
  const elementTemplate = createCard(element.name, element.link);
  elementsContainer.prepend(elementTemplate);
  closePopup(popupCard);
}

formCard.addEventListener('submit', submitNewLocation);

// создание слушателя на нажатие вне попапа для закрытия попапа
function addPopupCloseListener(popup) {
  popup.addEventListener('click', closePopupWithListener);
  document.addEventListener('keydown', closePopupWithKey);
}

// удаление слушателя на нажатие вне попапа для закрытия попапа
function removePopupCloseListener(popup) {
  popup.removeEventListener('click', closePopupWithListener);
  document.removeEventListener('keydown', closePopupWithKey);
}

function closePopupWithListener(evt) {
  //Если было нажатие на крестик, то currentPopup переопределяется на открытый попап
  if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
    const currentPopup = evt.target.closest('.popup');
    closePopup(currentPopup);
  }
}

function closePopupWithKey(evt) {
  if (evt.which === buttonEscCode) {
    const currentPopup = document.querySelector('.popup.popup_opened');
    closePopup(currentPopup);
  }
}

