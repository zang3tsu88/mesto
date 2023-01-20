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
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
}

function deleteCard(evt) {
  evt.target.closest(".cards__item").remove();
}

function likeCard(evt) {
  evt.target.classList.toggle("cards__like_active");
}

function openImagePopup(card) {
  bigImage.src = card.link;
  bigImage.alt = card.name;
  bigImageTitle.textContent = card.name;
  openPopup(popupViewImage);
}

function createCard(card) {
  const cardElement = cardTemplate.cloneNode("true");
  const cardImage = cardElement.querySelector(".cards__image");
  const cardTitle = cardElement.querySelector(".cards__title");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  const deleteImageButton = cardElement.querySelector(".cards__trash");
  deleteImageButton.addEventListener("click", deleteCard);

  const likeButton = cardElement.querySelector(".cards__like");
  likeButton.addEventListener("click", likeCard);

  // Тут до конца так и не понял почему работает нижний вариант а не другие..
  // вроде передаю значения этого обьекта.. и почему пишеться через стрелку ?

  // cardImage.addEventListener("click", openImagePopup(card));
  // cardImage.addEventListener("click", openImagePopup(cardImage));
  cardImage.addEventListener("click", () => {
    openImagePopup(card);
  });

  return cardElement;
}

function renderCards() {
  initialCards.forEach((item) => {
    const card = createCard(item);
    gallery.prepend(card);
  });
}

// Load Profile Info from main page into popup form inputs
function insertProfileInfo() {
  formName.value = userName.textContent;
  formOccupation.value = userOccupation.textContent;
}

// Forms
function editProfileForm(event) {
  // edit это глагол ведь.
  // может подскажите, есть ли в практике какие-то шаблонные названия для форм,
  // я просто пытался придумать чтоб одинаковые сущности одинаково начинались.. может:
  // submitEditProfileForm, submitaddImageForm или слово Form в конце уже лишнее?
  //
  //Я просто думал чтоб одинаковые переменные типа кнопок начинались одинаково buttonOpen, buttonClose, buttonEdit, buttonSubmit.. или нужно чтоб они звучали естественно?
  //////
  event.preventDefault();

  userName.textContent = formName.value;
  userOccupation.textContent = formOccupation.value;

  closePopup(popupProfile);
}

function addImageForm(event) {
  event.preventDefault();

  const newCard = createCard({
    name: formImageTitle.value,
    link: formImageUrl.value,
  });

  gallery.prepend(newCard);

  imageForm.reset();

  closePopup(popupAddImage);
}

// Profile Popup
buttonEditProfile.addEventListener("click", () => {
  openPopup(popupProfile);
  insertProfileInfo();
});

profileForm.addEventListener("submit", editProfileForm);

// Add Image Popup
buttonAddImage.addEventListener("click", () => {
  openPopup(popupAddImage);
});

imageForm.addEventListener("submit", addImageForm);

buttonCloseList.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

renderCards();
