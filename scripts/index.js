let popupPerson = document.querySelector(".popup__person");
let formPerson = document.querySelector(".form__person");
let namePerson = document.querySelector(".popup__input_add_name");
let aboutPerson = document.querySelector(".popup__input_add_about");
let editButtonPerson = document.querySelector(".profile__button");
let closePerson = document.querySelector(".popup__close_person");
let newPersonName = document.querySelector(".profile__name");
let about = document.querySelector(".profile__about");
let inputName = document.querySelector(".popup__input_add_name");
let inputAbout = document.querySelector(".popup__input_add_about");

function showPopupPerson() {
  popupPerson.classList.add("popup_opened");
}

function closePopupPerson() {
  popupPerson.classList.remove("popup_opened");
}

function fillPopupPerson() {
  let nameText = newPersonName.textContent;
  inputName.setAttribute("value", nameText);

  let aboutText = about.textContent;
  inputAbout.setAttribute("value", aboutText);
}

editButtonPerson.addEventListener("click", function() {
  fillPopupPerson();
  showPopupPerson();
});

closePerson.addEventListener("click", closePopupPerson);

function formSubmitHandler (evt) {
  evt.preventDefault(); 

  let addName = namePerson.value;
  let addAbout = aboutPerson.value;
  
  newPersonName.textContent = addName;
  about.textContent = addAbout;
  closePopupPerson();
}

formPerson.addEventListener('submit', formSubmitHandler);





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

const elementsList = document.querySelector(".elements");
const elementPhoto = document.querySelector(".element__photo");

function addElement (element) {
  const elementTemplate = document.querySelector(".element-template").content.firstElementChild.cloneNode(true);
  const elementTitle = elementTemplate.querySelector(".element__title");
  const elementPhoto = elementTemplate.querySelector(".element__photo");
  elementTitle.textContent = element.name;
  elementPhoto.setAttribute("src", element.link);

  elementsList.prepend(elementTemplate);

  elementPhoto.addEventListener("click", function() {
    fillPopupImage(element.name, element.link);
    showPopupImage();
  });

  const deletedElement = elementTemplate.querySelector(".element__delete");
  deletedElement.addEventListener("click", function(event) {
    const element = event.currentTarget.closest(".element");
    element.remove();
  });
}

elements.forEach(addElement);




const popupCard = document.querySelector(".popup__card");
const addCard = document.querySelector(".profile__add-button");
const closeCard = document.querySelector(".popup__close_card");
const newCard = document.querySelector(".popup__input_card_name");
const newImage = document.querySelector(".popup__input_card_link");
const formCard = document.querySelector(".form__card");

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

function formSubmitHandler (evt) {
  evt.preventDefault(); 

  let addTitle = newCard.value;
  let addImage = newImage.value;
  
  const element = {
    name: addTitle,
    link: addImage
  }
  addElement(element);
  closePopupCard();
}

formCard.addEventListener('submit', formSubmitHandler);

const popupImageLayer = document.querySelector(".popup__image-layer");
const popupImageTitle = document.querySelector(".popup__image-title");
const popupImage = document.querySelector(".popup__image");
const closeImage = document.querySelector(".popup__close_image");


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

const buttonsLike = document.querySelectorAll(".element__button");

buttonsLike.forEach(function(buttonLike) {
  buttonLike.addEventListener('click', function () {
    buttonLike.classList.toggle("element_active");
  })
});