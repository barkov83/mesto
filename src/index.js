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

import { initialCards, formValidationConfig } from "./utils/constants.js";
import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";

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

    return card.generateCard();;
};
const renderCard = (item, list) => list.addItem(createCard(item));

const cardsList = new Section(
    {
        items: initialCards,
        renderer: (item) => renderCard(item, cardsList),        
    },
    ".elements__list",
);

cardsList.renderItems();

// хэндлер колбэка при клике на кнопку сохранить формы изменения деталей профиля
const handleProfileEdit = (item) => userInfo.setUserInfo(item);

// хэндлер колбэка формы добавления карточки
const handleAddCard = (data) => renderCard(data, cardsList);

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