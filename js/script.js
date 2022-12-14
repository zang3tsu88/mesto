const popup = document.querySelector(".popup");

// Buttons
const openProfilePopup = document.querySelector(".profile__edit-btn");
const closeProfilePopup = document.querySelector(".popup_close-btn");
const submitButton = document.querySelector(".popup__submit-btn");

// Open and Close Pop-up
openProfilePopup.addEventListener("click", () => {
  popup.classList.add("popup_active");
})

function closePopup() {
  popup.classList.remove("popup_active");
}
// closeProfilePopup.addEventListener("click", () => {
//   popup.classList.remove("popup_active");
// })

// User Profile data on page
const userName = document.querySelector(".profile__user-name");
const userOccupation = document.querySelector(".profile__user-occupation");

// Form Input Fields
const formName = popup.querySelector(".popup__name");
const formOccupation = popup.querySelector(".popup__occupation");

// Form Submit
function formSubmit(evt) {
  evt.preventDefault(); // не много не понял, работает нормально и без этого
  userName.textContent = formName.value;  // почему formName показывает что он let, когда он const.
  userOccupation.textContent = formOccupation.value;
  closePopup();
  formName.value = "";          //  после закрытия формы, очищает поле ввода,
  formOccupation.value = "";    //  что бы при следующем открытии не отображалось ничего кроме placeholder
}

// submitButton.addEventListener("click", () => {
  //   userName.value = formName.value;
  // })

submitButton.addEventListener("click", formSubmit);
closeProfilePopup.addEventListener("click", closePopup);
