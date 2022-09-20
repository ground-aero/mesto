// 1. Card создаёт карточку с текстом и ссылкой на изображение. должен поставлять готовую карточку со всей разметкой
// 2. в конструкторе ф-ция handleCardClick. должна открывать попап с картинкой при клике на карточку.
export class Card {
  constructor({ data, handleCardClick, handleRemoveCard }, cardSelector) {
    this._data = data; // this._link = data.link; _data.name,, _data.link
    // console.log(this._data);
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
    this._handleRemoveCard = handleRemoveCard;
    this._handleClickLike = this._handleClickLike.bind(this);
  }

  // 1. НАХОДИМ НОДУ (но ее еще нет в DOM ! )
  _getTemplateCard() {
    this._cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return this._cardTemplate;
  }

  // 2. ПОЛУЧИТЬ РАЗМЕТКУ ШАБЛОНА - ТЕМПЛЕЙТА (публичный)
  generateCard() {
    // Запишем разметку в приватное поле _cardElement. Так у других элементов появится доступ к ней.
    this._cardElement = this._getTemplateCard();
    this._setEventListeners(); // !!! запусим метод обработчиков внутри generateCard.Тогда метод создаст карточки уже с обработчиком.

    const cardTitle = this._cardElement.querySelector('.card__title');
    const cardImage = this._cardElement.querySelector('.card__img');

    // (для карточки) присваиваем атрибуты с данными со входа
    cardTitle.textContent = this._data.name; //_data.name ++
    cardImage.src = this._data.link; //_data.link ++
    cardImage.alt = this._data.name;

    const cardBtnDel = this._cardElement.querySelector('.card__btn-del');

    //УДАЛИТЬ КАРТОЧКУ (СЛУШАТЕЛЬ)-----PW-8
    cardBtnDel.addEventListener('click', () => {
      this._handleRemoveCard(this._cardElement);
    });

    return this._cardElement;
  }

  //универсальный
  _setEventListeners() {
    const cardBtnLike = this._cardElement.querySelector('.card__btn-like');
    const cardImage = this._cardElement.querySelector('.card__img');

    // на лайке
    cardBtnLike.addEventListener('click', () => {
      this._handleClickLike();
    });

    // img zoom/ open(data)
    cardImage.addEventListener('click', () => {
      this.handleCardClick(this._data);
    });
  }

  // хендлеры
  //ПОСТАВИТЬ ЛАЙК
  _handleClickLike() {
    const cardBtnLike = this._cardElement.querySelector('.card__btn-like');
    cardBtnLike.classList.toggle('card__btn-like_active');
  }
  //УДАЛИТЬ КАРТОЧКУ
  // _handleClickDeleteCard() {
  //   this._cardTemplate.remove();
  //   this._cardTemplate = null;
  // }
}