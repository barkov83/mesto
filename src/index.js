import '../pages/index.css';

// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
const addButtonPlus = new URL('./images/addButtonPlus.svg', import.meta.url);
const card__like_active = new URL('./images/card__like_active.svg', import.meta.url);
const card__like_disabled = new URL('./images/card__like_disabled.svg', import.meta.url);
const card__trash = new URL('./images/card__trash.svg', import.meta.url);
const editButton = new URL('./images/edit-button.svg', import.meta.url);
const editButtonElement = new URL('./images/edit-button-element.svg', import.meta.url);
const logo = new URL('./images/logo.svg', import.meta.url);
const popup__closeIcon = new URL('./images/popup__close-icon.svg', import.meta.url);
const Vector = new URL('./images/Vector.svg', import.meta.url);
const avatar = new URL('./images/avatar.png', import.meta.url);
const Dombai = new URL('./images/Dombai.png', import.meta.url);
const Elbrus = new URL('./images/Elbrus.png', import.meta.url);
const Kaliningrad = new URL('./images/Kaliningrad.jpg', import.meta.url);
const karachaevsk = new URL('./images/karachaevsk.png', import.meta.url);
const Peterburg = new URL('./images/Peterburg.jpg', import.meta.url);
const Sochi = new URL('./images/Sochi.jpg', import.meta.url);

const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'addButtonPlus', image: addButtonPlus },
  { name: 'card__like_active', image: card__like_active },
  { name: 'card__like_disabled', image: card__like_disabled },
  { name: 'card__trash', image: card__trash },
  { name: 'edit_button', image: editButton },
  { name: 'edit_button_element', image: editButtonElement },
  { name: 'logo', image: logo },
  { name: 'popup__closeIcon', image: popup__closeIcon },
  { name: 'Vector', image: Vector },
  { name: 'avatar.png', link: avatar },
  { name: 'Dombai.png', link: Dombai },
  { name: 'Elbrus.png', link: Elbrus },
  { name: 'Kaliningrad.png', link: Kaliningrad },
  { name: 'karachaevsk.png', link: karachaevsk },
  { name: 'Peterburg.png', link: Peterburg },
  { name: 'Sochi.png', link: Sochi },  
];

import { initialCards, formValidationConfig } from ".//constants.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const formElementEditProfile = document.querySelector("#editUserProfile");
const buttonAddNewplace = document.querySelector(".profile__add-button");
const formElementNewPlace = document.querySelector("#editUserImage");

const profileFormValidator = new FormValidator(formValidationConfig, formElementEditProfile);
const newCardFormValidator = new FormValidator(formValidationConfig, formElementNewPlace);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();

const nameSelector = ".profile__title";
const infoSelector = ".profile__subtitle";
const userInfo = new UserInfo({
    nameSelector,
    infoSelector,
});
userInfo.setUserInfo({
    name: "Жак-Ив Кусто",
    info: "Исследователь океана",
});

// попап для карточки при отображении картинки
const popupPhoto = new PopupWithImage(".popup_photo");
popupPhoto.setEventListeners();

// создание карточки и связываем ее с вызовом попапа
const createCard = (data) => {
    const card = new Card(data, ".elements__list-template", (name, link) => popupPhoto.open(name, link));
    const cardElement = card.generateCard();

    return cardElement;
};

const cardsList = new Section(
    {
        items: initialCards,
        renderer: (item) => cardsList.addItem(createCard(item)),
    },
    ".elements__list",
);

cardsList.renderItems();

// хэндлер колбэка при клике на кнопку сохранить формы изменения деталей профиля
const handleProfileEdit = ({ name, info }) => userInfo.setUserInfo({ name, info });

// хэндлер колбэка формы добавления карточки
const handleAddCard = (data) => cardsList.addItem(createCard(data));

// создание экземпляров попапов для форм изменения профиля и создания карточки
const editProfilePopup = new PopupWithForm(".popup-profile", handleProfileEdit);
const addCardPopup = new PopupWithForm(".newplace", handleAddCard);

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();

// обработка события для открытия попапа редактирования профиля
const openProfilePopup = () => {
    const { name, info } = userInfo.getUserInfo();

    formElementEditProfile.elements.name.value = name;
    formElementEditProfile.elements.info.value = info;

    editProfilePopup.open();
};

// слушатель клика открытия попапа редактирования профиля
buttonEditProfile.addEventListener("click", openProfilePopup);

// слушатель клика открытия попапа добавления карточки
buttonAddNewplace.addEventListener("click", () => addCardPopup.open());