// объявление переменных для редактирования персональных данных
const popupPerson = document.querySelector(".popup__person");
const formPerson = document.querySelector(".form__person");
const namePerson = document.querySelector(".popup__input_add_name"); // rename
const aboutPerson = document.querySelector(".popup__input_add_about"); // rename
const editButtonPerson = document.querySelector(".profile__button");
const closePerson = document.querySelector(".popup__close_person");
const newPersonName = document.querySelector(".profile__name"); // rename
const about = document.querySelector(".profile__about"); // rename
const inputName = document.querySelector(".popup__input_add_name"); // use namePerson
const inputAbout = document.querySelector(".popup__input_add_about"); // use aboutPerson

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
const elementsContainer = document.querySelector(".elements"); // rename elementsContainer
const elementPhoto = document.querySelector(".element__photo");
const popupCard = document.querySelector(".popup__card");
const addCard = document.querySelector(".profile__add-button"); // rename
const closeCard = document.querySelector(".popup__close_card"); // rename
const newCard = document.querySelector(".popup__input_card_name"); // rename newCardName
const newImage = document.querySelector(".popup__input_card_link"); // rename
const formCard = document.querySelector(".form__card");
const popupImageLayer = document.querySelector(".popup__image-layer");
const popupImageTitle = document.querySelector(".popup__image-title");
const popupImage = document.querySelector(".popup__image");
const closeImage = document.querySelector(".popup__close_image"); //rename


//открытие, закрытие модального окна и редактирование персональных данных
function showPopupPerson() {
  popupPerson.classList.add("popup_opened");
}

function closePopupPerson() {
  popupPerson.classList.remove("popup_opened");
}

function fillPopupPerson() {
  const nameText = newPersonName.textContent;
  inputName.setAttribute("value", nameText);

  const aboutText = about.textContent;
  inputAbout.setAttribute("value", aboutText);
}

editButtonPerson.addEventListener("click", function() {
  fillPopupPerson();
  showPopupPerson();
});

closePerson.addEventListener("click", closePopupPerson);

function formSubmitProfile (evt) { //renmae
  evt.preventDefault(); 

  const addName = namePerson.value; // rename addedName
  const addAbout = aboutPerson.value; // rename
  
  newPersonName.textContent = addName;
  about.textContent = addAbout;
  closePopupPerson();
}

formPerson.addEventListener('submit', formSubmitProfile);

//создание карточек на странице, появление и закрытие модального окна с добавлением новой карточки, удаление и оценивание карточек
function addElement (element) {
  const elementTemplate = document.querySelector(".element-template").content.firstElementChild.cloneNode(true);
  const elementTitle = elementTemplate.querySelector(".element__title");
  const elementPhoto = elementTemplate.querySelector(".element__photo");
  const buttonLike = elementTemplate.querySelector(".element__button");
  elementTitle.textContent = element.name;
  elementPhoto.setAttribute("src", element.link);

  elementsContainer.prepend(elementTemplate);

  elementPhoto.addEventListener("click", function() {
    fillPopupImage(element.name, element.link);
    showPopupImage();
  });

  buttonLike.addEventListener('click', function () {
    buttonLike.classList.toggle("element_active");
  });

  const deletedElement = elementTemplate.querySelector(".element__delete");
  deletedElement.addEventListener("click", function(event) {
    const element = event.currentTarget.closest(".element");
    element.remove();
  });
}

elements.forEach(addElement);

function showPopupCard() {
  popupCard.classList.add("popup_opened");
  formCard.reset();
}

function closePopupCard() {
  popupCard.classList.remove("popup_opened");
}

addCard.addEventListener("click", function() {
  showPopupCard();
});

closeCard.addEventListener("click", closePopupCard);

function formSubmitNewLocation (evt) { //rename
  evt.preventDefault(); 

  let addTitle = newCard.value; // rename
  let addImage = newImage.value; // rename
  
  const element = {
    name: addTitle,
    link: addImage
  }
  addElement(element);
  closePopupCard();
}

formCard.addEventListener('submit', formSubmitNewLocation);

function fillPopupImage(nameImage, linkImage) {
  popupImageTitle.textContent = nameImage;
  popupImageLayer.setAttribute("src", linkImage);
}

function showPopupImage() {
  popupImage.classList.add("popup_opened");
}

function closePopupImage() {
  popupImage.classList.remove("popup_opened");
}

closeImage.addEventListener("click", closePopupImage);