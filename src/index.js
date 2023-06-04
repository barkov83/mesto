import "#pages/index.css";
import "#utils/images.js";

// используем псевдонимы для корня проекта
// imports в package.json
// https://nodejs.org/docs/latest-v18.x/api/packages.html#subpath-imports
import { Api } from "#infrastructure/Api.js";
import {
    formValidationConfig,
    apiUrl,
    headers,
    popupNewplaceWindow,
    photoInWindow,
    namePhotoInWindow,
} from "#utils/constants.js";
import { FormValidator } from "#components/FormValidator.js";
import { Card } from "#components/Card.js";
import { Section } from "#components/Section.js";
import { PopupWithImage } from "#components/PopupWithImage.js";
import { PopupWithForm } from "#components/PopupWithForm.js";
import { PopupWithConfirm } from "#components/PopupWithConfirm.js";
import { UserInfo } from "#components/UserInfo.js";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const formElementEditProfile = document.querySelector("#editUserProfile");
const buttonAddNewplace = document.querySelector(".profile__add-button");
const formElementNewPlace = document.querySelector("#editUserImage");
const buttonEditAvatar = document.querySelector(".profile__elips-overlay");
const formElementEditAvatar = document.querySelector("#editUserAvatar");
const formElementRemoveCard = document.querySelector("#deleteCardForm");

const profileFormValidator = new FormValidator(formValidationConfig, formElementEditProfile);
const newCardFormValidator = new FormValidator(formValidationConfig, formElementNewPlace);
const avatarEditFormValidator = new FormValidator(formValidationConfig, formElementEditAvatar);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();
avatarEditFormValidator.enableValidation();

const api = new Api(apiUrl, headers);

const nameSelector = ".profile__title";
const aboutSelector = ".profile__subtitle";
const avatarSelector = ".profile__elips";
const userInfo = new UserInfo({
    nameSelector,
    aboutSelector,
    avatarSelector,
});

// попап для карточки при отображении картинки
const popupPhoto = new PopupWithImage(".popup_photo");
// попап удаления карточки
const popupDeleteCard = new PopupWithConfirm(".popup-delete-card");

popupPhoto.setEventListeners();
popupDeleteCard.setEventListeners();

// хэндлер установки/снятия лайка
// isSet = true == поставить лайк; false = снять
const handleLikeClickCb = async (id, isSet) => {
    try {
        return isSet ? await api.addLike(id) : await api.deleteLike(id);
    } catch (error) {
        console.error(error);

        return Promise.reject(error);
    }
};

// хэндлер удаления карточки
const handleCardDeleteCb = (id) =>
    new Promise((resolve, reject) => {
        const callback = () =>
            api
                .deleteCard(id)
                .then(resolve)
                .catch((error) => {
                    console.error(`Error due deleting card. ${error}`);

                    reject(error);
                });

        formElementRemoveCard.elements.id.value = id;
        popupDeleteCard.setCallback(callback);
        popupDeleteCard.open();
    });

// создание карточки и связываем ее с вызовом попапа
const createCard = (data) => {
    const { _id: userId } = userInfo.getUserInfo();
    const selectors = { popupNewplaceWindow, photoInWindow, namePhotoInWindow };
    const card = new Card(
        data,
        ".elements__list-template",
        (name, link) => popupPhoto.open(name, link),
        (...args) =>
            handleLikeClickCb(...args)
                .then((data) => card.update(data))
                .catch(() => {}),
        (...args) =>
            handleCardDeleteCb(...args)
                .then(() => card.delete())
                .catch(() => {}),
        userId,
        selectors,
    );

    return card.generateCard();
};
const renderCard = (item, list) => list.addItem(createCard(item));

let cardsList;

// одновременные асинхронные запросы на получение данных пользователя и карточек
Promise.all([api.getUserData(), api.getCardData()]).then(([userData, cardData]) => {
    userInfo.setUserInfo(userData);
    cardsList = new Section(
        {
            items: cardData.reverse(),
            renderer: (item) => renderCard(item, cardsList),
        },
        ".elements__list",
    );
    cardsList.renderItems();
});

// хэндлер колбэка при клике на кнопку сохранить формы изменения деталей профиля
const handleProfileEdit = (payload) =>
    api
        .updateUserData(payload)
        .then((data) => userInfo.setUserInfo(data))
        .catch((error) => (console.error(`Error due profile updating. ${error}`), Promise.reject(error)));

// хэндлер колбэка формы добавления карточки
const handleAddCard = (payload) =>
    api
        .addCard(payload)
        .then((data) => cardsList.addItem(new createCard(data)))
        .catch((error) => (console.error(`Error due card creating. ${error}`), Promise.reject(error)));

// хэндлер коллбэка формы изменения аватара
const handleEditAvatar = ({ avatar }) =>
    api
        .updateAvatar(avatar)
        .then((data) => userInfo.setUserInfo(data))
        .catch((error) => (console.error(`Error due avatar updating. ${error}`), Promise.reject(error)));

// создание экземпляров попапов для форм изменения профиля и создания карточки
const popupEditProfile = new PopupWithForm(".popup-profile", handleProfileEdit);
const popupAddCard = new PopupWithForm(".newplace", handleAddCard);
const popupEditAvatar = new PopupWithForm(".avatar", handleEditAvatar);

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupEditAvatar.setEventListeners();

// обработка события для открытия попапа редактирования профиля
const openProfilePopup = () => {
    const { name, about } = userInfo.getUserInfo();

    formElementEditProfile.elements.name.value = name;
    formElementEditProfile.elements.about.value = about;

    popupEditProfile.open();
};

// обработка события для открытия попапа изменения аватара
const openEditAvatarPopup = () => {
    const { avatar } = userInfo.getUserInfo();

    formElementEditAvatar.elements.avatar.value = avatar;

    popupEditAvatar.open();
};

// слушатель клика открытия попапа редактирования профиля
buttonEditProfile.addEventListener("click", openProfilePopup);

// слушатель клика открытия попапа добавления карточки
buttonAddNewplace.addEventListener("click", () => popupAddCard.open());

// слушатель клика открытия попапа изменения аватара
buttonEditAvatar.addEventListener("click", openEditAvatarPopup);
