const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup-profile");

const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__subtitle");

const fromNameInput = document.querySelector('#popup__username');
const fromJobInput = document.querySelector('#popup__vocation');

function openPopup(popupElement) {
	popupElement.classList.add('popup_opened');
	document.addEventListener('keydown', closePopupOnEscape);
	disableSubmitButton();
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
}

buttonAddNewplace.addEventListener('click', handleOpenButtonAddNewplaceClick);


/*появление 6-ти карточек при загрузке страницы*/
const popupNewplaceWindow = document.querySelector('.popup__photo');
const photoInWindow = document.querySelector('.popup__photo-image');
const namePhotoInWindow = document.querySelector('.popup__photo-caption');

const createCard = (item) => {
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
	openPopupNewplaceWindow = () => {
		openPopup(popupNewplaceWindow);

		photoInWindow.src = item.link;
		photoInWindow.alt = item.name;
		namePhotoInWindow.textContent = item.name;
	}

	cardImage.addEventListener('click', openPopupNewplaceWindow);

	return placeElement;
}

initialCards.forEach((item) => {
	elementsContainer.append(createCard(item));
})


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