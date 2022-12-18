//суть класса: содержать актуальную инфо о пользователе. управление отображением информации о пользователе на странице*/
export class UserInfo {
  constructor( {nameSelector, jobSelector, avatarSelector} ) {
    this._nameEl = document.querySelector(nameSelector);
    this._aboutEl = document.querySelector(jobSelector);
    this._avatarEl = document.querySelector(avatarSelector);
  }

  // установить данные в объект (экз класса). //  2. Устанавливать данные в ДОМ... и добавляет их на страницу.
  setUserInfo(name, about, avatar) {
    this.name = name;
    this.about = about;
    this.avatar = avatar;
  }

  // из DOM забираем текст/поля и превращаем в {объект}, и возвращаем такой объект с данными пользователя. Пользователя нужно будет подставить в форму при открытии.
  //возвращает объект{} c полями name, about,...
  getUserInfo() {
    this.userInfo = {//присваиваем поля
      name: this._nameEl.textContent,
      about: this._aboutEl.textContent,
      avatar: this._avatarEl.src,
    }
    return this.userInfo
  }
  // getUserInfo() {
  //   return {
  //     name: this.name,
  //     about: this.about,
  //     avatar: this.avatar,
  //     id: this._id,
  //   };
  // }

  //обновляет данные на странице
  updateUserInfo(name, about, avatar) {
    this._nameEl.textContent = name
    this._aboutEl.textContent = about
    this._avatarEl.src = avatar
  }

}
