import { Popup } from "#components/Popup.js";

export class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._submitFormCb = () => {};
        this._submitButtonElement = this._popup.querySelector(".popup__save");
        this._submitButtonText = this._submitButtonElement.textContent;
    }

    _restoreButtonState() {
        this._submitButtonElement.disabled = false;
        this._submitButtonElement.textContent = this._submitButtonText;
    }

    // переопределение коллбэка на сабмит формы
    setCallback(cb) {
        this._submitFormCb = cb;
    }

    setEventListeners() {
        //добавлять обработчик клика иконке закрытия
        super.setEventListeners();

        //добавлять обработчик сабмита формы.
        this._submitButtonElement.addEventListener("click", async (evt) => {
            evt.preventDefault();

            this._submitButtonElement.innerText = "Сохранение...";
            this._submitButtonElement.disabled = true;

            // ожидаем асинхронный коллбэк чтобы закрыть попап при удачном ответе
            // после этого возвращаем оригинальное состояние кнопки
            // попап закрывается только при удачном ответе
            try {
                await this._submitFormCb();
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
    }
}
