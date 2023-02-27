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

initialCards.forEach(function (listCards) {
	const CloneElementsListTemplate = elementsListTemplate.cloneNode(true);
	CloneElementsListTemplate.querySelector('.card__title').textContent = listCards.name;
	CloneElementsListTemplate.querySelector('.card__image').src = listCards.link
	elementsList.append(CloneElementsListTemplate)
});

const newplaceFormInput = document.querySelector('.newplace__form-input');
const newplaceFormLink = document.querySelector('.newplace__form-link');
const formElementNewPlace = document.querySelector('.newplace__forms');


const addButton = document.querySelector('.profile__add-button');
const newplace = document.querySelector('.newplace')
const closeButtonNewPlace = document.querySelector(".newplace__close");

let nameNewplace = document.querySelector('.card__title');
let linkNewplace = document.querySelector('.card__image');

let fromNameNewplace = document.querySelector('#popup__imagename');
let fromLinkNewplace = document.querySelector('#popup__link');

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


function newPlaceFormSubmitHandler(evt) {
	evt.preventDefault();

	CloneElementsListTemplate.querySelector('.card__title').textContent = newplaceFormInput.value,
		CloneElementsListTemplate.querySelector('.card__image').src = newplaceFormLink.value,
		elementsList.prepend(elementsListTemplate),

		evt.target.reset();

}

formElementNewPlace.addEventListener('submit', newPlaceFormSubmitHandler);
