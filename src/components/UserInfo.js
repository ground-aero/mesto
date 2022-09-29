/*отвечает за: управление отображением информации о пользователе на странице*/
export class UserInfo {
  // Принимает объект с селекторами двух элементов: 1. элемента имени пользователя 2. элемента информации о себе.
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    // console.log(this._name);
    this._job = document.querySelector(jobSelector);
  }

  // забираем из DOM элементов текст, и возвращаем такой объект с данными пользователя. Пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {
      name: `${this._name.textContent}`,
      job: `${this._job.textContent}`,
    };
  }

  // в эти элементы устанавливает тот текст который был передан выше.  // принимает новые данные пользователя из ДОМ (и внутри себя ), 2. Устанавливать данные в ДОМ... и добавляет их на страницу.
  setUserInfo(formData) {
    this._name.textContent = formData.name;
    this._job.textContent = formData.job
  }
}
