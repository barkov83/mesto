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
