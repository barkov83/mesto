const aboutButton = document.querySelector(".profile__popup-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close");


const handlerAboutButtonClick = () => {
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

	let nameInput = document.querySelector(".profile__nameInput");
	let jobInput = document.querySelector(".profile__jobInput");

	let fromNameInput = document.querySelector('#popup__username');
	let fromJobInput = document.querySelector('#popup__vocation');

	nameInput.textContent = fromNameInput.value;
	jobInput.textContent = fromJobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', handlerCloseButtonClick);
