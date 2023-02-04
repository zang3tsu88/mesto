const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error-msg_active",
};

function showInputError(formElement, inputElement, obj, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(obj.inputErrorClass);
  errorElement.classList.add(obj.errorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement, obj) {
  if (!inputElement.checkValidity()) {
    showInputError(
      formElement,
      inputElement,
      obj,
      inputElement.validationMessage
    );
  } else {
    hideInputError(formElement, inputElement, obj);
  }
}

function setEventListeners(formElement, obj) {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const submitButton = formElement.querySelector(obj.submitButtonSelector);

  toggleButtonState(inputList, submitButton, obj);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, obj);
      toggleButtonState(inputList, submitButton, obj);
    });
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.checkValidity();
  });
}
// disable/enableSubmitButton лежит рядом с closePopup в index.js

function toggleButtonState(inputList, buttonElement, obj) {
  if (hasInvalidInput(inputList)) {
    // buttonElement.classList.add(obj.inactiveButtonClass);
    // buttonElement.setAttribute("disabled", true);
    disableSubmitButton(buttonElement);
  } else {
    // buttonElement.classList.remove(obj.inactiveButtonClass);
    // buttonElement.removeAttribute("disabled");
    enableSubmitButton(buttonElement);
  }
}

function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, obj);
  });
}

enableValidation(config);
