export class UserInfo {
  constructor({ nameSelector, infoSelector }) {    
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
    this._name = undefined;
    this._info = undefined;
  }

  // обновление информации на странице после новых вводных
  _updateInfo() {
    this._nameElement.textContent = this._name;
    this._infoElement.textContent = this._info;
  }

  // получение данных из экземпляра
  getUserInfo() {
    return {
      name: this.name,
      info: this._info,
    };
  }

  // обновление данных в экземпляре
  setUserInfo({ name, info }) {
    this._name = name;
    this._info = info;

    this._updateInfo();
  }
}
