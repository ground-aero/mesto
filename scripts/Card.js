// класс Card, который создаёт карточку с текстом и ссылкой на изображение
import { openPopup, popupOfImage, popupImage, popupText } from './index.js';
export class Card {
  static _template = document.querySelector('#card-template').content; //возвращ #document fragment
  //принимает в конструктор её данные и селектор её template-элемента ??
  constructor({ name, link, openPopup, popupImage }, selectors) {
    this._name = name; // _data.name,, _data.link
    this._link = link; // _data.name,, _data.link
    this._selectors = selectors;
    this._handleClickDeleteCard = this._handleClickDeleteCard.bind(this); //возвращает ф-цию с уже явно привязанным контекстом
    this._handleClickLike = this._handleClickLike.bind(this);
    this._openPopup = openPopup;
    this._popupImage = popupImage;
    // this._name = name;
    // this._link = link;
  }

  //класс уже умеет создавать карточки с картинкой и текстом
  // _getTemplate() {
  //   // // забираем разметку из HTML и клонируем элемент
  //   // this._view = document
  //   //   .querySelector('#card-template')
  //   //   .content.querySelector('.card')
  //   //   .cloneNode(true); // ВМЕСТО const cardElement -> this._view
  //   // return this._view;
  // }

  _getTemplateCard() {
    //вызов cloneCard (getCard) -> забирает разметку из HTML и клонирует элемент. // возвращает разметку (!)
    // ВМЕСТО cardElement -> this._view
    this._view = Card._template.querySelector('.card').cloneNode(true); // клонир Элемент из #document fragment | карточки
    
    //ВЫНЕСТИ ПЕРЕМЕННЫЕ В setEventListeners и т.п..
    this._cardImage = this._view.querySelector(this._selectors.image); // объявл переменные дочерн.элементв клонируемой карточки
    this._cardTitle = this._view.querySelector(this._selectors.title); //++
    this._cardBtnDel = this._view.querySelector(this._selectors.btnDel); //++
    this._cardBtnLike = this._view.querySelector(this._selectors.btnLike); //++

    // (для клонированной карточки) присваиваем атрибуты с данными со входа
    this._cardTitle.textContent = this._name; //_data.name ++
    this._cardImage.src = this._link; //_data.link ++
    this._cardImage.alt = this._name;

    // ВЫНЕСТИ ОТДЕЛЬНО: setEventListeners() - -объединить слушатели 
    // слушатель на кнопку удаления карточки
    this._cardBtnDel.addEventListener('click', this._handleClickDeleteCard);
    // cardBtnDel.addEventListener('click', () => cardElement.remove());

    // слушатель на лайк
    this._cardBtnLike.addEventListener('click', this._handleClickLike);
    // this._cardBtnLike.addEventListener('click', function like(el) {
    //   el.target.classList.toggle(this._selectors.like);
    // });
    // cardBtnLike.addEventListener('click', like);

    // слушатель на img / open-popup/ zoom
    this._cardImage.addEventListener('click', () => {
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupText.textContent = this._name;
      openPopup(popupOfImage); //openPopup(popupOfImage);
    });

    return this._view; // возвращает карточку с заполненным содержимым
  }

  // Ф-ция: добавить карточку в DOM на страницу в контейнер (с помощью метода массивов)
  renderCard() {
    // append -> в контейнер
  }
  // generateCard() {
  //   // Запишем разметку в приватное поле _element.
  //   // Так у других элементов появится доступ к ней.
  //   this._element = this._getTemplate();
  //   // Добавим данные
  //   this._element.querySelector('.card__img').src = this._image;
  //   this._element.querySelector('.card__title').textContent = this._title;

  //   // Вернём элемент наружу
  //   return this._element;
  // }
  // - - -

  _handleClickDeleteCard() {
    this._view.remove();
  }

  _handleClickLike() {
    this._cardBtnLike.classList.toggle('card__btn-like_active');
  }

  _openImagePopup() {
    this._openPopup(data);
  }
}
//содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;

//содержит приватные методы для каждого обработчика;

//содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.

// !!!! Для каждой карточки создайте экземпляр класса Card.

// const card = new Card('Привет! Как дела?', 'userpic.jpg');

// // 5. Теперь цикл обойдёт массив messageList и для каждого его элемента: - - - - - - - - - - - - - - -
// // > создаст новый экземпляр класса Card,
// // > подготовит карточку к публикации,
// // > добавит новую карточку в DOM.

// // ВМЕСТО messageList -> .......................?????????
// messageList.forEach((item) => {
//   // Создадим экземпляр карточки
//   const card = new Card(item.title, item.image);

//   // Создаём карточку и возвращаем наружу
//   const cardElement = card.generateCard();

//   // Добавляем в DOM
//   document.body.append(cardElement);
// });
