// 1. Card создаёт карточку с текстом и ссылкой на изображение. должен поставлять готовую карточку со всей разметкой
// 2. в конструкторе ф-ция handleCardClick. должна открывать попап с картинкой при клике на карточку.
export class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleDeleteClick }, templateSelector) {
    this._data = data; // this._link = data.link; data.name,, data.link, data._id
    this._id = data.id;
     // console.log(this._id)
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    // console.log(this._ownerId)
    this._likes = data.likes;//массив
      // console.log(this._likes)
    this._templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
    // this._handleLikeClick = this._handleLikeClick.bind(this);
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    // this.removeCard = handleCardDelete;

    this._clonedCard = this._getTemplateCard();
    this._cardBtnLike = this._clonedCard.querySelector('.card__btn-like');
    this._cardTitle = this._clonedCard.querySelector('.card__title');
    this._cardImage = this._clonedCard.querySelector('.card__img');
    this._cardBtnDel = this._clonedCard.querySelector('.card__btn-del');
    this._cardLikeCounter = this._clonedCard.querySelector('.card__btn-like-count');
    // this._cardId = this._clonedCard.querySelector('.....????')
    this._confirmBtnYes = document.querySelector('.btn_type_submit-delete')
  }

  getId() {
    return this._id
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

  _setLikes() {//ф-ция которая будет находить внутри этот эл
    this._cardLikeCounter.textContent = this._likes.length;
    // console.log(this._likes.length)
  }

  // 2. ПОЛУЧАЕМ РАЗМЕТКУ ШАБЛОНА/ТЕМПЛЕЙТА (публичный)
  getView() {
    // Запишем разметку в приватное поле _cardElement (_clonedCard). Так у других элементов появится доступ к ней.
    this._setEventListeners(); // !!! запусим метод обработчиков внутри generateCard.Тогда метод создаст карточки уже с обработчиком.

    // (для карточки) присваиваем атрибуты с данными со входа
    this._cardTitle.textContent = this._data?.name; //_data.name ++
    this._cardImage.src = this._data?.link; //_data.link ++
    this._cardImage.alt = this._data?.name;

    this._setLikes()
    // this._cardLikeCounter.textContent = this._data?.likes;//[массив лайков]
    // this._id??????????.textContent = this._data?._id; ??????

    if (this._ownerId !== this._userId) {
      this._cardBtnDel.style.display = 'none'
    }

    return this._clonedCard;
  }

  // --remove card----PW-9--- (перенесен из index.js)
  deleteCard() {
    //получаем ноду, удаляем ее
    this._clonedCard.remove();
    this._clonedCard = null;
    //   node.remove();  // node = null;
  }

  //универсальный
  _setEventListeners() {
    //УДАЛИТЬ КАРТОЧКУ ---PW-8
    this._cardBtnDel.addEventListener('click', () => {
      this._handleDeleteClick(this._id);//this._id //вместо _clonedCard
    });

    // this._confirmBtnYes.addEventListener('click', () => {
    //   this._handleDeleteClick(this._id);//_id вместо _clonedCard
    // });

    this._cardBtnLike.addEventListener('click', () => {
      this._handleLikeClick(this._likes);//?????????????????????
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

