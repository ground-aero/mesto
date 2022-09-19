// ЗАДАЧА: Показать попап. перезаписать метод open. В методе open нужно вставлять в попап картинку и атрибут src изображения.
// картинки заменить src

import {Popup} from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector)
  }

  open({name, link}){
    //методе open нужно вставлять в попап картинку и атрибут src изображения.
    this._popup.querySelector('.popup__img').src = link;
    this._popup.querySelector('.popup__img').alt = name;
    this._popup.querySelector(
      '.popup__subtitle'
    ).textContent = `на изображении: ${name}`;

    console.log('тут логика открытия  карточки', name);
    super.open();
  }
}
