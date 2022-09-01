import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

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
formProfile.addEventListener('submit', handleSaveSubmitEditForm); // слушатель по событию сабмит на форме (“submit” - «отправка») даже при нажатии на Enter

// ------------------ ДОБАВИТЬ МЕСТО - ------------------------

// btn "+" & add place window
const btnAddPlace = document.querySelector('.profile__btn-addplace'); // кнопка "+" / секции profile
const popupAddPlaceNode = document.querySelector('#overlay_add-place'); // оверлей add place
const formElementCard = document.querySelector('#window_add-place'); // окно 430px add place
// input & form / add place:
// const formPlace = document.querySelector('.popup__form'); // input/form
const formPlace = document.forms.place; // получаем форму place по св-ву name
const inputAddPlaceName = formPlace.elements.name; // ('#input-name'); // input/field/name/ add place
const inputAddPlaceLink = formPlace.elements.link; // page.querySelector('#input-link'); // input/field/link/ add place
const btnCreatePlaceCard = document.querySelector('.btn_type_create-place'); // btn "сохранить/создать" место
// <template>,  list <ul>, btn-del
const cardsList = document.querySelector('.elements__list'); // список карточек <ul>
const cardTemplate = document.querySelector('#card-template').content; //.querySelector(selectors.card); // темплейт .content, и children
const btnDel = cardTemplate.querySelectorAll('.card__btn-del');
// image popup
const popupOfImage = document.querySelector('.popup_img-bg'); // оверлей img popup
const popupImage = document.querySelector('.popup__img'); // img popup
const popupText = document.querySelector('.popup__subtitle'); // текст/подзаголовок img

// ПР-7 -------------------
// Вызываем генерацию отрисовки массива карточек (initialCards) - методом перебора, для каждого его элемента
// создаст новый экземпляр класса Card,  // подготовит карточку к публикации, добавит новую карточку в DOM.
initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, selectors); // ВМЕСТО: '#card-template'
  console.dir(card);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  document.querySelector('.elements__list').append(cardElement);
  // document.body.append(cardElement);
});

// ф-ция: добавление элемента карточки, по событию submit / formPlace /btnCreatePlaceCard // ф-ция ЖДЕТ Объект
// 1) вызывает внутри себя экземпляр карточки, 2) вызыват метод создания карточки
function renderCard(container, data, position = 'before') {
  const cardItem = new Card(data, selectors); // data.name, data.link?//
  console.dir(cardItem);
  // 2.Вызываем метод, который возвращает разметку карточки. Присваиваем разметку = card.
  const card = cardItem.generateCard(); //node <li></li>.card //создались. У кажд карточки свой data.name, data.link !! Зд. (data) передавать не надо, т.к. createCard() не принимает никаких данных.

  // 3.Разметка попадает в переменную card, и ренедерится с помощью метода renderCard.
  switch (position) {
    case 'before':
      container.prepend(card);
      break;
    case 'after':
      container.append(card);
      break;
    // case 'before': container.prepend(createCard(data.link, data.name));
    //   break;
    // case 'after': container.append(createCard(data.link, data.name));
    //   break;
    default:
      break;
  }
  // container.append(card); // !!! Теперь данная функциональность не нужна (после реализованного выше)
}

// слушатель submit - формы / add place
function setAddEventListeners() {
  formPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
    renderCard(
      cardsList,
      { link: inputAddPlaceLink.value, name: inputAddPlaceName.value },
      'before'
    ); // Ф-ция renderCard ЖДЕТ ОБЪЕКТ !!!!
    closePopup(popupAddPlaceNode);
    formPlace.reset();
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

//-------- слушатели кнопок
btnAddPlace.addEventListener('click', handleButtonAddPlaceClick); // "+" ("add")
btnEditProfile.addEventListener('click', handleButtonEditClick); // "edit profile"

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

// ПР-7 --------------------------------------------------
// FormValidator class

//КОНФИГИ ФОРМ
const settings = {
  formClass: '.popup__form',
  inputClass: '.popup__input',
  submitButtonClass: '.btn_submit',
  disabledButtonClass: 'btn_status_disabled', // button disabled style
  errorInputClass: 'popup__input-span_error_active', // <span> error
  errorLineClass: 'popup__input_line_error',
};

const formProfileValid = new FormValidator(settings, formProfile);
formProfileValid.enableValidation();
console.log(formProfileValid);

const formPlaceValid = new FormValidator(settings, formPlace);
formPlaceValid.enableValidation();
// ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ
