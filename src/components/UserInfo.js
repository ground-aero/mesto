/*суть класса: содержать актуальную инфо о пользователе. управление отображением информации о пользователе на странице*/
export class UserInfo {
  // Принимает объект с селекторами двух элементов: 1. элемента имени пользователя 2. элемента информации о себе.
  // constructor({ nameSelector, jobSelector }) {
  //   this._name = document.querySelector(nameSelector);
  //   // console.log(this._name);
  //   this._job = document.querySelector(jobSelector);
  // }
  constructor( {nameSelector, jobSelector, avatarSelector} ) {
    this._nameEl = document.querySelector(nameSelector);
    this._aboutEl = document.querySelector(jobSelector);
    this._avatarEl = document.querySelector(avatarSelector);
    // console.log(this._avatarEl)
    // this.name = '';
    // this.about = '';
    // this.avatar = '';
    // this._id = '';
  }

  // установить данные в объект (экз класса). принять данные {}.  // в эти элементы устанавливает тот текст который был передан выше.  // принимает новые данные пользователя из ДОМ (и внутри себя ), 2. Устанавливать данные в ДОМ... и добавляет их на страницу.
  // setUserInfo(formData) {
  //   this._name.textContent = formData.name;
  //   this._job.textContent = formData.job
  // }
  setUserInfo(name, about, avatar) {
    this.name = name;
    this.about = about;
    this.avatar = avatar;
    // this._id = id;
  }

  // из DOM забираем текст/поля и превращаем в {объект}, и возвращаем такой объект с данными пользователя. Пользователя нужно будет подставить в форму при открытии.
  //возвращает объект{} c полями name, about
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
  // getUserInfo() {
  //   return {
  //     name: `${this.name}`,
  //     about: `${this.about}`,
  //     avatar: `${this._avatar.src}`
  //   };
  // }

  //обновляет данные на странице
  updateUserInfo(name, about, avatar) {
    this._nameEl.textContent = name
    this._aboutEl.textContent = about
    this._avatarEl.src = avatar
  }

}
