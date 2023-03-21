const formValidationConfig = {
  formSelector: '.popup__forms',
  inputSelector: '.popup__form-item',
  errorClass: 'popup__form-item_type_error',
  buttonSelector: '.popup__save',
  buttonDisabledClass: 'popup__save_disabled',
}

//отключить отправку
const disableSubmit = (event) => {
  event.preventDefault();
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    enableFormValidation(form, config);
  });
}

function enableFormValidation(form, config) {
  form.addEventListener('submit', disableSubmit);
  form.addEventListener('input', () => {
    toggleButton(form, config);
  });

  addInputListeners(form, config);
  toggleButton(form, config);
}

function handleFormInput(event, config) {
  const input = event.target;
  const inputID = input.id;
  const errorElement = document.querySelector(`#${inputID}-error`);

  if (input.validity.valid) {
    input.classList.remove(config.errorClass)
    errorElement.textContent = '';
  } else {
    input.classList.add(config.errorClass);
    errorElement.textContent = input.validationMessage;
  }
}

//активация кнопки отправки
function toggleButton(form, config) {
  const buttonSubmit = form.querySelector(config.buttonSelector);
  const isFormValid = form.checkValidity();

  buttonSubmit.disabled = !isFormValid;
  buttonSubmit.classList.toggle(config.buttonDisabledClass, !isFormValid);
}

function addInputListeners(form, config) {
  const inputList = form.querySelectorAll(config.inputSelector);

  inputList.forEach(function (item) {
    item.addEventListener('input', (event) => {
      handleFormInput(event, config)
    })
  });
}


function disableSubmitButton() {
  const buttonSubmitDisable = document.querySelector('.newplace__save');

  buttonSubmitDisable.disabled = true;
  buttonSubmitDisable.classList.add('popup__save_disabled')
};

enableValidation(formValidationConfig);
