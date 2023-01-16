// Pop-ups
const popupProfile = document.querySelector(".popup_type_profile");
// const popupAddImage = document.querySelector(".popup"); //.popup_type_add-image
// const popupViewImage = document.querySelector(".popup"); //.popup_type_image

// Buttons
const openProfilePopup = document.querySelector(".profile__edit-btn");
const closeProfilePopup = document.querySelector(".popup__close-btn");

// Forms
const profileForm = document.querySelector(".popup__form");

// User Profile data on page
const userName = document.querySelector(".profile__user-name");
const userOccupation = document.querySelector(".profile__user-occupation");

// User Profile Form Input Fields
const formName = popupProfile.querySelector("#popupName");
const formOccupation = popupProfile.querySelector("#popupOccupation");

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
function formSubmit(evt) {
  evt.preventDefault(); // не много не понял, работает нормально и без этого
  userName.textContent = formName.value;
  userOccupation.textContent = formOccupation.value;
  closePopup(popupProfile);
}

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
