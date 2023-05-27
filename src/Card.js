import { popupNewplaceWindow, photoInWindow, namePhotoInWindow } from "./constants.js";

export class Card {
        constructor(data, templateSelector, handleCardClickCb) {
        const { name, link } = data;
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClickCb = handleCardClickCb;
        this._image = undefined;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content.querySelector(".card")
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector(".card__image");
        this._setEventListeners();
        this._image.src = this._link;
        this._element.querySelector(".card__title").textContent = this._name;
        this._likeIcon = this._element.querySelector(".card__like");
        this._deleteCard = this._element.querySelector(".card");

        return this._element;
    }

    _handleOpenPopup() {
        photoInWindow.src = this._link;
        namePhotoInWindow.textContent = this._name;
        popupNewplaceWindow.classList.add("popup_opened");
    }

    _handleLikeCard() {
        this._likeIcon.classList.toggle("card__like_active");
    }

    _handleDeleteCard() {
        this._element.remove();
    }

    _setEventListeners() {
        this._element.querySelector(".card__image").addEventListener("click", () => this._handleOpenPopup());
        this._element.querySelector(".card__like").addEventListener("click", () => this._handleLikeCard());
        this._element.querySelector(".card__trash").addEventListener("click", () => this._handleDeleteCard());
        this._image.addEventListener("click", () => this._handleCardClickCb(this._name, this._link));
    }
}
