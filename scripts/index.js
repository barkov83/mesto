import { initialCards, formValidationConfig } from './/constants.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

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

const buttonAddNewplace = document.querySelector('.profile__add-button');
const newplace = document.querySelector('.newplace')

const handleOpenButtonAddNewplaceClick = () => {
	openPopup(newplace);	
}

buttonAddNewplace.addEventListener('click', handleOpenButtonAddNewplaceClick);

const cardsGallery = document.querySelector('.elements__list');
const createCard = ((item) => {
	const card = new Card(item, '.elements__list-template');
	const cardElement = card.generateCard();
	cardsGallery.prepend(cardElement);
});

const nameNewplaceFormInput = document.querySelector('#popup__imagename');
const newplaceFormLink = document.querySelector('#popup__link');
const formElementNewPlace = document.querySelector('#editUserImage');

const addCardNewPlace = (evt) => {
	createCard({
		name: nameNewplaceFormInput.value,
		link: newplaceFormLink.value,
	});

	evt.target.reset();
	closePopup(newplace);
}

initialCards.forEach((item) => {
	createCard(item);
})

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

const profileFormValidator = new FormValidator(formValidationConfig, formElementEditProfile);
const newCardFormValidator = new FormValidator(formValidationConfig, formElementNewPlace);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();