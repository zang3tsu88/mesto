/**
 * Подскажите в чем дело, в .gitignore почему-то упорно не
 * добавляется папка oldFiles, хотя я ее прописал.
 *
 * Еще, долго гуглил и искал, но не нашел способа избавиться в
 * index.html от синтаксиса lodash для img.
 * Пните в нужном направлении.
 */

import "./index.css";

import { config } from "../utils/config.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidate.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

// Forms
const profileForm = document.forms.editProfileFormPopup;
const imageForm = document.forms.addImageFormPopup;
const avatarForm = document.forms.changeAvatar;

//  Buttons
const buttonEditProfile = document.querySelector(".profile__edit-btn");
const buttonAddImage = document.querySelector(".profile__btn-add-img");
const buttonChangeAvatar = document.querySelector(".profile__avatar-btn");

const validateProfileForm = new FormValidator(config, profileForm);
const validateImageForm = new FormValidator(config, imageForm);
const validateAvatarForm = new FormValidator(config, avatarForm);

validateProfileForm.enableValidation();
validateImageForm.enableValidation();
validateAvatarForm.enableValidation();

let currentUserId;

const api = new Api(
  "https://mesto.nomoreparties.co/v1/cohort-61",
  "1fcc4ee9-cb11-44f3-98b8-3e9fb7d3535d"
);

Promise.all([api.getCurrentUser(), api.getCards()])
  .then(([user, cards]) => {
    console.log(user); // CONSOLE.LOG
    console.log(cards);
    userInfo.setUserInfo(user);
    currentUserId = user._id;
    console.log(currentUserId);

    cardsList.renderItems(cards);
  })
  .catch((err) => console.log(err));

const userInfo = new UserInfo({
  nameSelector: ".profile__user-name",
  occupationSelector: ".profile__user-occupation",
  avatarSelector: ".profile__avatar",
});

console.log(userInfo.getUserInfo());

// ////// CONFIRMATION & IMAGE POPUP

const imagePopup = new PopupWithImage(".popup_type_open-image");
imagePopup.setEventListeners();

const confirmationPopup = new PopupWithConfirmation(".popup_type_confirm");
confirmationPopup.setEventListeners();

// ////////// CREATE CARD

function openImagePopup(cardData) {
  imagePopup.open(cardData);
}

function createCard(cardData) {
  const cardElement = new Card(
    currentUserId,
    cardData,
    openImagePopup,
    ".cards__item-template"
  );
  return cardElement.generateCard();
}

const cardsList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    },
  },
  ".cards__list"
);

///////////////// ADD IMAGE FORM ///////////////

const popupAddImageForm = new PopupWithForm(".popup_type_add-image", (data) => {
  popupAddImageForm.renderLoading(true);
  api
    .createNewCard(data)
    .then((newCard) => {
      cardsList.addItem(createCard(newCard));
      popupAddImageForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupAddImageForm.renderLoading(false));
});

buttonAddImage.addEventListener("click", () => {
  validateImageForm.resetValidationMessage();
  popupAddImageForm.open();
});

popupAddImageForm.setEventListeners();

//////////////  EDIT PROFILE & AVATAR /////////////

function changeProfile(data) {
  popupEditProfileForm.renderLoading(true);
  api
    .createNewUser(data)
    .then((item) => {
      userInfo.setUserInfo(item);
      popupEditProfileForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfileForm.renderLoading(false);
    });
}

function changeAvatar(data) {
  popupChangeAvatarForm.renderLoading(true);
  api
    .createNewAvatar(data)
    .then((item) => {
      userInfo.setUserInfo(item);
      popupChangeAvatarForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupChangeAvatarForm.renderLoading(false);
    });
}

const popupChangeAvatarForm = new PopupWithForm(
  ".popup_type_change-avatar",
  changeAvatar
);

const popupEditProfileForm = new PopupWithForm(
  ".popup_type_profile",
  changeProfile
);

popupChangeAvatarForm.setEventListeners();
popupEditProfileForm.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  popupEditProfileForm.setInputValues(userInfo.getUserInfo());
  popupEditProfileForm.open();
});

buttonChangeAvatar.addEventListener("click", () => {
  popupChangeAvatarForm.open();
});

// ////////// FORM VALIDATION ////////////////////

/**
 * 20-29 min - создание первого фетч запроса на получение карточки
 * 33, 35, мин добавленик новой карточки
 * 41 min refactor similar code (token,header, res.ok)
 * 51 почему catch выполняется в индекс а не в апи где совершается запрос
 * 56 информация о пользователи приходит
 * 58 Promise.all
 * 1:00 userId
 * 1:11, 1:16 deletetask
 */
