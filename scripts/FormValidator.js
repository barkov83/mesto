export default class FormValidator {
    constructor(formValidationConfig, formElement) {
        this._formSelector = formValidationConfig.formSelector;
        this._inputSelector = formValidationConfig.inputSelector;
        this._errorClass = formValidationConfig.errorClass;
        this._buttonSelector = formValidationConfig.buttonSelector;
        this._buttonDisabledClass = formValidationConfig.buttonDisabledClass;
        this._buttonSelectorNewplace = formValidationConfig.buttonSelectorNewplace;
        this._formElement = formElement;
    }

    //отключить отправку
    _disableSubmit = (event) => {
        event.preventDefault();
    };

    //вызвать функцию валидации
    enableValidation() {
        this._formElement.addEventListener('submit', () => {
            this._disableSubmit(event);
        });
        this._formElement.addEventListener('input', () => {
            this._toggleButton();
        });

        this._addInputListeners();
        this._toggleButton();
    }

    _handleFormInput(event) {
        const input = event.target;
        const inputID = input.id;
        const errorElement = this._formElement.querySelector(`#${inputID}-error`);

        if (input.validity.valid) {
            input.classList.remove('popup__form-item_type_error')
            errorElement.textContent = '';
        }
        else {
            input.classList.add('popup__form-item_type_error');
            errorElement.textContent = input.validationMessage;
        }
    }

    //активация кнопки отправки
    _toggleButton() {
        const buttonSubmit = this._formElement.querySelector('.popup__save');
        const isFormValid = this._formElement.checkValidity();

        buttonSubmit.disabled = !isFormValid;
        buttonSubmit.classList.toggle('popup__save_disabled', !isFormValid);
    }

    //Установить слушателей
    _addInputListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        inputList.forEach((item) => {
            item.addEventListener('input', (event) => {
                this._handleFormInput(event)
            })
        });
    }
}