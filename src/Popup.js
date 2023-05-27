export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closePopupOnEscape = this._handleEscClose.bind(this);
        this._closePopupOnOverlay = this._handleOverlayClose.bind(this);
        this._closeButton = this._popup.querySelector(".popup__close");
    }

    //закрытие попапа клавишей Esc.
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    // метод закрытия вызывающийся при клике на оверлее
    _handleOverlayClose(evt) {
        if (evt.target === this._popup) {
            this.close();
        }
    }

    //открытие попапа
    open() {
        this._popup.classList.add("popup_opened");
        this._popup.addEventListener("mousedown", this._closePopupOnOverlay);
        document.addEventListener("keydown", this._closePopupOnEscape);
    }

    //закрытие попапа
    close() {
        this._popup.classList.remove("popup_opened");
        this._popup.removeEventListener("mousedown", this._closePopupOnOverlay);
        document.removeEventListener("keydown", this._closePopupOnEscape);
    }

    
    // слушатель события кнопки закрытие попапа
    setEventListeners() {
        this._closeButton.addEventListener("click", () => this.close());
    }
}
