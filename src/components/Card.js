// 1. Card создаёт карточку с текстом и ссылкой на изображение. должен поставлять готовую карточку со всей разметкой
// 2. в конструкторе ф-ция handleCardClick. должна открывать попап с картинкой при клике на карточку.
export class Card {
  constructor({ data, myId, handleCardClick, handleLikeClick, handleDeleteClick }, templateSelector) {
    this._data = data; // this._link = data.link; data.name,, data.link, data._id
    this._likes = data.likes;//массив лайков

    this._myId = myId;    // this._myId = data.currentUserId;
    this._ownerId = data.owner._id;// this._ownerId = data.ownerId;
    this._cardId = data._id;

    this._templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;

    this._clonedCard = this._getTemplateCard();
    this._cardBtnLike = this._clonedCard.querySelector('.card__btn-like');
    this._cardTitle = this._clonedCard.querySelector('.card__title');
    this._cardImage = this._clonedCard.querySelector('.card__img');
    this._cardBtnDel = this._clonedCard.querySelector('.card__btn-del');
    this._cardLikeCounter = this._clonedCard.querySelector('.card__btn-like-count');
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

  id() {
    return this._cardId;
  }

  isLiked() {
    const userHasLikedCard = this._likes.find(user => user._id === this._myId)

    return userHasLikedCard
  }

  setLikes(newLikes) {//ф-ция которая будет находить внутри этот эл
    this._likes = newLikes;
    this._cardLikeCounter.textContent = this._likes.length;

    if (this.isLiked()) {
      this._handleLikeColor()
    } else {
      this._cardBtnLike.classList.remove('card__btn-like_active');
    }
  }

  _handleLikeColor() {
    this._cardBtnLike.classList.add('card__btn-like_active');
  }

  // 2. ПОЛУЧАЕМ РАЗМЕТКУ ШАБЛОНА/ТЕМПЛЕЙТА (публичный)
  getView() {// Запишем разметку в приватное поле _cardElement (_clonedCard). Так у других элементов появится доступ к ней.
    this._setEventListeners(); // !!! запусим метод обработчиков внутри generateCard.Тогда метод создаст карточки уже с обработчиком.

    // (для карточки) присваиваем атрибуты с данными со входа
    this._cardTitle.textContent = this._data?.name; //_data.name ++
    this._cardImage.src = this._data?.link; //_data.link ++
    this._cardImage.alt = this._data?.name;

    this.setLikes(this._likes)

    if (this._myId !== this._ownerId) {
      this._cardBtnDel.remove()
      // this._cardBtnDel.style.display = 'none'//ЗАМЕЧАНИЕ ИСПРАВЛЕНО.
    }

    return this._clonedCard;
  }

  // remove card
  deleteCard() {
    //получаем ноду, удаляем ее
    this._clonedCard.remove();
    this._clonedCard = null;
  }

  //универсальный
  _setEventListeners() {
    //УДАЛИТЬ КАРТОЧКУ ---PW-8
    this._cardBtnDel.addEventListener('click', () => {
      this._handleDeleteClick(this._cardId);//this._id //вместо _clonedCard
    });

    this._cardBtnLike.addEventListener('click', () => {
      this._handleLikeClick(this._cardId);//this._likes?????????????????????
    });

    // img zoom/ open(data)
    this._cardImage.addEventListener('click', () => {
      this.handleCardClick(this._data);
    });
  }

}

