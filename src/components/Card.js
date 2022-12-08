// 1. Card создаёт карточку с текстом и ссылкой на изображение. должен поставлять готовую карточку со всей разметкой
// 2. в конструкторе ф-ция handleCardClick. должна открывать попап с картинкой при клике на карточку.
export class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleCardDelete }, templateSelector) {
    this._data = data; // this._link = data.link; data.name,, data.link, data._id
    this._id = data._id;
    this._likes = data.likes;
      // console.log(this._likes)
    this._templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
    // this._handleLikeClick = this._handleLikeClick.bind(this);
    this._handleLikeClick = handleLikeClick;
    this.handleCardDelete = handleCardDelete;
    // this.removeCard = handleCardDelete;

    this._clonedCard = this._getTemplateCard();
    this._cardBtnLike = this._clonedCard.querySelector('.card__btn-like');
    this._cardTitle = this._clonedCard.querySelector('.card__title');
    this._cardImage = this._clonedCard.querySelector('.card__img');
    this._cardBtnDel = this._clonedCard.querySelector('.card__btn-del');
  }

  // 1. НАХОДИМ НОДУ (но ее еще нет в DOM ! )
  _getTemplateCard() {
    // return document.querySelector(this._cardTemplate).content.querySelector('.card').cloneNode(true);
    const clonedCard = document
        .querySelector(this._templateSelector)
        .content.querySelector('.card')
        .cloneNode(true);

    return clonedCard;
  }

  // 2. ПОЛУЧАЕМ РАЗМЕТКУ ШАБЛОНА/ТЕМПЛЕЙТА (публичный)
  generateCard() {
    // Запишем разметку в приватное поле _cardElement (_clonedCard). Так у других элементов появится доступ к ней.
    this._setEventListeners(); // !!! запусим метод обработчиков внутри generateCard.Тогда метод создаст карточки уже с обработчиком.

    // (для карточки) присваиваем атрибуты с данными со входа
    this._cardTitle.textContent = this._data.name; //_data.name ++
    this._cardImage.src = this._data.link; //_data.link ++
    this._cardImage.alt = this._data.name;

    return this._clonedCard;
  }

  // --remove card----PW-9--- (перенесен из index.js)
  removeCard() {
    //получаем ноду, удаляем ее
    this._clonedCard.remove();
    this._clonedCard = null;
    //   node.remove();
    // node = null;
  }

  //универсальный
  _setEventListeners() {
    //УДАЛИТЬ КАРТОЧКУ ---PW-8
    this._cardBtnDel.addEventListener('click', () => {
      this.handleCardDelete(this._id);//_id вместо _clonedCard
    });

    this._cardBtnLike.addEventListener('click', () => {
      this._handleLikeClick(this._likes);
    });

    // img zoom/ open(data)
    this._cardImage.addEventListener('click', () => {
      this.handleCardClick(this._data);
    });
  }

  // ХЕНДЛЕРЫ. /ПОСТАВИТЬ ЛАЙК
  _handleLikeClick() {
    this._cardBtnLike.classList.toggle('card__btn-like_active');
  }
}

