const aboutButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close");

let nameInput = document.querySelector(".profile__title");
let jobInput = document.querySelector(".profile__subtitle");

let fromNameInput = document.querySelector('#popup__username');
let fromJobInput = document.querySelector('#popup__vocation');



const handlerAboutButtonClick = () => {
	fromNameInput.value = nameInput.textContent;
	fromJobInput.value = jobInput.textContent;
	popup.classList.add('popup_opened');
};

const handlerCloseButtonClick = () => {
	popup.classList.remove('popup_opened');
};

aboutButton.addEventListener("click", handlerAboutButtonClick);
closeButton.addEventListener("click", handlerCloseButtonClick);



let formElement = document.querySelector(".popup__forms");

function formSubmitHandler(evt) {
	evt.preventDefault();

	nameInput.textContent = fromNameInput.value;
	jobInput.textContent = fromJobInput.value;
	handlerCloseButtonClick();
}

formElement.addEventListener('submit', formSubmitHandler);



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
const closeButtonNewPlace = document.querySelector(".newplace__close");

const toggleOpenPopupNewPlace = () => {
	newplace.classList.toggle('popup_opened');
}

const handlerOpenAddButtonClick = () => {
	toggleOpenPopupNewPlace();
}

const handlerCloseAddButtonClick = () => {
	toggleOpenPopupNewPlace();
}

addButton.addEventListener('click', handlerOpenAddButtonClick);
closeButtonNewPlace.addEventListener('click', handlerCloseAddButtonClick);

/*появление 6-ти карточек при загрузке страницы*/
const cardsTemplate = document.querySelector('#cards-template').content;

const renderCard = (item) => {
	const placeElement = cardsTemplate.querySelector('.card').cloneNode(true);
	placeElement.querySelector('.card__image').src = item.link;
	placeElement.querySelector('.card__image').alt = item.name;
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
	const clickOnCardImage = placeElement.querySelector('.card__image');
	const bigPopupWindow = document.querySelector('.big-window');

	const closeBigPopupWindow = document.querySelector('.big-window__close');

	const photoInWindow = document.querySelector('.big-window__image');
	const namePhotoInWindow = document.querySelector('.big-window__caption');

	const nameImageAtClick = placeElement.querySelector('.card__signature');


	openBigPopupWindow = () => {
		bigPopupWindow.classList.add('popup_opened');
		photoInWindow.src = clickOnCardImage.src;
		photoInWindow.alt = clickOnCardImage.alt;
		namePhotoInWindow.textContent = nameImageAtClick.textContent;
	}

	closeTheBigPopupWindow = () => {
		bigPopupWindow.classList.remove('popup_opened');
	}

	clickOnCardImage.addEventListener('click', openBigPopupWindow);
	closeBigPopupWindow.addEventListener('click', closeTheBigPopupWindow);

	console.log(clickOnCardImage.textContent);
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
	toggleOpenPopupNewPlace();
}

formElementNewPlace.addEventListener('submit', addCardNewPlace);

