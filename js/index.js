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

function createCard(card) {
  const cardElement = cardTemplate.cloneNode("true");
  const cardImage = cardElement.querySelector(".cards__image");
  const cardTitle = cardElement.querySelector(".cards__title");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  // MOVED IT OUT OF THE CARD FUNCTION BELOW TO LIKE/DELETE FUNCITON.

  // const deleteImageButton = cardElement.querySelector(".cards__trash");
  // deleteImageButton.addEventListener("click", deleteCard);

  // const likeButton = cardElement.querySelector(".cards__like");
  // likeButton.addEventListener("click", likeCard);

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

// Added if/else construct, addeed galary event listeners

// ВОПРОС:

// Стоило ли переделывать на всплытие? addEventListener лучше тут оставить или куда-то(например вниз перенести)

// Я сделал их раздельно, но я полагаю можно один слушатель сделать на все 3 события, вот только стоит ли? Мне кажется читаемость ухудшиться.

function deleteCard(event) {
  if (event.target.classList.contains("cards__trash")) {
    event.target.closest(".cards__item").remove();
  }
}
gallery.addEventListener("click", deleteCard);

function likeCard(event) {
  if (event.target.classList.contains("cards__like")) {
    event.target.classList.toggle("cards__like_active");
  }
}
gallery.addEventListener("click", likeCard);

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
function handlePopupClose() {
  buttonCloseList.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(popup));
  });

  const allPopups = Array.from(document.querySelectorAll(".popup"));
  allPopups.forEach((popup) => {
    document.addEventListener("keydown", (e) => {
      if (popup.classList.contains("popup") && e.key === "Escape") {
        closePopup(popup);
      }
    });

    // ЭТУ НИЖЕ ПЕРЕПИСАЛ ЧЕРЕЗ ВСПЛЫТИЕ, НАВЕРНОЕ ТАК ЛУЧШЕ.

    // popup.addEventListener("click", (e) => {
    //   if (e.currentTarget === e.target) {
    //     closePopup(popup);
    //   }
    // });
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup")) {
      closePopup(e.target);
    }
  });
}

renderCards();

handlePopupClose();
