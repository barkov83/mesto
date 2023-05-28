import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);        
        this._photoInWindow = this._popup.querySelector(".popup__photo-image");
        this._namePhotoInWindow = this._popup.querySelector(".popup__photo-caption");
    }

    //открытие попапа
    open(name, link) {
        super.open();

        this._photoInWindow.src = link;
        this._photoInWindow.alt = name;
        this._namePhotoInWindow.textContent = name;
    }
}
