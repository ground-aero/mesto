import { FormValidator } from './FormValidator.js';
// import { Card } from './Card.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];
const selectors = {
  card: '.card', // карточка
  image: '.card__img', // img/card
  title: '.card__title', // title/card
  btnLike: '.card__btn-like', // like/card
  btnDel: '.card__btn-del', // del/card
  like: '.card__btn-like_active', // like/card
};

// const cardItem = new Card(selectors);
//   // console.dir(Card)
// cardItem.createCard(); // вернет нам карточку
//   console.dir(cardItem)

// 'use strict';
const page = document.querySelector('.page');
// edit Profile
const popupEditNode = document.querySelector('#overlay_edit'); // оверлей popup Edit
const btnEditProfile = document.querySelector('.profile__btn-edit'); // кнопка редактировать
const formProfile = document.forms.profile; // получаем форму profile по св-ву name
const inputEditName = formProfile.elements.nameEdit; // по св-ву name // page.querySelector('#popup__input_type_edit-name');
const inputEditJob = formProfile.elements.job; // // page.querySelector('#popup__input_type_job');
const btnSaveProfile = document.querySelector('.btn_type_save-profile');
const profileNameNode = page.querySelector('.profile__name');
const profileJobNode = page.querySelector('.profile__job');

function openPopup(modal) {
  document.addEventListener('keyup', handleEscUp);
  // т.е. открыли попап, и тут же вешаем событие keydown на document. ***
  // modal - параметр в который подставляются любые нод-элементы, и дальше на него вешается classList. (popupNode тоже подставлется в modal)
  modal.classList.add('popup_opened');

  btnCreatePlaceCard.classList.add('btn_status_disabled');
  btnCreatePlaceCard.setAttribute('disabled', 'disabled'); // устанавливаем атрибут disabled
}

function closePopup(modal) {
  document.removeEventListener('keyup', handleEscUp); // удаляем событие keydown // Закрыли попап -- листенер можно удалить ****
  modal.classList.remove('popup_opened');
}

// И дальше внутри коллбэка у нас есть объект event и мы можем узнать в каком месте произошел клик:
function handleEscUp(evt) {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

// --- input values & textContent
function setPopupEditInputValue() {
  inputEditName.value = profileNameNode.textContent; // .trim(); // При открытии попапа поля формы заполняются данными из профиля.
  inputEditJob.value = profileJobNode.textContent; // .trim();
}
function setEditNodeTextContent() {
  profileNameNode.textContent = inputEditName.value; // Вставьте новые значения с помощью textContent
  profileJobNode.textContent = inputEditJob.value; // Получаем значение полей inputEditName  и inputEditJob из свойства value. //  // Выберите элементы, куда должны быть вставлены значения полей.
}
// ф-ция обработчик по форме Edit / "сохранить" и "отправить" данные из строки формы профиля
function handleSaveSubmitEditForm(evt) {
  evt.preventDefault(); // Эта строка отменяет стандартную отправку формы.
  setEditNodeTextContent();
  closePopup(popupEditNode);
}
formProfile.addEventListener('submit', handleSaveSubmitEditForm); // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка» даже при нажатии на Enter

// XXXXXXXXXXXXXXXXX  ДОБАВИТЬ МЕСТО - ХХХХХХХХХХХХХХХХХХХХХХХ

// btn "+" & add place window
const btnAddPlace = document.querySelector('.profile__btn-addplace'); // кнопка "+" / секции profile
const popupAddPlaceNode = document.querySelector('#overlay_add-place'); // оверлей add place
const formElementCard = document.querySelector('#window_add-place'); // окно 430px add place
// input & form / add place:
// const formAddPlace = document.querySelector('.popup__form'); // input/form
const formAddPlace = document.forms.place; // получаем форму place по св-ву name
const inputAddPlaceName = formAddPlace.elements.name; // ('#input-name'); // input/field/name/ add place
const inputAddPlaceLink = formAddPlace.elements.link; // page.querySelector('#input-link'); // input/field/link/ add place
const btnCreatePlaceCard = document.querySelector('.btn_type_create-place'); // btn "сохранить/создать" место
// <template>,  list <ul>, btn-del
const cardsList = document.querySelector('.elements__list'); // список карточек <ul>
const cardTemplate = document.querySelector('#card-template').content; //.querySelector(selectors.card); // темплейт .content, и children
const btnDel = cardTemplate.querySelectorAll('.card__btn-del');
// image popup
const popupOfImage = document.querySelector('.popup_img-bg'); // оверлей img popup
const popupImage = document.querySelector('.popup__img'); // img popup
const popupText = document.querySelector('.popup__subtitle'); // текст/подзаголовок img

// ПР-7 !!!!!!!!!!!!!!!!!!!! createCard
// ф-ция создания узла/карточки (но еще не её добавление)
// function createCard(link, name) {
//   // const cardElement = cardTemplate.querySelector(selectors.card).cloneNode(true); // клонир содерж 1 карточки
//   const cardElement = cardTemplate.cloneNode(true); // клонир содерж template
//   const cardImage = cardElement.querySelector(selectors.image); // объявл переменные дочерн.элементв клонируемой карточки
//   const cardTitle = cardElement.querySelector(selectors.title);
//   const cardBtnDel = cardElement.querySelector(selectors.btnDel); // ++
//   const cardBtnLike = cardElement.querySelector(selectors.btnLike); // ++

//   // (для клонированной карточки) присваиваем атрибуты с данными со входа
//   cardImage.src = link;
//   cardTitle.textContent = name;
//   cardImage.alt = name;

//   // удаление карточки
//   cardBtnDel.addEventListener('click', function () {
//     const cardElement = cardBtnDel.closest('.card');
//     cardElement.remove();
//   });
//   // cardBtnDel.addEventListener('click', () => cardElement.remove());

//   // лайк
//   cardBtnLike.addEventListener('click', function like(el) {
//     el.target.classList.toggle('card__btn-like_active');
//   });
//   // cardBtnLike.addEventListener('click', like);

//   // img open-popup/ zoom
//   cardImage.addEventListener('click', () => {
//     popupImage.src = link;
//     popupText.textContent = name;
//     popupImage.alt = name;
//     openPopup(popupOfImage);
//   });

//   return cardElement; // карточка с заполненным содержимым
// }

// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ
class Card {
  static _template = document.querySelector('#card-template').content; //возвращ #document fragment
  //принимает в конструктор её данные и селектор её template-элемента ??
  constructor(data, selectors) {
    //DLETED: openPopup, popupImage
    this._name = data.name; // _data.name,, _data.link
    this._link = data.link; // _data.name,, _data.link
    this._selectors = selectors;
    this._handleClickDeleteCard = this._handleClickDeleteCard.bind(this); //возвращает ф-цию с уже явно привязанным контекстом
    this._handleClickLike = this._handleClickLike.bind(this);
    this._openPopup = openPopup;
    this._popupImage = popupImage;

    // this._templateSelector = templateSelector;
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
    // const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    this._cardElement = Card._template.querySelector('.card').cloneNode(true); // клонир Элемент из #document fragment | карточки

    //ВЫНЕСТИ ПЕРЕМЕННЫЕ В setEventListeners и т.п..
    this._cardImage = this._cardElement.querySelector(this._selectors.image); // объявл переменные дочерн.элементв клонируемой карточки
    this._cardTitle = this._cardElement.querySelector(this._selectors.title); //++
    this._cardBtnDel = this._cardElement.querySelector(this._selectors.btnDel); //++
    this._cardBtnLike = this._cardElement.querySelector(
      this._selectors.btnLike
    ); //++

    // // (для клонированной карточки) присваиваем атрибуты с данными со входа
    this._cardTitle.textContent = this._name; //_data.name ++
    this._cardImage.src = this._link; //_data.link ++
    this._cardImage.alt = this._name;

    // ВЫНЕСТИ ОТДЕЛЬНО: setEventListeners() - -объединить слушатели
    // слушатель на кнопку удаления карточки
    // this._cardBtnDel.addEventListener('click', this._handleClickDeleteCard);
    // // cardBtnDel.addEventListener('click', () => cardElement.remove());

    // // слушатель на лайк
    // this._cardBtnLike.addEventListener('click', this._handleClickLike);
    // // this._cardBtnLike.addEventListener('click', function like(el) {
    // //   el.target.classList.toggle(this._selectors.like);
    // // });
    // // cardBtnLike.addEventListener('click', like);

    // // слушатель на img / open-popup/ zoom
    // this._cardImage.addEventListener('click', () => {
    //   popupImage.src = this._link;
    //   popupImage.alt = this._name;
    //   popupText.textContent = this._name;
    //   openPopup(popupOfImage); //openPopup(popupOfImage);
    // });

    return this._cardElement; // лишь возвращаем разметку карточки (DOM-элемент карточки) через return
  }

  // Метод публичный, чтобы возвращать готовые карточки внешним функциям.
  // добавит данные в разметку, а в следующих уроках научится управлять поведением карточек.
  // Подготовка карточки к публикации.
  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplateCard();
    this._setEventListeners(); // !!! запусим метод обработчиков внутри generateCard.Тогда метод создаст карточки уже с обработчиком.

    // Добавим данные
    this._element.querySelector('.card__img').src = this._link;
    this._element.querySelector('.card__title').textContent = this._name;

    // Вернём элемент наружу
    return this._element;
  }

  //универсальный метод всех слушателей - - - - - - - -
  _setEventListeners() {
    // слушатель на лайк
    this._cardBtnLike.addEventListener('click', () => {
      this._handleClickLike();
    });

    // слушатель на кнопку удаления карточки
    this._cardBtnDel.addEventListener('click', () => {
      this._handleClickDeleteCard();
    });

    // // слушатель на img zoom/ open-popup
    this._cardImage.addEventListener('click', () => {
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupText.textContent = this._name;
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

// ЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧ
// ЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧЧ

// перебираем массив объектов InitialCards
// function createInitialCards() {
//   initialCards.forEach(function (item) {
//     renderCard(cardsList, item, 'before'); // передаем весь объект: 1) списокКарточ <ul>, 2)item = name&link of each
//     // xxxx в список на странице втавляем склонированный контент, со всеми св-вами отобранными выше xxxxxx
//     // console.log(item)
//   });
// }
// createInitialCards();

// ПР-7 -- ПРИМЕНИТЬ  !!!!!!!!!!!!!!!!!!!!
// Цикл отрисовки карточек - обойдет массив messageList и для каждого его элемента:
// создаст новый экземпляр класса Card,  // подготовит карточку к публикации,
// добавит новую карточку в DOM.
initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, selectors); // ВМЕСТО: '#card-template'
  // console.dir(card);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // console.dir(cardElement);

  // Добавляем в DOM
  document.querySelector('.elements__list').append(cardElement);
  // document.body.append(cardElement);
});

// ф-ция: добавить на страницу разметку списка - container(</ul>), в DOM // ф-ция ЖДЕТ Объект
//ф-ция: 1) вызывает внутри себя экземпляр карточки, 2) вызываем метод создания карточки
// function renderCard(container, data, position = 'before') {
//   // где container принимает: 1) <ul> тег списка, 2) каждый элемент InitialCards, 3) Позицию размещ 'before'
//   // 1.Инициализируем Класс Card, передаем data(data.name, data.link), а также селекторы содерж карточки
//   const cardItem = new Card(data, selectors); // data.name, data.link?//
//   console.dir(cardItem);
//   // 2.Вызываем метод, который возвращает разметку карточки. Присваиваем разметку = card.
//   const cards = cardItem._getTemplateCard(); //node <li></li>.card //создались. У кажд карточки свой data.name, data.link !! Зд. (data) передавать не надо, т.к. createCard() не принимает никаких данных.

//   // 3.Разметка попадает в переменную card, и ренедерится с помощью метода renderCard.
//   switch (position) {
//     case 'before':
//       container.prepend(cards);
//       break;
//     case 'after':
//       container.append(cards);
//       break;
//     // case 'before': container.prepend(createCard(data.link, data.name));
//     //   break;
//     // case 'after': container.append(createCard(data.link, data.name));
//     //   break;
//     default:
//       break;
//   }
//   // container.append(card); // !!! Теперь данная функциональность не нужна (после реализованного выше)
// }

// слушатель submit - формы / add place
function setAddEventListeners() {
  formAddPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
    renderCard(
      cardsList,
      { link: inputAddPlaceLink.value, name: inputAddPlaceName.value },
      'before'
    ); // Ф-ция renderCard ЖДЕТ ОБЪЕКТ !!!!
    closePopup(popupAddPlaceNode);
    formAddPlace.reset();
  });
}
setAddEventListeners();

// -- ОБРАБОТЧИКИ НА ОТКРЫТИЕ:
// кнопка "edit"
function handleButtonEditClick(evt) {
  setPopupEditInputValue(); // вызв заполнение полей
  openPopup(popupEditNode);
}

// кнопка "+" / add place
function handleButtonAddPlaceClick() {
  // evt.preventDefault();
  openPopup(popupAddPlaceNode);
}

// попап img / открыть
// function handleImagePopupClick() {
//   openPopup(popupOfImage);
// }

//-------- слушатели кнопок
btnAddPlace.addEventListener('click', handleButtonAddPlaceClick); // "+" ("add")
btnEditProfile.addEventListener('click', handleButtonEditClick); // "edit profile"
// btnSaveProfile.addEventListener('click', handleSaveSubmitEditForm); // save profile -!!! УЖЕ ЕСТЬ СЛУШАТЕЛЬ SUBMIT ФОРМЫ (СТР.192)
// btnsClose.forEach((buttonClose) =>
//   buttonClose.addEventListener('click', handleClosePopupClick)
// ); // addEL на кнопку "close"

// ------- слушатели клика на попапы и кнопки "Х"

document.querySelectorAll('.popup').forEach((popup) => {
  // универсальный слушатель на все попап оверлеи, на закрытие
  popup.addEventListener('mousedown', (evt) => {
    if (
      evt.target.classList.contains('popup__btn-close') ||
      evt.target.classList.contains('popup')
    ) {
      closePopup(popup);
    }
  });
});

export { openPopup, popupOfImage, popupImage, popupText };

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
