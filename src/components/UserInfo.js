export class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._avatarElement = document.querySelector(avatarSelector);
        this._name = undefined;
        this._about = undefined;
        this._avatar = undefined;
        this._id = undefined;
    }

    // обновление информации на странице после новых вводных
    _updateInfo() {
        this._nameElement.textContent = this._name;
        this._aboutElement.textContent = this._about;
        this._avatarElement.src = this._avatar;
    }

    // получение данных из экземпляра
    getUserInfo() {
        return {
            name: this._name,
            about: this._about,
            avatar: this._avatar,
            _id: this._id,
        };
    }

    // обновление данных в экземпляре
    setUserInfo({ name, about, avatar, _id }) {
        this._name = name;
        this._about = about;
        this._avatar = avatar;
        this._id = _id;

        this._updateInfo();
    }
}
