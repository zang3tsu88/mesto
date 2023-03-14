import { config } from "../utils/config.js";
import { initialCards } from "../utils/cards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidate.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

//  Buttons
const buttonEditProfile = document.querySelector(".profile__edit-btn");
const buttonAddImage = document.querySelector(".profile__btn-add-img");

// Forms
const profileForm = document.forms.editProfileFormPopup;
const imageForm = document.forms.addImageFormPopup;

// User Profile Form Input Fields
const formName = profileForm.querySelector(".popup__input_type_name");
const formOccupation = profileForm.querySelector(
  ".popup__input_type_occupation"
);

// // Open and Close Pop-up
// function openPopup(popup) {
//   popup.classList.add("popup_active");
//   document.addEventListener("keydown", closePopupByEsc);
//   document.addEventListener("mousedown", closePopupByClickOnOverlay);
// }

// function openImagePopup(link, name) {
//   bigImage.src = link;
//   bigImage.alt = name;
//   bigImageTitle.textContent = name;

//   openPopup(popupViewImage);
// }

// function closePopup(popup) {
//   popup.classList.remove("popup_active");
//   document.removeEventListener("keydown", closePopupByEsc);
//   document.removeEventListener("mousedown", closePopupByClickOnOverlay);
// }

// function closePopupByEsc(e) {
//   if (e.key === ESC_KEY_CODE) {
//     const openedPopup = document.querySelector(".popup_active");
//     closePopup(openedPopup);
//   }
// }

// function closePopupByClickOnOverlay(e) {
//   if (e.target.classList.contains("popup_active")) {
//     closePopup(e.target);
//   }
// }

// function renderCards() {
//   initialCards.forEach((item) => {
//     const cardElement = createCard(item);
//     gallery.prepend(cardElement);
//   });
// }
// renderCards();

function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    {
      openImagePopupFn: () => {
        imagePopup.open(cardData);
      },
    },
    ".cards__item-template"
  );
  return cardElement.generateCard();
}

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    },
  },
  ".cards__list"
);
cardsList.renderItems();

const imagePopup = new PopupWithImage(".popup_type_open-image");
imagePopup.setEventListeners();

////////////////// ***** ADD IMAGE FORM ************************

const popupAddImageForm = new PopupWithForm(
  ".popup_type_add-image",
  (newCard) => {
    const cardData = {
      name: newCard["image-title"],
      link: newCard["image-url"],
    };

    const cardElement = createCard(cardData);
    cardsList.addItem(cardElement);
  }
);

buttonAddImage.addEventListener("click", () => {
  popupAddImageForm.open();
});

popupAddImageForm.setEventListeners();

////////////////// ******* EDIT PROFILE ****************************

const popupEditProfileForm = new PopupWithForm(
  ".popup_type_profile",
  (data) => {
    userInfo.setUserInfo(data.name, data.occupation);
  }
);
popupEditProfileForm.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__user-name",
  occupationSelector: ".profile__user-occupation",
});
userInfo.getUserInfo();
console.log(userInfo.getUserInfo()); // console log

buttonEditProfile.addEventListener("click", () => {
  const userProfile = userInfo.getUserInfo();
  formName.value = userProfile.name;
  formOccupation.value = userProfile.occupation;
  popupEditProfileForm.open();
});

////////////////////////////////////////////
////////////////////////////////////////////

// // Load Profile Info from main page into popup form inputs
// function insertProfileInfo() {
//   formName.value = userName.textContent;
//   formOccupation.value = userOccupation.textContent;
// }

// // Forms
// function handleSubmitProfileForm(event) {
//   event.preventDefault();

//   userName.textContent = formName.value;
//   userOccupation.textContent = formOccupation.value;

//   closePopup(popupProfile);
// }

// function handleAddImageForm() {
//   const newCard = createCard({
//     name: formImageTitle.value,
//     link: formImageUrl.value,
//   });

//   cardsList.renderItems(newCard);
//   popupAddImageForm.close();
// }

const validateProfileForm = new FormValidator(config, profileForm);
const validateImageForm = new FormValidator(config, imageForm);

validateProfileForm.enableValidation();
validateImageForm.enableValidation();

// // Profile Popup
// buttonEditProfile.addEventListener("click", () => {
//   validateProfileForm.resetValidationMessage();
//   openPopup(popupProfile);
//   insertProfileInfo();
// });

// // Add Image Popup
// buttonAddImage.addEventListener("click", () => {
//   imageForm.reset();
//   validateImageForm.resetValidationMessage();
//   openPopup(popupAddImage);
// });

// profileForm.addEventListener("submit", handleSubmitProfileForm);
// imageForm.addEventListener("submit", handleAddImageForm);

// // Close Buttons and Popups
// buttonCloseList.forEach((button) => {
//   const popup = button.closest(".popup");
//   button.addEventListener("click", () => closePopup(popup));
// });
