const token = "7856ef8e-5f3d-40ce-93d5-92adf5fbeb8e";
const groupId = "cohort-66";

export const headers = { authorization: token, "Content-Type": "application/json" };
export const apiUrl = `https://mesto.nomoreparties.co/v1/${groupId}`;

export const formValidationConfig = {
    formSelector: ".popup__forms",
    inputSelector: ".popup__form-item",
    errorClass: "popup__form-item_type_error",
    buttonSelector: ".popup__save",
    buttonDisabledClass: "popup__save_disabled",
    buttonSelectorNewplace: ".newplace__save",
};

export const userInfoSelectors = {
    nameSelector: ".profile__title",
    aboutSelector: ".profile__subtitle",
    avatarSelector: ".profile__elips",
};

export const cardSelectors = {
    popupNewplaceWindow: ".popup_photo",
    photoInWindow: ".popup__photo-image",
    namePhotoInWindow: ".popup__photo-caption",
}

export const Selector = {
    buttonEditProfile: ".profile__edit-button",
    formElementEditProfile: "#editUserProfile",
    buttonAddNewplace: ".profile__add-button",
    formElementNewPlace: "#editUserImage",
    buttonEditAvatar: ".profile__elips-overlay",
    formElementEditAvatar: "#editUserAvatar",
    popupPhoto: ".popup_photo",
    popupDeleteCard: ".popup-delete-card",
    template: ".elements__list-template",
    elements: ".elements__list",
    popupEditProfile: ".popup-profile",
    popupAddCard: ".newplace",
    popupEditAvatar: ".avatar",
};
