const token = "7856ef8e-5f3d-40ce-93d5-92adf5fbeb8e";
const groupId = "cohort-66";

export const formValidationConfig = {
    formSelector: ".popup__forms",
    inputSelector: ".popup__form-item",
    errorClass: "popup__form-item_type_error",
    buttonSelector: ".popup__save",
    buttonDisabledClass: "popup__save_disabled",
    buttonSelectorNewplace: ".newplace__save",
};

export const popupNewplaceWindow = document.querySelector(".popup_photo");
export const photoInWindow = document.querySelector(".popup__photo-image");
export const namePhotoInWindow = document.querySelector(".popup__photo-caption");

export const headers = { authorization: token, "Content-Type": "application/json" };
export const apiUrl = `https://mesto.nomoreparties.co/v1/${groupId}`;
