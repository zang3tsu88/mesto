import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitFn) {
    super(popupSelector);
    this._formSubmit = formSubmitFn;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._inputValues = {};

    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }
  /**
   * В целом понял, спасибо. Но один вопрос, не совсем пойму
   *
   * Это сейчас у моих импутов и обьекта вроде совпадают названия
   * name, occupation. А если бы они отличались?
   *
   * Я ведь тогда бы не смог получить к ним доступ через data[input.name]
   * data это получаемый обьект из getUserInfo. где я прописал name
   * и occupation. И так уж совпало что у них одно имя с input.name..
   *
   *  data = {name: 'Жак-Ив Кусто', occupation: 'Исследователь океана'}
   *
   * Как тогда быть?
   */
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
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
