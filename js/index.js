import { initialCards } from "./cards.js";
import { Card } from "./Card.js";

const ESC_KEY_CODE = "Escape";

// Pop-ups
const popupProfile = document.querySelector(".popup_type_profile");
const popupAddImage = document.querySelector(".popup_type_add-image");
const popupViewImage = document.querySelector(".popup_type_open-image");

// Close Buttons
const buttonCloseList = document.querySelectorAll(".popup__close-btn");

// Profile
const buttonEditProfile = document.querySelector(".profile__edit-btn");

// Add Image Popup
const buttonAddImage = document.querySelector(".profile__btn-add-img");

// View Image Popup
const cardImage = document.querySelector(".cards__image");
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

// Gallery & Template
const cardTemplate = document
  .querySelector(".cards__item-template")
  .content.querySelector(".cards__item");
const gallery = document.querySelector(".cards__list");

// Open and Close Pop-up
function openPopup(popup) {
  popup.classList.add("popup_active");
  document.addEventListener("keydown", closePopupByEsc);
  document.addEventListener("mousedown", closePopupByClickOnOverlay);
}
// Разобраться на будущее:
// Почему слушатель не работает нормально если вешать на попап.
// popup.addEventListener("keydown", closeByEsc);

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
  // const cardElement = cardTemplate.cloneNode("true");

  // const cardImage = cardElement.querySelector(".cards__image");
  // const cardTitle = cardElement.querySelector(".cards__title");

  // cardImage.src = card.link;
  // cardImage.alt = card.name;
  // cardTitle.textContent = card.name;

  // const deleteImageButton = cardElement.querySelector(".cards__trash");
  // deleteImageButton.addEventListener("click", deleteCard);

  // const likeButton = cardElement.querySelector(".cards__like");
  // likeButton.addEventListener("click", likeCard);

  // cardImage.addEventListener("click", () => {
  //   openImagePopup(card);
  // });

  return cardElement.generateCard();
}

// function renderCards() {
//   initialCards.forEach((item) => {
//     const card = createCard(item);
//     gallery.prepend(card);
//   });
// }
function renderCards() {
  initialCards.forEach((item) => {
    const card = new Card(item, ".cards__item-template", openImagePopup);
    const cardElement = card.generateCard();
    gallery.prepend(cardElement);
  });
}

// Added if/else construct, addeed galary event listeners

// Стоило ли переделывать на всплытие? addEventListener лучше тут оставить или куда-то(например вниз перенести)

// Я сделал их раздельно, но я полагаю можно один слушатель сделать на все 3 события, вот только стоит ли? Мне кажется читаемость ухудшиться.

// function deleteCard(event) {
//   if (event.target.classList.contains("cards__trash")) {
//     event.target.closest(".cards__item").remove();
//   }
// }
// gallery.addEventListener("click", deleteCard);

// function likeCard(event) {
//   if (event.target.classList.contains("cards__like")) {
//     event.target.classList.toggle("cards__like_active");
//   }
// }
// gallery.addEventListener("click", likeCard);

// function deleteCard(event) {
//   event.target.closest(".cards__item").remove();
// }
// function likeCard(event) {
//   event.target.classList.toggle("cards__like_active");
// }

function openImagePopup(card) {
  bigImage.src = card.link;
  bigImage.alt = card.name;
  bigImageTitle.textContent = card.name;

  openPopup(popupViewImage);
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

renderCards();
