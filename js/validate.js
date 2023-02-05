const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error-msg_active",
};

function showInputError(formElement, inputElement, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(obj.inputErrorClass);
  errorElement.classList.add(obj.errorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideInputError(formElement, inputElement, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement, obj) {
  if (!inputElement.checkValidity()) {
    showInputError(formElement, inputElement, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
}

function setEventListeners(formElement, buttonElement, obj) {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));

  toggleButtonState(inputList, buttonElement, obj);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, obj);
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.checkValidity();
  });
}

function disableSubmitButton(buttonElement, obj) {
  buttonElement.classList.add(obj.inactiveButtonClass);
  // buttonElement.setAttribute("disabled", true);
  buttonElement.disabled = true;
}

function enableSubmitButton(buttonElement, obj) {
  buttonElement.classList.remove(obj.inactiveButtonClass);
  // buttonElement.removeAttribute("disabled");
  buttonElement.disabled = false;
}

function toggleButtonState(inputList, buttonElement, obj) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, obj);
  } else {
    enableSubmitButton(buttonElement, obj);
  }
}

function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));

  formList.forEach((formElement) => {
    const submitButton = formElement.querySelector(obj.submitButtonSelector);
    formElement.addEventListener("submit", () => {
      disableSubmitButton(submitButton, obj);
    });
    setEventListeners(formElement, submitButton, obj);
  });
}

enableValidation(config);
