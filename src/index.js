import "#pages/index.css";

// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
const addButtonPlus = new URL("./images/addButtonPlus.svg", import.meta.url);
const card__like_active = new URL("./images/card__like_active.svg", import.meta.url);
const card__like_disabled = new URL("./images/card__like_disabled.svg", import.meta.url);
const card__trash = new URL("./images/card__trash.svg", import.meta.url);
const editButton = new URL("./images/edit-button.svg", import.meta.url);
const editButtonElement = new URL("./images/edit-button-element.svg", import.meta.url);
const logo = new URL("./images/logo.svg", import.meta.url);
const popup__closeIcon = new URL("./images/popup__close-icon.svg", import.meta.url);
const Vector = new URL("./images/Vector.svg", import.meta.url);
const avatar = new URL("./images/avatar.png", import.meta.url);
const Dombai = new URL("./images/Dombai.png", import.meta.url);
const Elbrus = new URL("./images/Elbrus.png", import.meta.url);
const Kaliningrad = new URL("./images/Kaliningrad.jpg", import.meta.url);
const karachaevsk = new URL("./images/karachaevsk.png", import.meta.url);
const Peterburg = new URL("./images/Peterburg.jpg", import.meta.url);
const Sochi = new URL("./images/Sochi.jpg", import.meta.url);

// используем псевдонимы для корня проекта
// imports в package.json
import { Api } from "#infrastructure/Api.js";
import { formValidationConfig, apiUrl, headers } from "#utils/constants.js";
import { FormValidator } from "#components/FormValidator.js";
import { Card } from "#components/Card.js";
import { Section } from "#components/Section.js";
import { PopupWithImage } from "#components/PopupWithImage.js";
import { PopupWithForm } from "#components/PopupWithForm.js";
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
const editAvatarFormValidator = new FormValidator(formValidationConfig, formElementEditAvatar);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

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
const deleteCardPopup = new PopupWithForm(".popup-delete-card", () => {});

popupPhoto.setEventListeners();
deleteCardPopup.setEventListeners();

// хэндлер установки/снятия лайка
// isSet = true == поставить лайк; false = снять
const handleLikeClickCb = async (id, isSet) => {
    try {
        return isSet ? await api.addLike(id) : await api.deleteLike(id);
    } catch(error) {
        console.error(error);
    }
};

// хэндлер удаления карточки
const handleCardDeleteCb = async (id) => {
    return new Promise((resolve, reject) => {
        const callback = async ({ id }) => {
            return api
                .deleteCard(id)
                .then(resolve)
                .catch((error) => (console.error(`Error due deleting card. ${error}`), reject(error)));
        };

        formElementRemoveCard.elements.id.value = id;
        deleteCardPopup.setSubmitFormCallback(callback);
        deleteCardPopup.open();
    });
};

// создание карточки и связываем ее с вызовом попапа
const createCard = (data) => {
    const { _id: userId } = userInfo.getUserInfo();
    const card = new Card(
        data,
        ".elements__list-template",
        (name, link) => popupPhoto.open(name, link),
        handleLikeClickCb,
        handleCardDeleteCb,
        userId,
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
const handleProfileEdit = async (payload) => {
    return api
        .updateUserData(payload)
        .then((data) => userInfo.setUserInfo(data))
        .catch((error) => (console.error(`Error due profile updating. ${error}`), Promise.reject(error)));
};

// хэндлер колбэка формы добавления карточки
const handleAddCard = async (payload) => {
    return api
        .addCard(payload)
        .then((data) => cardsList.addItem(new createCard(data)))
        .catch((error) => (console.error(`Error due card creating. ${error}`), Promise.reject(error)));
};

// хэндлер коллбэка формы изменения аватара
const handleEditAvatar = async ({ avatar }) => {
    return api
        .updateAvatar(avatar)
        .then((data) => userInfo.setUserInfo(data))
        .catch((error) => (console.error(`Error due avatar updating. ${error}`), Promise.reject(error)));
};

// создание экземпляров попапов для форм изменения профиля и создания карточки
const editProfilePopup = new PopupWithForm(".popup-profile", handleProfileEdit);
const addCardPopup = new PopupWithForm(".newplace", handleAddCard);
const editAvatarPopup = new PopupWithForm(".avatar", handleEditAvatar);

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
editAvatarPopup.setEventListeners();

// обработка события для открытия попапа редактирования профиля
const openProfilePopup = () => {
    const { name, about } = userInfo.getUserInfo();

    formElementEditProfile.elements.name.value = name;
    formElementEditProfile.elements.about.value = about;

    editProfilePopup.open();
};

// обработка события для открытия попапа изменения аватара
const openEditAvatarPopup = () => {
    const { avatar } = userInfo.getUserInfo();

    formElementEditAvatar.elements.avatar.value = avatar;

    editAvatarPopup.open();
};

// слушатель клика открытия попапа редактирования профиля
buttonEditProfile.addEventListener("click", openProfilePopup);

// слушатель клика открытия попапа добавления карточки
buttonAddNewplace.addEventListener("click", () => addCardPopup.open());

// слушатель клика открытия попапа изменения аватара
buttonEditAvatar.addEventListener("click", openEditAvatarPopup);
