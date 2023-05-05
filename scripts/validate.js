const formValidationConfig = {
  formSelector: '.popup__forms',
  inputSelector: '.popup__form-item',
  errorClass: 'popup__form-item_type_error',
  buttonSelector: '.popup__save',
  buttonDisabledClass: 'popup__save_disabled',
  buttonSelectorNewplace: '.newplace__save',
};

// ***FormValidator.js***
//Принимать в конструктор объект настроек с классами формы;
// Принимать в конструктор ссылку на HTML-элемент проверяемой формы;
class FormValidator {
  constructor(formValidationConfig, formElement) {
    this._formSelector = formValidationConfig.formSelector;
    this._inputSelector = formValidationConfig._inputSelector;
    this._errorClass = formValidationConfig._errorClass;
    this._buttonSelector = formValidationConfig._buttonSelector;
    this._buttonDisabledClass = formValidationConfig._buttonDisabledClass;
    this._buttonSelectorNewplace = formValidationConfig._buttonSelectorNewplace;
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
    // this._handleFormInput();
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
function disableSubmitButton() {
  const buttonSubmitDisable = document.querySelector(formValidationConfig.buttonSelectorNewplace);

  buttonSubmitDisable.disabled = true;
  buttonSubmitDisable.classList.add(formValidationConfig.buttonDisabledClass);
};


// *** index.js ***
// const formElementEditProfile  строка 42
// cons formElementNewPlace строка 183

const profileFormValidator = new FormValidator(formValidationConfig, formElementEditProfile);
const newCardFormValidator = new FormValidator(formValidationConfig, formElementNewPlace);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();