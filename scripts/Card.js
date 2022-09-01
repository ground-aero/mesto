// класс Card, который создаёт карточку с текстом и ссылкой на изображение
import { openPopup, popupOfImage, popupImage, popupText } from './index.js';
export class Card {
  static _template = document.querySelector('#card-template').content; //возвращ #document fragment
  //принимает в конструктор её данные и селектор её template-элемента ??
  constructor(data, selectors) {
    this._name = data.name; // _data.name,, _data.link
    this._link = data.link; // _data.name,, _data.link
    this._selectors = selectors;
    this._handleClickDeleteCard = this._handleClickDeleteCard.bind(this); //возвращает ф-цию с уже явно привязанным контекстом
    this._handleClickLike = this._handleClickLike.bind(this);
    this._openPopup = openPopup;
    this._popupImage = popupImage;

    // this._templateSelector = templateSelector;
  }

  _getTemplateCard() {
    this._cardElement = Card._template.querySelector('.card').cloneNode(true); // клонир Элемент из #document fragment | карточки
    this._cardImage = this._cardElement.querySelector(this._selectors.image); // объявл переменные дочерн.элементв клонируемой карточки
    this._cardTitle = this._cardElement.querySelector(this._selectors.title);
    this._cardText = this._cardElement.querySelector(this._selectors.title);
    this._cardBtnDel = this._cardElement.querySelector(this._selectors.btnDel);
    this._cardBtnLike = this._cardElement.querySelector(
      this._selectors.btnLike
    );

    // (для клонированной карточки) присваиваем атрибуты с данными со входа
    this._cardTitle.textContent = this._name; //_data.name ++
    this._cardImage.src = this._link; //_data.link ++

    return this._cardElement; // лишь возвращаем разметку карточки
  }

  // публичный.  добавит данные в разметку и возвращает готовые карточки внешним функциям.
  generateCard() {
    // Запишем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
    this._element = this._getTemplateCard();
    this._setEventListeners(); // !!! запусим метод обработчиков внутри generateCard.Тогда метод создаст карточки уже с обработчиком.

    // Вернём элемент наружу
    return this._element;
  }

  //универсальный метод слушателей
  _setEventListeners() {
    this._formPlace = document.forms.place;

    // на лайк
    this._cardBtnLike.addEventListener('click', () => {
      this._handleClickLike();
    });

    // на кнопку удаления карточки
    this._cardBtnDel.addEventListener('click', () => {
      this._handleClickDeleteCard();
    });

    // на img zoom/ open-popup
    this._cardImage.addEventListener('click', () => {
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupText.textContent = `на изображении: ${this._name}`;
      openPopup(popupOfImage); //openPopup(popupOfImage);
    });
  }

  // хендлеры
  _handleClickLike() {
    this._cardBtnLike.classList.toggle('card__btn-like_active');
  }

  _handleClickDeleteCard() {
    this._cardElement.remove();
  }

  _openImagePopup() {
    this._openPopup(data);
  }
}
