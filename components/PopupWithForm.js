import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitFn) {
    super(popupSelector);
    this._formSubmit = formSubmitFn;
    this._popupForm = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__input");

    this._inputValues = {}; // может переделать в const ?

    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners;
    this._popupForm.addEventlistener("submit", (e) => {
      e.preventDefault();
      this._formSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
