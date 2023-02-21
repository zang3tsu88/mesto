import { initialCards } from "./cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidate.js";

const ESC_KEY_CODE = "Escape";

// Pop-ups
const popupProfile = document.querySelector(".popup_type_profile");
const popupAddImage = document.querySelector(".popup_type_add-image");
const popupViewImage = document.querySelector(".popup_type_open-image");

//  Buttons
const buttonCloseList = document.querySelectorAll(".popup__close-btn");
const buttonEditProfile = document.querySelector(".profile__edit-btn");
const buttonAddImage = document.querySelector(".profile__btn-add-img");

// Gallery
const gallery = document.querySelector(".cards__list");

// Image Popup
const bigImageTitle = popupViewImage.querySelector(".popup__image-title");
const bigImage = popupViewImage.querySelector(".popup__image");

// Forms
const profileForm = popupProfile.querySelector(
  ".popup__form_type_edit-profile"
);
const imageForm = popupAddImage.querySelector(".popup__form_type_add-img");

// User Profile data on page
const userName = document.querySelector(".profile__user-name");
const userOccupation = document.querySelector(".profile__user-occupation");

// User Profile Form Input Fields
const formName = popupProfile.querySelector(".popup__input_type_name");
const formOccupation = popupProfile.querySelector(
  ".popup__input_type_occupation"
);

// Add Image Form Input Fields
const formImageTitle = imageForm.querySelector(
  ".popup__input_type_image-title"
);
const formImageUrl = imageForm.querySelector(".popup__input_type_image-url");

// Open and Close Pop-up
function openPopup(popup) {
  popup.classList.add("popup_active");
  document.addEventListener("keydown", closePopupByEsc);
  document.addEventListener("mousedown", closePopupByClickOnOverlay);
}

function openImagePopup(link, name) {
  bigImage.src = link;
  bigImage.alt = name;
  bigImageTitle.textContent = name;

  openPopup(popupViewImage);
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
  document.removeEventListener("keydown", closePopupByEsc);
  document.removeEventListener("click", closePopupByClickOnOverlay);
}

function closePopupByEsc(e) {
  if (e.key === ESC_KEY_CODE) {
    const openedPopup = document.querySelector(".popup_active");
    closePopup(openedPopup);
  }
}

function closePopupByClickOnOverlay(e) {
  if (e.target.classList.contains("popup_active")) {
    closePopup(e.target);
  }
}

function createCard(card) {
  const cardElement = new Card(card, ".cards__item-template");
  return cardElement.generateCard();
}

function renderCards() {
  initialCards.forEach((item) => {
    const card = new Card(item, ".cards__item-template", openImagePopup);
    const cardElement = card.generateCard();
    gallery.prepend(cardElement);
  });
}

// Load Profile Info from main page into popup form inputs
function insertProfileInfo() {
  formName.value = userName.textContent;
  formOccupation.value = userOccupation.textContent;
}

// Forms
function handleSubmitProfileForm(event) {
  event.preventDefault();

  userName.textContent = formName.value;
  userOccupation.textContent = formOccupation.value;

  closePopup(popupProfile);
}

function handleAddImageForm(event) {
  event.preventDefault();

  const newCard = createCard({
    name: formImageTitle.value,
    link: formImageUrl.value,
  });

  gallery.prepend(newCard);
  imageForm.reset();
  closePopup(popupAddImage);
}

profileForm.addEventListener("submit", handleSubmitProfileForm);
imageForm.addEventListener("submit", handleAddImageForm);

// Profile Popup
buttonEditProfile.addEventListener("click", () => {
  openPopup(popupProfile);
  insertProfileInfo();
});

// Add Image Popup
buttonAddImage.addEventListener("click", () => {
  openPopup(popupAddImage);
});
// Close Buttons and Popups
buttonCloseList.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error-msg_active",
};

const validatorProfileForm = new FormValidator(config, profileForm);
const validatorImageForm = new FormValidator(config, imageForm);
validatorProfileForm.enableValidation();
validatorImageForm.enableValidation();
