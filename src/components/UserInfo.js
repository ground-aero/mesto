/*суть класса: содержать актуальную инфо о пользователе. управление отображением информации о пользователе на странице*/
export class UserInfo {
  // Принимает объект с селекторами двух элементов: 1. элемента имени пользователя 2. элемента информации о себе.
  // constructor({ nameSelector, jobSelector }) {
  //   this._name = document.querySelector(nameSelector);
  //   // console.log(this._name);
  //   this._job = document.querySelector(jobSelector);
  // }
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
    this.name = '';
    this.about = '';
  }

  // установить данные в объект (экз класса). принять данные {}.  // в эти элементы устанавливает тот текст который был передан выше.  // принимает новые данные пользователя из ДОМ (и внутри себя ), 2. Устанавливать данные в ДОМ... и добавляет их на страницу.
  // setUserInfo(formData) {
  //   this._name.textContent = formData.name;
  //   this._job.textContent = formData.job
  // }
  setUserInfo({name, about}) {
    this.name = name;
    this.about = about;
  }

  //возвращает объект{} c полями name, about
  // забираем из DOM элементов текст, и возвращаем такой объект с данными пользователя. Пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {
      name: this.name,
      about: this.about,
      avatar: this._avatar
    };
  }
  // getUserInfo() {
  //   return {
  //     name: `${this.name}`,
  //     about: `${this.about}`,
  //     avatar: `${this._avatar.src}`
  //   };
  // }

  //обновляет данные на странице
  updateUserInfo() {
    this._nameElement.textContent = this.name
    this._aboutElement.textContent = this.about
  }

}
