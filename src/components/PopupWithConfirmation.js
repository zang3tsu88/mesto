import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, deleteMyCardFn) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(".popup__form");
    this._buttonSubmit = this._formElement.querySelector(".popup__submit-btn");
    this._deleteMyCard = deleteMyCardFn;
    this._buttonSubmitText = this._buttonSubmit.textContent;
  }

  changeSubmitHandler(item) {
    this._deleteMyCard = item;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._deleteMyCard();
    });
  }

  // Так.. наверное надо перенести в Popup, а то одинаковые с PopupWithFOrm
  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = "Сохранение...";
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
  }
}
