let popup = document.querySelector(".popup");
let formElement = document.querySelector(".form");
let nameInput = document.querySelector(".popup__input_add_name");
let aboutInput = document.querySelector(".popup__input_add_about");
let editButton = document.querySelector(".profile__button");
let closeButton = document.querySelector(".popup__close");
let newPersonName = document.querySelector(".profile__name");
let about = document.querySelector(".profile__about");
let inputName = document.querySelector(".popup__input_add_name");
let inputAbout = document.querySelector(".popup__input_add_about");

function showPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function fillPopup() {
  let nameText = newPersonName.textContent;
  inputName.setAttribute("value", nameText);

  let aboutText = about.textContent;
  inputAbout.setAttribute("value", aboutText);
}

editButton.addEventListener("click", function() {
  fillPopup();
  showPopup();
});

closeButton.addEventListener("click", closePopup);

function formSubmitHandler (evt) {
  evt.preventDefault(); 

  let addName = nameInput.value;
  let addAbout = aboutInput.value;
  
  newPersonName.textContent = addName;
  about.textContent = addAbout;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);