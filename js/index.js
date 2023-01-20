// Pop-ups
const popupProfile = document.querySelector(".popup_type_profile");
const popupAddImage = document.querySelector(".popup_type_add-image");
const popupViewImage = document.querySelector(".popup_type_open-image");

// Profile
const buttonEditProfile = document.querySelector(".profile__edit-btn");
const buttonCloseEditProfilePopup =
  popupProfile.querySelector(".popup__close-btn");

// Add Image Popup
const buttonAddImage = document.querySelector(".profile__btn-add-img");
const buttonCloseAddImagePopup =
  popupAddImage.querySelector(".popup__close-btn");

// View Image Popup
const openViewImagePopup = document.querySelector(".cards__image");
const closeViewImagePopup = popupViewImage.querySelector(".popup__close-btn");

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

// Gallery
const gallery = document.querySelector(".cards__list");

// Open and Close Pop-up
function openPopup(popup) {
  popup.classList.add("popup_active");
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
}

function createCard(card) {
  // ({ name, link }) ? Не решу как лучше...
  const cardTemplate = document
    .querySelector(".cards__item-template")
    .content.querySelector(".cards__item");
  const cardElement = cardTemplate.cloneNode("true");
  const cardImage = cardElement.querySelector(".cards__image");
  const cardTitle = cardElement.querySelector(".cards__title");

  cardImage.src = card.link; // link
  cardImage.alt = card.name; // name
  cardTitle.textContent = card.name;

  const likeButton = cardElement.querySelector(".cards__like");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("cards__like_active");
  });

  const deleteImageButton = cardElement.querySelector(".cards__trash");
  deleteImageButton.addEventListener("click", () => {
    cardElement.remove();
  });

  const bigImageTitle = popupViewImage.querySelector(".popup__image-title");
  const bigImage = popupViewImage.querySelector(".popup__image");
  // Не уверен что придумал хорошее имя переменной...
  // previewImage не подходит, fullScreenImage тоже...
  cardImage.addEventListener("click", () => {
    bigImage.src = card.link;
    bigImage.alt = card.name;
    bigImageTitle.textContent = card.name;
    openPopup(popupViewImage);
  });

  closeViewImagePopup.addEventListener("click", () => {
    closePopup(popupViewImage);
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
  event.preventDefault();

  userName.textContent = formName.value;
  userOccupation.textContent = formOccupation.value;

  closePopup(popupProfile);
}

function addImageForm(event) {
  event.preventDefault();

  const formImageTitle = imageForm.querySelector(
    ".popup__input_type_image-title"
  );
  const formImageUrl = imageForm.querySelector(".popup__input_type_image-url");

  const newCard = createCard({
    name: formImageTitle.value,
    link: formImageUrl.value,
  });

  gallery.prepend(newCard);

  formImageTitle.value = "";
  formImageUrl.value = "";

  closePopup(popupAddImage);
}

// Profile Popup
buttonEditProfile.addEventListener("click", () => {
  openPopup(popupProfile);
  insertProfileInfo();
});

buttonCloseEditProfilePopup.addEventListener("click", () => {
  closePopup(popupProfile);
});

profileForm.addEventListener("submit", editProfileForm);

// Add Image Popup
buttonAddImage.addEventListener("click", () => {
  openPopup(popupAddImage);
});

buttonCloseAddImagePopup.addEventListener("click", () => {
  closePopup(popupAddImage);
});

imageForm.addEventListener("submit", addImageForm);

renderCards();
