let popup = document.querySelector(".popup");
let formElement = document.querySelector(".form");
let nameInput = document.querySelector(".popup__input_name");
let aboutInput = document.querySelector(".popup__input_about");
let editButton = document.querySelector(".profile__button");
let closeButton = document.querySelector(".popup__close");
let buttonsLike = document.querySelectorAll(".element__button");

function fillName() {
  // определить элемент с источником текста
  let name = document.querySelector(".profile__name");

  // прочитать текст из источника
  let nameText = name.textContent;

  // определить элемент, куда поместить текст
  let inputName = document.querySelector(".popup__input_name");

  // поместить текст в элемент попапа
  inputName.setAttribute("value", nameText);
}

function fillAbout() {
  let about = document.querySelector(".profile__about");
  let aboutText = about.textContent;
  let inputAbout = document.querySelector(".popup__input_about");
  inputAbout.setAttribute("value", aboutText);
}


function closePopup() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler (evt) {
  evt.preventDefault(); 

  let addName = nameInput.value;
  let addAbout = aboutInput.value;

  let name = document.querySelector(".profile__name");
  let about = document.querySelector(".profile__about");
  
  name.textContent = addName;
  about.textContent = addAbout;
  closePopup();
}

function showPopup() {
  popup.classList.add("popup_opened");
}

formElement.addEventListener('submit', formSubmitHandler);

editButton.addEventListener("click", function() {
  fillName();
  fillAbout();
  showPopup();
});

closeButton.addEventListener("click", closePopup);

buttonsLike.forEach(function(buttonLike) {
  buttonLike.addEventListener('click', function () {
    buttonLike.classList.toggle("element_active");
  })
});