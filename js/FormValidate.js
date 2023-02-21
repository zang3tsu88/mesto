export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._config = config;
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._formElement.addEventListener("submit", () => {
      _disableSubmitButton();
    });
  }

  _disableSubmitButton()
}
