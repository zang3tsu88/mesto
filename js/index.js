import { config } from "./config.js";
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
const profileForm = document.forms.editProfileFormPopup;
// popupProfile.querySelector(".popup__form_type_edit-profile");
const imageForm = document.forms.addImageFormPopup;
// popupAddImage.querySelector(".popup__form_type_add-img");

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
  document.removeEventListener("mousedown", closePopupByClickOnOverlay);
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

function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    ".cards__item-template",
    openImagePopup
  );
  return cardElement.generateCard();
}

function renderCards() {
  initialCards.forEach((item) => {
    const cardElement = createCard(item);
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

const validateProfileForm = new FormValidator(config, profileForm);
const validateImageForm = new FormValidator(config, imageForm);

validateProfileForm.enableValidation();
validateImageForm.enableValidation();

// Profile Popup
buttonEditProfile.addEventListener("click", () => {
  validateProfileForm.resetValidationMessage();
  openPopup(popupProfile);
  insertProfileInfo();
});

// Add Image Popup
buttonAddImage.addEventListener("click", () => {
  validateImageForm.resetValidationMessage();
  imageForm.reset();
  openPopup(popupAddImage);
});

profileForm.addEventListener("submit", handleSubmitProfileForm);
imageForm.addEventListener("submit", handleAddImageForm);

// Close Buttons and Popups
buttonCloseList.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

renderCards(initialCards);
