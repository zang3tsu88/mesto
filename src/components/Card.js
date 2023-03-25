export default class Card {
  constructor(
    templateSelector,
    data,
    currentUserId,
    openImagePopupFn,
    deleteCardApiFn,
    likeMyCardFn,
    unlikeMyCardFn
  ) {
    this._templateSelector = templateSelector; // ".cards__item-template"
    this._imgLink = data.link;
    this._imgName = data.name;
    this._id = data._id; // card id
    this._likes = data.likes; // card likes number
    this._openImagePopup = openImagePopupFn;
    this._deleteCardApi = deleteCardApiFn;
    this._likeMyCard = likeMyCardFn;
    this._unlikeMyCard = unlikeMyCardFn;

    this._isOwner = data.owner._id === currentUserId;

    // // misc functions
    // this._handleCartByClick = handleCartByClick;
    // this._likes = data.likes;
    // this._likeMyCard = likeMyCard;
    // this._deleteLikeMyCard = deleteLikeMyCard;
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
    this._cardLikeCounter = this._card.querySelector(".cards__counter");
    this._cardImage.src = this._imgLink;
    this._cardImage.alt = this._imgName;
    this._cardTitle.textContent = this._imgName;
    this._cardLikeCounter.textContent = this._likes.length;

    if (!this._isOwner) this._cardTrash.remove();

    if (this._addlikedCard()) {
      this._cardLike.classList.add("cards__like_active");
    } else {
      this._cardLike.classList.remove("cards__like_active");
    }

    this._setEventListeners();

    return this._card;
  }

  _deleteCard() {
    this._deleteCardApi(this._id, this._card);
  }

  toggleLikeCard(data) {
    this._cardLikeCounter.textContent = data.likes.length;
    this._cardLike.classList.toggle("cards__like_active");
  }

  _addlikedCard() {
    return this._likes.find((userLike) => userLike._id === this._currentUserId);
  }

  _setLikes(e) {
    if (e.target.classList.contains("cards__like_active")) {
      this._unlikeMyCard(this._id, this);
    } else {
      this._likeMyCard(this._id, this);
    }
  }

  _setEventListeners() {
    this._cardTrash.addEventListener("click", () => {
      this._deleteCard();
    });

    this._cardLike.addEventListener("click", (e) => {
      this._setLikes(e);
    });

    this._cardImage.addEventListener("click", () => {
      this._openImagePopup({ link: this._imgLink, name: this._imgName });
    });
  }
}
