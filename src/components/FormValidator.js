export class FormValidator {
    constructor(formValidationConfig, formElement) {
        this._formSelector = formValidationConfig.formSelector;
        this._inputSelector = formValidationConfig.inputSelector;
        this._errorClass = formValidationConfig.errorClass;
        this._buttonDisabledClass = formValidationConfig.buttonDisabledClass;
        this._formElement = formElement;

        this._buttonNewplaceElement = document.querySelector(formValidationConfig.buttonSelectorNewplace);
        this._buttonElement = this._formElement.querySelector(formValidationConfig.buttonSelector);
    }

    //отключить отправку
    _disableSubmit = (event) => {
        event.preventDefault();
    };

    //вызвать функцию валидации
    enableValidation() {
        this._formElement.addEventListener('submit', () => this._disableSubmit(event));
        this._formElement.addEventListener('input', () => this._toggleButton());

        this._addInputListeners();
        this._toggleButton();
    }

    _handleFormInput(event) {
        const input = event.target;
        const inputID = input.id;
        const errorElement = this._formElement.querySelector(`#${inputID}-error`);
        const isValid = input.validity.valid;

        if (!isValid) {
            input.classList.add(this._errorClass);
            errorElement.textContent = input.validationMessage;
            
            return;
        }

        input.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    //активация кнопки отправки
    _toggleButton() {
        const isFormValid = this._formElement.checkValidity();

        this._buttonElement.disabled = !isFormValid;
        this._buttonElement.classList.toggle(this._buttonDisabledClass, !isFormValid);
    }

    //Установить слушателей
    _addInputListeners() {
        this._formElement
            .querySelectorAll(this._inputSelector) // возвращает NodeList, у которого есть встроенный метод forEach
            .forEach((item) => item.addEventListener('input', this._handleFormInput.bind(this)));
    }

    // сделать кнопку отправки НЕактивной
    _disableSubmitButton() {
        this._buttonNewplaceElement.disabled = true;
        this._buttonNewplaceElement.classList.add(this._buttonDisabledClass);
    };
    
}