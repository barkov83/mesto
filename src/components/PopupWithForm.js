import { Popup } from "#components/Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormCb) {
        super(popupSelector);

        this._submitFormCb = submitFormCb;
        this._formElement = this._popup.querySelector(".popup__forms");
        this._submitButtonElement = this._formElement.querySelector(".popup__save");
        this._submitButtonText = this._submitButtonElement.textContent;
    }

    //собирает данные всех полей формы
    _getInputValues() {
        return Object.fromEntries(new FormData(this._formElement));
    }

    _restoreButtonState() {
        this._submitButtonElement.disabled = false;
        this._submitButtonElement.textContent = this._submitButtonText;
    }

    // переопределение коллбэка на сабмит формы
    setSubmitFormCallback(cb) {
        this._submitFormCb = cb;
    }

    setEventListeners() {
        //добавлять обработчик клика иконке закрытия
        super.setEventListeners();

        //добавлять обработчик сабмита формы.
        this._formElement.addEventListener("submit", async (evt) => {
            evt.preventDefault();

            this._submitButtonElement.innerText = "Сохранение...";
            this._submitButtonElement.disabled = true;

            // ожидаем асинхронный коллбэк чтобы закрыть попап при удачном ответе
            // после этого возвращаем оригинальное состояние кнопки
            // попап закрывается только при удачном ответе
            try {
                await this._submitFormCb(this._getInputValues());
                this.close();
            }
            finally {
                this._restoreButtonState();
            }
        });
    }

    //Закрыть попап
    close() {
        super.close();
        this._formElement.reset();
    }
}
