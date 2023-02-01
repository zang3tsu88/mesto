const formElement = document.querySelector(".popup__form");
const formInput = formElement.querySelector(".popup__input");
const formError = formElement.querySelector(`.${formInput.id}-error`);

function showInputError(input) {
  input.classList.add("popup__input_type_error");
  formError.classList.add("popup__input-error-msg_active");
  formError.textContent = input.validationMessage;
}

function hideInputError(input) {
  input.classList.remove("popup__input_type_error");
  formError.classList.remove("popup__input-error-msg_active");
}

function isValid() {
  if (!formInput.checkValidity()) {
    showInputError(formInput);
  } else {
    hideInputError(formInput);
  }
}

formInput.addEventListener("input", isValid);
