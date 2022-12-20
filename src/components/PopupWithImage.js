////Попап открывается в момент нажатия на изображение карточки".
// ЗАДАЧА: Показать попап. перезаписать метод open. В методе open нужно вставлять в попап картинку и атрибут src изображения.
// картинки заменить src
import { Popup } from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__img');
    this._subTitle = this._popup.querySelector('.popup__subtitle');
  }

  open({ name, link }) {
    this._image.src = link;
    this._image.alt = name;
    this._subTitle.textContent = `на изображении: ${name}`;
    // console.log('тут логика открытия  карточки', name);

    super.open();//метод open нужно вставлять в попап картинку и атрибут src изображения.
  }
}
