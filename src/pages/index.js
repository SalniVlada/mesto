import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { api } from '../components/Api.js';

import { buttonEditPerson } from '../utils/constants.js';
import { buttonAddCard } from '../utils/constants.js';
import { buttonEditAvatar } from '../utils/constants.js';
import { avatar } from '../utils/constants.js';

import { selectorsForValidation } from '../utils/selectorsForValidation.js';

// блок работы с информацией о себе
const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userAboutSelector: ".profile__about"
});

api.getUserInfo()
  .then((result) => {
    userInfo.setUserInfo({ newElementName: result.name, newElementAbout: result.about, userId: result._id });
    avatar.setAttribute("src", result.avatar);
  })
  .catch((err) => {
    console.log(err);
  });

function submitProfile(inputValues) {
  const name = inputValues["personName"];
  const about = inputValues["personAbout"];
  userInfo.setUserInfo({ newElementName: name, newElementAbout: about });

  api.patchUserInfo({name: name, about: about})
    .catch((err) => {
      console.log(err);
    });
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

function submitAvatar(inputValues) {
  const avatarLink = inputValues["avatarLink"];

  api.patchUserAvatar({avatar: avatarLink})
    .then((result) => {
      avatar.setAttribute("src", avatarLink);
    })
    .catch((err) => {
      console.log(err);
    });

}

const popupEditAvatar = new PopupWithForm(".popup_avatar", submitAvatar);
popupEditAvatar.setEventListeners();

const formAvatarValidator = new FormValidator(selectorsForValidation, popupEditAvatar.form);
formAvatarValidator.enableValidation();

buttonEditAvatar.addEventListener("click", function () {
  formAvatarValidator.toggleButtonState();
  popupEditAvatar.open();
});


// блок работы с карточками
function submitDeleteCard(inputValues) {
  const cardId = inputValues["cardId"];

  api.deleteCard(cardId)
    .then((result) => {
      document.getElementById(cardId).remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

const popupDeleteCard = new PopupWithForm(".popup_delete", submitDeleteCard);
popupDeleteCard.setEventListeners();

const popupWithImage = new PopupWithImage(".popup_image");
popupWithImage.setEventListeners();

function createCard(data) {
  function handleCardClick() {
    popupWithImage.open(data.name, data.link);
  }
  const arg = {
    data: data,
    handleCardClick: handleCardClick,
    handleLikeClick: (card) => {
      if (card.getLiked()) {
        api.deleteLikes(card.id)
          .then((result) => {
            card.setLiked(false);
            card.setLikesCount(result.likes.length);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.putLikes(card.id)
          .then((result) => {
            card.setLiked(true);
            card.setLikesCount(result.likes.length);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    handleDeleteIconClick: (card) => {
      popupDeleteCard.setInputValues([{name: "cardId", value: card.id}]);
      popupDeleteCard.open();
    }
  }
  const card = new Card(arg, ".element-template", userInfo.userId);
  return card.renderElement();
}

const section = new Section({ items: [], renderer: (item) => section.addItem(createCard(item)) }, ".elements");
section.renderAll();

api.getInitialCards()
  .then((result) => {
    result.reverse().forEach( function(element) {
      section.addItem(createCard(element));
    })
  })
  .catch((err) => {
    console.log(err);
  });

function submitNewLocation(inputValues) {
  const name = inputValues["cardName"];
  const link = inputValues["cardLink"];

  api.postCard({name: name, link: link})
    .then((result) => {
      const card = createCard(result);
      section.addItem(card);
    })
    .catch((err) => {
      console.log(err);
    });
}

const popupAddCard = new PopupWithForm(".popup_card", submitNewLocation);
popupAddCard.setEventListeners();

const formCardValidator = new FormValidator(selectorsForValidation, popupAddCard.form);
formCardValidator.enableValidation();

buttonAddCard.addEventListener("click", function () {
  formCardValidator.toggleButtonState();
  popupAddCard.open();
});