const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup-profile");

const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__subtitle");

const fromNameInput = document.querySelector('#popup__username');
const fromJobInput = document.querySelector('#popup__vocation');


function openPopup(popupElement) {
	popupElement.classList.add('popup_opened');
	document.addEventListener('keydown', closePopupOnEscape);
}

const closePopupOnEscape = (evt) => {
	if (evt.key === "Escape") {
		const popupOpened = document.querySelector('.popup_opened');
		closePopup(popupOpened);
	}
}

const closePopup = (popupElement) => {
	popupElement.classList.remove('popup_opened');
}

const handleButtonEditProfile = () => {
	openPopup(popupProfile);

	fromNameInput.value = nameInput.textContent;
	fromJobInput.value = jobInput.textContent;
};


const handleButtonClosePopupEditProfile = () => {
	closePopup(popupProfile);
};

buttonEditProfile.addEventListener("click", handleButtonEditProfile);


const formElementEditProfile = document.querySelector(".popup__forms_edit-profile");

function handleSubmitEditProfile(evt) {
	evt.preventDefault();

	nameInput.textContent = fromNameInput.value;
	jobInput.textContent = fromJobInput.value;
	handleButtonClosePopupEditProfile();
}

formElementEditProfile.addEventListener('submit', handleSubmitEditProfile);


const elementsContainer = document.querySelector('.elements__list');
const elementsContainerTemplate = document.querySelector('.elements__list-template').content;

const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
	},
];

const buttonAddNewplace = document.querySelector('.profile__add-button');
const newplace = document.querySelector('.newplace')

const handleOpenButtonAddNewplaceClick = () => {
	openPopup(newplace);
}

buttonAddNewplace.addEventListener('click', handleOpenButtonAddNewplaceClick);


/*появление 6-ти карточек при загрузке страницы*/
const popupNewplaceWindow = document.querySelector('.big-window');
const photoInWindow = document.querySelector('.big-window__image');
const namePhotoInWindow = document.querySelector('.big-window__caption');

const renderCard = (item) => {
	const placeElement = elementsContainerTemplate.querySelector('.card').cloneNode(true);
	const cardImage = placeElement.querySelector('.card__image');
	cardImage.src = item.link;
	cardImage.alt = item.name;

	placeElement.querySelector('.card__title').textContent = item.name;

	const likeButton = placeElement.querySelector('.card__like');
	likeActive = () => {
		likeButton.classList.toggle('card__like_active');
	}
	likeButton.addEventListener('click', likeActive);

	const trashButton = placeElement.querySelector('.card__trash');
	trashActive = () => {
		placeElement.remove();
	}
	trashButton.addEventListener('click', trashActive);

	/*открытие окна с большой картинкой*/
	const clickOnCardImage = cardImage;

	openPopupNewplaceWindow = () => {
		openPopup(popupNewplaceWindow);

		photoInWindow.src = item.link;
		photoInWindow.alt = item.name;
		namePhotoInWindow.textContent = item.name;
	}

	clickOnCardImage.addEventListener('click', openPopupNewplaceWindow);

	return placeElement;
}

initialCards.forEach((item) => {
	elementsContainer.append(renderCard(item));
})


const nameNewplaceFormInput = document.querySelector('.newplace__form-input');
const newplaceFormLink = document.querySelector('.newplace__form-link');

const formElementNewPlace = document.querySelector('.newplace__forms');

const addCardNewPlace = (evt) => {
	evt.preventDefault();

	elementsContainer.prepend(renderCard({
		name: nameNewplaceFormInput.value,
		link: newplaceFormLink.value,
	}));

	evt.target.reset();
	closePopup(newplace);
}

formElementNewPlace.addEventListener('submit', addCardNewPlace);


// закрытие popup при клике на оверлей:
const popupList = document.querySelectorAll('.popup');
popupList.forEach((popupElement) => {
	popupElement.addEventListener('click', function (evt) {
		if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
			closePopup(popupElement);
		}
	});
});


// код из упражнения про валидацию
const showInputError = (formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add('form__input_type_error');
	errorElement.textContent = errorMessage;
	errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove('form__input_type_error');
	errorElement.classList.remove('form__input-error_active');
	errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, formInput.validationMessage);
	} else {
		hideInputError(formElement, inputElement);
	}
};

function setEventListeners(formElement) {
	const inputList = Array.from(formElement.querySelectorAll('.form__input'));
	const buttonElement = formElement.querySelector('.form__submit');

	// чтобы проверить состояние кнопки в самом начале
	toggleButtonState(inputList, buttonElement);

	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', function () {
			checkInputValidity(formElement, inputElement);

			// чтобы проверять его при изменении любого из полей
			toggleButtonState(inputList, buttonElement);
		});
	});
}

function enableValidation() {
	const formList = Array.from(document.querySelectorAll('.form'));
	formList.forEach((formElement) => {
		formElement.addEventListener('submit', (evt) => {
			evt.preventDefault();
		});

		const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));

		fieldsetList.forEach((fieldSet) => {
			setEventListeners(fieldSet);
		});
	}
	)
}

enableValidation();


/* Функция принимает массив полей. нужно проверить все поля, 
чтобы настроить статус кнопки. Если все поля валидны — 
активировать кнопку, если хотя бы одно нет — заблокировать.*/
const hasInvalidInput = (inputList) => {
	// проходим по этому массиву методом some
	return inputList.some((inputElement) => {
		// Если поле не валидно, колбэк вернёт true
		// Обход массива прекратится и вся функция
		// hasInvalidInput вернёт true

		return !inputElement.validity.valid;
	})
};

/* Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять */
/*Для стилизации нужна функция toggleButtonState. Именно она отключает и включает кнопку.
ля этого функция hasInvalidInput проверяет валидность полей и возвращает true или false. 
На их основе toggleButtonState меняет состояние кнопки:
inputList -  массив полей, и buttonElement — кнопка «Далее».*/

const toggleButtonState = (inputList, buttonElement) => {
	// Если есть хотя бы один невалидный инпут
	if (hasInvalidInput(inputList)) {
		// сделай кнопку неактивной
		buttonElement.classList.add('button_inactive');
	} else {
		// иначе сделай кнопку активной
		buttonElement.classList.remove('button_inactive');
	}
};