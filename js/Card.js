export default class Card {
  constructor(data, templateSelector, openImagePopupFn) {
    this._templateSelector = templateSelector; // ".cards__item-template"
    this._imgLink = data.link;
    this._imgName = data.name;
    this._openImagePopup = openImagePopupFn;
  }
  // возможно тут нужен другой теплейт или cards__item
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".cards__item")
      .cloneNode("true");

    return cardTemplate;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardTrash = this._card.querySelector(".cards__trash");
    this._cardLike = this._card.querySelector(".cards__like");
    this._cardImage = this._card.querySelector(".cards__image");
    this._cardTitle = this._card.querySelector(".cards__title");
    this._cardImage.src = this._imgLink;
    this._cardImage.alt = this._imgName;
    this._cardTitle.textContent = this._imgName;

    this._setEventListeners();

    return this._card;
  }

  _deleteCard() {
    this._card.remove();
  }

  _togglelikeCard() {
    this._cardLike.classList.toggle("cards__like_active");
  }

  _setEventListeners() {
    this._cardTrash.addEventListener("click", () => {
      this._deleteCard();
    });

    this._cardLike.addEventListener("click", () => {
      this._togglelikeCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._openImagePopup(this._imgLink, this._imgName);
    });
  }
}
