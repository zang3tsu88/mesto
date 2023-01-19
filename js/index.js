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

// Card Buttons
const likeButton = document.querySelector(".cards__like");
const deleteImageButton = document.querySelector(".cards__trash");

// Forms
const profileForm = document.querySelector(".popup__form");

// User Profile data on page
const userName = document.querySelector(".profile__user-name");
const userOccupation = document.querySelector(".profile__user-occupation");

// User Profile Form Input Fields
const formName = popupProfile.querySelector(".popup__input_type_name");
const formOccupation = popupProfile.querySelector(
  ".popup__input_type_occupation"
);

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

// Form Submit
function formSubmit(event) {
  event.preventDefault();

  userName.textContent = formName.value; // new function for profile and
  userOccupation.textContent = formOccupation.value; //image form values
  closePopup(popupProfile);
}

//////////////////////
// Event Listeners
//////////////////////
// Profile Popup
openProfilePopup.addEventListener("click", () => {
  openPopup(popupProfile);
  insertProfileInfo();
});

closeProfilePopup.addEventListener("click", () => {
  closePopup(popupProfile);
});

profileForm.addEventListener("submit", formSubmit);

// Add Image Popup
openAddImagePopup.addEventListener("click", () => {
  openPopup(popupAddImage);
});

closeAddImagePopup.addEventListener("click", () => {
  closePopup(popupAddImage);
});

likeButton.addEventListener("click", () => {
  likeButton.classList.toggle("cards__like_active");
});

// View Image Popup
openViewImagePopup.addEventListener("click", () => {
  openPopup(popupViewImage);
});

closeViewImagePopup.addEventListener("click", () => {
  closePopup(popupViewImage);
});

function multiplier(factor) {
  return function (x) {
    return x * factor;
  };
}
