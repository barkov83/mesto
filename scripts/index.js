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


const cardsTemplate = document.querySelector('#cards-template').content;

const renderCard = (name, link) => {
	const placeElement = cardsTemplate.querySelector('.card').cloneNode(true);
	placeElement.querySelector('.card__image').src = link;
	placeElement.querySelector('.card__image').alt = name;
	placeElement.querySelector('.card__title').textContent = name;

const likeButton = placeElement.querySelector('.card__like');
likeActive = () => {
	likeButton.classList.add('card__like_active');
}
likeButton.addEventListener('click', likeActive);

const trashButton = placeElement.querySelector('.card__trash');
trashActive = () => {
	placeElement.remove();
}
trashButton.addEventListener('click', trashActive);

return placeElement;
}

initialCards.forEach((name, link) => {
	elementsList.append(renderCard(name, link));
})
