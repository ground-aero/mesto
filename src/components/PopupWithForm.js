//Попап открывается в момент нажатия на кнопку "редактировать".
//Класс UserInfo и PopupWithForm связаны только через колбэк сабмита.
//ЗАДАЧА: Помимо открытия/закрытия попапа(ов), добавить обработчики формы которая находится внутри попапа
// => ф-цию обработчика передаем в конструктор Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputElements = this._form.querySelectorAll('.popup__input');
  }

  // код для ПР-9
  // setSubmitAction(action) {
  //   this._handleSubmit(вместо)submitHandler = action;
  // }

  // собирает данные всех полей формы.
  _getInputValues() {
    const formDataObject = {};
    [...this._inputElements].forEach((input) => {
      formDataObject[input.name] = input.value; //'name - знач атрибута name=""
    });

    return formDataObject;
  }

  close() {
    //Перезапись родительского метода. При закрытии попапа форма должна ещё и сбрасываться.
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    //Расширяем родительский метод. должен не только расширить обработчик клика иконке закрытия, но и добавить обработчик сабмита формы (Т.к. это его ответственность!).
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();

      this._handleFormSubmit(this._getInputValues());

      this.close();
    });

    super.setEventListeners();
  }
}
