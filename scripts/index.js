const aboutButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup-profile");
const closeButton = document.querySelector(".popup__close");

const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__subtitle");

const fromNameInput = document.querySelector('#popup__username');
const fromJobInput = document.querySelector('#popup__vocation');


function openPopup(popupElement) {
	popupElement.classList.add('popup_opened');
}

const closePopup = (popupElement) => {
	popupElement.classList.remove('popup_opened');
}

const handlerAboutButtonClick = () => {
	openPopup(popupProfile);

	fromNameInput.value = nameInput.textContent;
	fromJobInput.value = jobInput.textContent;
};

const handlerCloseButtonClick = () => {
	closePopup(popupProfile);
};

aboutButton.addEventListener("click", handlerAboutButtonClick);
closeButton.addEventListener("click", handlerCloseButtonClick);



const formElementEditProfile = document.querySelector(".popup__forms");

function handleSubmitEditProfile(evt) {
	evt.preventDefault();

	nameInput.textContent = fromNameInput.value;
	jobInput.textContent = fromJobInput.value;
	handlerCloseButtonClick();
}

formElementEditProfile.addEventListener('submit', handleSubmitEditProfile);



const elementsList = document.querySelector('.elements__list');
const elementsListTemplate = document.querySelector('.elements__list-template').content;


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

const addButton = document.querySelector('.profile__add-button');
const newplace = document.querySelector('.newplace')
const buttonCloseAddNewPlace = document.querySelector(".newplace__close");

const handlerOpenAddButtonClick = () => {
	openPopup(newplace);
}

const handlerCloseAddButtonClick = () => {
	closePopup(newplace);
}

addButton.addEventListener('click', handlerOpenAddButtonClick);
buttonCloseAddNewPlace.addEventListener('click', handlerCloseAddButtonClick);

/*появление 6-ти карточек при загрузке страницы*/
const cardsTemplate = document.querySelector('#cards-template').content;

const bigPopupWindow = document.querySelector('.big-window');
const closeBigPopupWindow = document.querySelector('.big-window__close');
const photoInWindow = document.querySelector('.big-window__image');
const namePhotoInWindow = document.querySelector('.big-window__caption');

const renderCard = (item) => {
	const placeElement = cardsTemplate.querySelector('.card').cloneNode(true);
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
	const nameImageAtClick = placeElement.querySelector('.card__signature');

	openBigPopupWindow = () => {
		openPopup(bigPopupWindow);

		photoInWindow.src = item.link;
		photoInWindow.alt = item.name;
		namePhotoInWindow.textContent = nameImageAtClick.textContent;

	}

	closeTheBigPopupWindow = () => {
		closePopup(bigPopupWindow);
	}

	clickOnCardImage.addEventListener('click', openBigPopupWindow);
	closeBigPopupWindow.addEventListener('click', closeTheBigPopupWindow);

	return placeElement;
}

initialCards.forEach((item) => {
	elementsList.append(renderCard(item));
})


const nameNewplaceFormInput = document.querySelector('.newplace__form-input');
const newplaceFormLink = document.querySelector('.newplace__form-link');

const formElementNewPlace = document.querySelector('.newplace__forms');

const addCardNewPlace = (evt) => {
	evt.preventDefault();

	elementsList.prepend(renderCard({
		name: nameNewplaceFormInput.value,
		link: newplaceFormLink.value,
	}));

	evt.target.reset();
	closePopup(newplace);
}

formElementNewPlace.addEventListener('submit', addCardNewPlace);

