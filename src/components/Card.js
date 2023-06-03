import { popupNewplaceWindow, photoInWindow, namePhotoInWindow } from "#utils/constants.js";

export class Card {
    constructor(cardData, templateSelector, handleCardClickCb, handleLikeClickCb, handleCardDeleteCb, userId) {
        this._data = cardData;
        this._templateSelector = templateSelector;
        this._handleCardClickCb = handleCardClickCb;
        this._handleLikeClickCb = handleLikeClickCb;
        this._handleCardDeleteCb = handleCardDeleteCb;
        this._userId = userId;
        this._likesCount = 0;
        this._isOwnCard = false;
        this._hasUserLike = false;
        this._imageElement = undefined;
        this._likeButtonElement = undefined;
        this._likesCountElement = undefined;
        this._deleteCardButton = undefined;

        this._updateStats(cardData);
    }

    _updateStats(data) {
        const { _userId: userId } = this;

        this._likesCount = data.likes.length;
        this._isOwnCard = data.owner._id === userId;
        this._hasUserLike = data.likes.some(({ _id }) => _id === userId);
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content.querySelector(".card")
            .cloneNode(true);

        return cardElement;
    }

    _handleOpenPopup() {
        photoInWindow.src = this._data.link;
        namePhotoInWindow.textContent = this._data.name;
        popupNewplaceWindow.classList.add("popup_opened");
    }

    _handleLikeCard() {
        this._handleLikeClickCb(this._data._id, !this._hasUserLike).then((cardData) => {
            this._updateStats(cardData);
            this._likesCountElement.textContent = `${this._likesCount}`;
            this._likeButtonElement.classList.toggle("card__like_active");
        });
    }

    _handleDeleteCard() {
        this._handleCardDeleteCb(this._data._id)
            .then(() => this._element.remove())
    }

    _setEventListeners() {
        this._imageElement.addEventListener("click", this._handleOpenPopup.bind(this));
        this._likeButtonElement.addEventListener("click", this._handleLikeCard.bind(this));
        this._deleteCardButton.addEventListener("click", this._handleDeleteCard.bind(this));
        this._imageElement.addEventListener("click", () => this._handleCardClickCb(this._data.name, this._data.link));
    }

    generateCard() {
        this._element = this._getTemplate();
        this._imageElement = this._element.querySelector(".card__image");
        this._likeButtonElement = this._element.querySelector(".card__like");
        this._deleteCardButton = this._element.querySelector(".card__trash");
        this._likesCountElement = this._element.querySelector(".card__likes");

        this._imageElement.src = this._data.link;
        this._element.querySelector(".card__title").textContent = this._data.name;

        if (!this._isOwnCard) {
            this._deleteCardButton.classList.add("card__trash_hidden");
        }

        if (this._hasUserLike) {
            this._likeButtonElement.classList.add("card__like_active");
        }

        this._likesCountElement.textContent = `${this._likesCount}`;
        this._setEventListeners();

        return this._element;
    }
}
