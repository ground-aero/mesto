// класс Card, который создаёт карточку с текстом и ссылкой на изображение
import { openPopup, popupOfImage, popupImage, popupText } from './index.js';
export class Card {
  static _template = document.querySelector('#card-template').content; //возвращ #document fragment

  constructor(data, selectors) {
    //DLETED: openPopup, popupImage
    this._name = data.name; // _data.name,, _data.link
    this._link = data.link; // _data.name,, _data.link
    this._selectors = selectors;
    this._handleClickDeleteCard = this._handleClickDeleteCard.bind(this); //возвращает ф-цию с уже явно привязанным контекстом
    this._handleClickLike = this._handleClickLike.bind(this);
    this._openPopup = openPopup;
    // this._popupImage = popupImage;
  }

  // 1. НАХОДИМ ШАБЛОН
  _getTemplateCard() {
    // const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    this._cardTemplate = Card._template.querySelector('.card').cloneNode(true); // клонир Элемент из #document fragment | карточки

    //ВЫНЕСТИ ПЕРЕМЕННЫЕ В setEventListeners и т.п..
    this._cardImage = this._cardTemplate.querySelector(this._selectors.image); // объявл переменные дочерн.элементв клонируемой карточки
    this._cardTitle = this._cardTemplate.querySelector(this._selectors.title);
    this._cardText = this._cardTemplate.querySelector(this._selectors.title);
    this._cardBtnDel = this._cardTemplate.querySelector(this._selectors.btnDel);
    this._cardBtnLike = this._cardTemplate.querySelector(
      this._selectors.btnLike
    );

    // // (для клонированной карточки) присваиваем атрибуты с данными со входа
    this._cardTitle.textContent = this._name; //_data.name ++
    this._cardImage.src = this._link; //_data.link ++
    this._cardImage.alt = this._link; 
    

    return this._cardTemplate; // лишь возвращаем разметку карточки (DOM-элемент карточки) через return
  }

  // 2. ПОЛУЧИТЬ РАЗМЕТКУ ТЕМПЛЕЙТА (публичный метод)
  //вызов (getCard) -> забирает разметку из HTML и клонирует элемент - возвращает готовые карточки внешним функциям (!)
  generateCard() {
    // Запишем разметку в приватное поле _cardElement. Так у других элементов появится доступ к ней.
    this._cardElement = this._getTemplateCard();
    this._setEventListeners(); // !!! запусим метод обработчиков внутри generateCard.Тогда метод создаст карточки уже с обработчиком.

    // Вернём элемент наружу
    return this._cardElement;
  }

  //универсальный метод всех слушателей - - - - - - - -
  _setEventListeners() {
    this._formPlace = document.forms.place;

    // на лайке
    this._cardBtnLike.addEventListener('click', () => {
      this._handleClickLike();
    });

    // на кнопке удаления карточки
    this._cardBtnDel.addEventListener('click', () => {
      this._handleClickDeleteCard();
    });

    // на img zoom/ open-popup
    this._cardImage.addEventListener('click', () => {
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupText.textContent = `на изображении: ${this._name}`;
      openPopup(popupOfImage);
    });
  }

  // хендлеры
  //ПОСТАВИТЬ ЛАЙК
  _handleClickLike() {
    this._cardBtnLike.classList.toggle('card__btn-like_active');
  }
  //УДАЛИТЬ КАРТОЧКУ
  _handleClickDeleteCard() {
    this._cardTemplate.remove();
    this._cardTemplate = null;
  }

}
