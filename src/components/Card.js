// 1. Card создаёт карточку с текстом и ссылкой на изображение. должен поставлять готовую карточку со всей разметкой
// 2. в конструкторе ф-ция handleCardClick. должна открывать попап с картинкой при клике на карточку.
export class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    //handleRemoveCard
    this._data = data; // this._link = data.link; _data.name,, _data.link
    // console.log(this._data);
    this._templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
    // this._handleRemoveCard = handleRemoveCard;
    this._handleClickLike = this._handleClickLike.bind(this);

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

  // 2. ПОЛУЧИТЬ РАЗМЕТКУ ШАБЛОНА - ТЕМПЛЕЙТА (публичный)
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
  _handleRemoveCard() {
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
      this._handleRemoveCard(this._clonedCard);
    });

    this._cardBtnLike.addEventListener('click', () => {
      this._handleClickLike();
    });

    // img zoom/ open(data)
    this._cardImage.addEventListener('click', () => {
      this.handleCardClick(this._data);
    });
  }

  // хендлеры
  //ПОСТАВИТЬ ЛАЙК
  _handleClickLike() {
    this._cardBtnLike.classList.toggle('card__btn-like_active');
  }
}
