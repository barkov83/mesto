import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);

        this._submitForm = submitForm;
        this._form = this._popup.querySelector(".popup__forms");        
    }

    //собирает данные всех полей формы
    _getInputValues() {
        const formData = new FormData(this._form);

        return Object.fromEntries(formData);
    }

    
    
    setEventListeners() {
    //добавлять обработчик клика иконке закрытия
        super.setEventListeners();
    //добавлять обработчик сабмита формы.
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
            this.close();
        });
    }

    //Закрыть попап
    close() {
        super.close();
        this._form.reset();
    }
}
