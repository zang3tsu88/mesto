// Pop-up
const popup = document.querySelector(".popup");

// Buttons
const openProfilePopup = document.querySelector(".profile__edit-btn");
const closeProfilePopup = document.querySelector(".popup__close-btn");

// Form
const popupForm = document.querySelector(".popup__form");

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
popupForm.addEventListener("submit", formSubmit);
closeProfilePopup.addEventListener("click", closePopup);
