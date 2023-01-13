// Pop-up
const popup = document.querySelector(".popup"); //.popup_type_profile
// const popup = document.querySelector(".popup"); //.popup_type_add-image
// const popup = document.querySelector(".popup"); //.popup_type_pic

// Buttons
const openProfilePopup = document.querySelector(".profile__edit-btn");
const closeProfilePopup = document.querySelector(".popup__close-btn");

// Form
const profileForm = document.querySelector(".popup__form");

// User Profile data on page
const userName = document.querySelector(".profile__user-name");
const userOccupation = document.querySelector(".profile__user-occupation");

// Form Input Fields
const formName = popup.querySelector("#popupName");
const formOccupation = popup.querySelector("#popupOccupation");

// Open and Close Pop-up
function openPopup() {
  popup.classList.add("popup_active");
  formName.value = userName.textContent;
  formOccupation.value = userOccupation.textContent;
}

function closePopup() {
  popup.classList.remove("popup_active");
}

// Form Submit
function formSubmit(evt) {
  evt.preventDefault(); // не много не понял, работает нормально и без этого
  userName.textContent = formName.value;
  userOccupation.textContent = formOccupation.value;
  closePopup();
}

openProfilePopup.addEventListener("click", openPopup);
profileForm.addEventListener("submit", formSubmit);
closeProfilePopup.addEventListener("click", closePopup);

// // вариант I

// popupButton.addEventListener('click', function () {
//   popup.classList.add('popup_is-opened');
// });

// // вариант II

// function openPopup(popupElement) {
//   popupElement.classList.add('popup_is-opened');
// }

// popupButton.addEventListener('click', function () {
//   openPopup(popup);
// });
