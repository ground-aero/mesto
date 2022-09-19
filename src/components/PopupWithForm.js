/*ЗАДАЧА: Помимо открытия/закрытия попапа(ов), добавить обработчики формы которая находится внутри попапа */
/* => ф-цию обработчика передаем в конструктор  
Для каждого попапа создавайте свой экземпляр класса PopupWithForm. */
import {Popup} from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, submitHandler = null) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._submitHandler = submitHandler;
  }

  // это код для ПР-9
  // setSubmitAction(action) {
  //   this._submitHandler = action;
  // }
  _getInputValues() {
    // собирает данные всех полей формы.
    const formDataObject = {};
    const inputElements = this._form.querySelectorAll('.popup__input');
    [...inputElements].forEach((input) => {
      formDataObject[input.name] = input.value; //'name - знач атрибута name=""
      formDataObject[input.link] = input.value;
    });

    return formDataObject;
  }

  close() {
    //Перезапись родительского метода. При закрытии попапа форма должна ещё и сбрасываться.
    this._form.reset();

    super.close();
  }

  _setInputValues(data) {
  }

  setEventListeners() {
    //Расширяем родительский метод.
    //должен не только расширить обработчик клика иконке закрытия, но и добавить обработчик сабмита формы (Т.к. это его ответственность!).
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submitHandler(this._getInputValues());

      this.close();
    });
    super.setEventListeners();
  }
}
