/*ЗАДАЧА: Помимо открытия/закрытия попапа(ов), добавить обработчики формы которая находится внутри попапа */
/* => ф-цию обработчика передаем в конструктор  
Для каждого попапа создавайте свой экземпляр класса PopupWithForm. */
import { Popup } from './Popup.js';
import {
  inputEditName,
  inputEditJob,
  profileNameNode,
  profileJobNode,
} from '../utils/constants.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, handlePlaceSubmit = null) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._handlePlaceSubmit = handlePlaceSubmit;
  }

  // код для ПР-9
  // setSubmitAction(action) {
  //   this._handlePlaceSubmit(вместо)submitHandler = action;
  // }

  // собирает данные всех полей формы.
  _getInputValues() {
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

  setInputValues() {
      inputEditName.value = profileNameNode.textContent; // При открытии попапа поля формы заполняются данными из профиля.
      inputEditJob.value = profileJobNode.textContent; // 
  }

  setEventListeners() {
    //Расширяем родительский метод. должен не только расширить обработчик клика иконке закрытия, но и добавить обработчик сабмита формы (Т.к. это его ответственность!).
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handlePlaceSubmit(this._getInputValues());

      this.close();
    });
    super.setEventListeners();
  }
}
