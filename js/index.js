// Pop-ups
const popupProfile = document.querySelector(".popup_type_profile");
const popupAddImage = document.querySelector(".popup_type_add-image");
const popupViewImage = document.querySelector(".popup_type_open-image");

///////////////
// Buttons
///////////////
// Profile
const openProfilePopup = document.querySelector(".profile__edit-btn");
const closeProfilePopup = popupProfile.querySelector(".popup__close-btn");

// Add Image Popup
const openAddImagePopup = document.querySelector(".profile__btn-add-img");
const closeAddImagePopup = popupAddImage.querySelector(".popup__close-btn");

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

// Load Profile Info from main page into popup form inputs
function insertProfileInfo() {
  formName.value = userName.textContent;
  formOccupation.value = userOccupation.textContent;
}

// Open and Close Pop-up
function openPopup(popup) {
  popup.classList.add("popup_active");
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
}

// Forms
function editProfileForm(event) {
  event.preventDefault();

  userName.textContent = formName.value; // new function for profile and
  userOccupation.textContent = formOccupation.value; //image form values

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

  closePopup(popupAddImage);
}

function createCard(card) {
  const cardTemplate = document
    .querySelector(".cards__item-template")
    .content.querySelector(".cards__item");
  const cardElement = cardTemplate.cloneNode("true");
  const cardImage = cardElement.querySelector(".cards__image");
  const cardTitle = cardElement.querySelector(".cards__title");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  const likeButton = cardElement.querySelector(".cards__like");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("cards__like_active");
  });

  const deleteImageButton = cardElement.querySelector(".cards__trash");
  deleteImageButton.addEventListener("click", () => {
    cardElement.remove();
  });

  const bigImage = popupViewImage.querySelector(".popup__image");
  cardImage.addEventListener("click", () => {
    bigImage.src = card.link;
    bigImage.alt = card.name;
    cardTitle.textContent = card.name;
    openPopup(popupViewImage);
  });

  closeViewImagePopup.addEventListener("click", () => {
    closePopup(popupViewImage);
  });

  return cardElement;
}

// function createCard({ name, link }) {
//   const cardTemplate = document
//     .querySelector(".cards__item-template")
//     .content.querySelector(".cards__item");
//   const cardElement = cardTemplate.cloneNode("true");
//   const cardImage = cardElement.querySelector(".cards__image");
//   const cardTitle = cardElement.querySelector(".cards__title");

//   cardImage.src = link;
//   cardImage.alt = name;
//   cardTitle.textContent = name;

//   const likeButton = cardElement.querySelector(".cards__like");
//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("cards__like_active");
//   });

//   const deleteImageButton = cardElement.querySelector(".cards__trash");
//   deleteImageButton.addEventListener("click", () => {
//     cardElement.remove();
//   });

//   function previewImage() {
//     openViewImagePopup.addEventListener("click", () => {
//       openPopup(popupViewImage);
//     });

//     closeViewImagePopup.addEventListener("click", () => {
//       closePopup(popupViewImage);
//     });
//   }
//   previewImage(cardImage);

//   return cardElement;
// }

function renderCards() {
  initialCards.forEach((item) => {
    const card = createCard(item);
    gallery.prepend(card);
  });
}

// Profile Popup
openProfilePopup.addEventListener("click", () => {
  openPopup(popupProfile);
  insertProfileInfo();
});

closeProfilePopup.addEventListener("click", () => {
  closePopup(popupProfile);
});

profileForm.addEventListener("submit", editProfileForm);

// Add Image Popup
openAddImagePopup.addEventListener("click", () => {
  openPopup(popupAddImage);
});

closeAddImagePopup.addEventListener("click", () => {
  closePopup(popupAddImage);
});

imageForm.addEventListener("submit", addImageForm);
// View Image Popup

// openViewImagePopup.addEventListener("click", () => {
//   openPopup(popupViewImage);
// });

// closeViewImagePopup.addEventListener("click", () => {
//   closePopup(popupViewImage);
// });

renderCards();
