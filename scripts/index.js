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
	document.removeEventListener('keydown', closePopupOnEscape);
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


const formElementEditProfile = document.querySelector("#editUserProfile");

function handleSubmitEditProfile(evt) {
	evt.preventDefault();

	nameInput.textContent = fromNameInput.value;
	jobInput.textContent = fromJobInput.value;
	handleButtonClosePopupEditProfile();
}

formElementEditProfile.addEventListener('submit', handleSubmitEditProfile);


const elementsContainer = document.querySelector('.elements__list');
const elementsContainerTemplate = document.querySelector('.elements__list-template').content;

const buttonAddNewplace = document.querySelector('.profile__add-button');
const newplace = document.querySelector('.newplace')

const handleOpenButtonAddNewplaceClick = () => {
	openPopup(newplace);
	disableSubmitButton();
}

buttonAddNewplace.addEventListener('click', handleOpenButtonAddNewplaceClick);


/*появление 6-ти карточек при загрузке страницы*/
const popupNewplaceWindow = document.querySelector('.popup_photo');
const photoInWindow = document.querySelector('.popup__photo-image');
const namePhotoInWindow = document.querySelector('.popup__photo-caption');


// const createCard = (item) => {
// 	const placeElement = elementsContainerTemplate.querySelector('.card').cloneNode(true);
// 	const cardImage = placeElement.querySelector('.card__image');
// 	cardImage.src = item.link;
// 	cardImage.alt = item.name;

// 	placeElement.querySelector('.card__title').textContent = item.name;

// 	const likeButton = placeElement.querySelector('.card__like');
// 	likeActive = () => {
// 		likeButton.classList.toggle('card__like_active');
// 	}
// 	likeButton.addEventListener('click', likeActive);

// 	const trashButton = placeElement.querySelector('.card__trash');
// 	trashActive = () => {
// 		placeElement.remove();
// 	}
// 	trashButton.addEventListener('click', trashActive);

// 	/*открытие окна с большой картинкой*/
// 	openPopupNewplaceWindow = () => {
// 		openPopup(popupNewplaceWindow);

// 		photoInWindow.src = item.link;
// 		photoInWindow.alt = item.name;
// 		namePhotoInWindow.textContent = item.name;
// 	}

// 	cardImage.addEventListener('click', openPopupNewplaceWindow);

// 	return placeElement;
// }


/*Создаю класс Кард*/
class Card {	
	constructor(data, templateSelector) { 		
		this._name = data.name;
		this._link = data.link;
		this._templateSelector = templateSelector;		
	}

	_getTemplate() {		
		const cardElement = document
			.querySelector(this._templateSelector) // используем this._templateSelector было:('.elements__list-template')
			.content
			.querySelector('.card')
			.cloneNode(true);
		
		return cardElement;
	}

	generateCard() {
		this._element = this._getTemplate();
		this._setEventListeners();
		this._element.querySelector('.card__image').src = this._link;
		this._element.querySelector('.card__title').textContent = this._name;
		this._likeIcon = this._element.querySelector('.card__like');
		this._deleteCard = this._element.querySelector('.card');	

		return this._element;
	}

	_handleOpenPopup() {
		photoInWindow.src = this._link;
		namePhotoInWindow.textContent = this._name;
		popupNewplaceWindow.classList.add('popup_opened');
	}

	_handleLikeCard() {
		this._likeIcon.classList.toggle('card__like_active');
	}

	_handleDeleteCard() {
		this._element.remove();
	}

	// _handleClosePopup() {
	// 	photoInWindow.src = '';
	// 	popupNewplaceWindow.classList.remove('popup_opened');
	// }

	_setEventListeners() {		
		this._element.querySelector('.card__image').addEventListener('click', () => this._handleOpenPopup());
		this._element.querySelector('.card__like').addEventListener('click', () => this._handleLikeCard());
		this._element.querySelector('.card__trash').addEventListener('click', () => this._handleDeleteCard());

	}
}

initialCards.forEach((item) => {
	const card = new Card(item, '.elements__list-template');
	const cardElement = card.generateCard();

	// Добавляем в DOM
	document.querySelector('.elements__list').append(cardElement);
});


// initialCards.forEach((item) => {
// 	elementsContainer.append(createCard(item));
// })


const nameNewplaceFormInput = document.querySelector('#popup__imagename');
const newplaceFormLink = document.querySelector('#popup__link');

const formElementNewPlace = document.querySelector('#editUserImage');

const addCardNewPlace = (evt) => {
	evt.preventDefault();

	elementsContainer.prepend(createCard({
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